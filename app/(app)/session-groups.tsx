import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import {
	useEffect,
	useState,
} from 'react';
import {
	FlatList,
	Text,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { brand } from '../../constants/brand';
import { fetchData } from '../../utils/fetchData';


export default function SessionGroups() {
	const navigation = useNavigation();
	const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const { course_id, course_title } = useLocalSearchParams();

	const router = useRouter();

	const fetchSessionGroups = async () => {
		setLoading(true);
		const data = await fetchData({ method: 'sessionGroups', key: 'groups', payload: {course_id: course_id} });
		if (data) setGroups(data);
		setLoading(false);
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchSessionGroups();
		setRefreshing(false);
	};

	useEffect(() => {
		navigation.setOptions({ title: brand.copy.sessionGroups.headerTitle });

		fetchSessionGroups();
	}, [navigation]);



	return (
		<SafeAreaView className="flex-1 items-center">
			<Text className="text-black text-l font-bold text-center">
				{course_title}
			</Text>
			<View className="flex-1 px-3 pt-3">
				{loading && !refreshing ? (
					<Text className="text-brand-secondary text-m font-bold text-center">{brand.copy.sessionGroups.loadingCopy}</Text>
				) : groups.length > 0 ? (
					<FlatList
						data={groups}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item }) => (
							<View className="mb-3">
								<Button
									label={item.friendly_name}
									onPress={() => {
										router.push({
											pathname: '/sessions',
											params: { group_id: item.id, group_title: item.friendly_name, course_id: course_id }
										});
									}}
								/>
							</View>
						)}
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				) : (
					<Text className="text-brand-secondary text-m font-bold text-center">
						{brand.copy.sessionGroups.noDataCopy}
					</Text>
				)}
			</View>
		</SafeAreaView>
	);
}
