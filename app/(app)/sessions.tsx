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
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const { group_id, group_title, course_id } = useLocalSearchParams();
	const router = useRouter();

	const fetchSessions = async () => {
		setLoading(true);
		const data = await fetchData({ method: 'sessions', key: 'sessions', payload: {event_session_group_id: group_id} });
		if (data) setSessions(data);
		setLoading(false);
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchSessions();
		setRefreshing(false);
	};

	useEffect(() => {
		navigation.setOptions({ title: brand.copy.sessions.headerTitle });

		fetchSessions();
	}, [navigation]);



	return (
		<SafeAreaView className="flex-1 items-center">
			<Text className="text-black text-l font-bold text-center">
				{group_title}
			</Text>
			<View className="flex-1 px-3 pt-3">
				{loading && !refreshing ? (
					<Text className="text-brand-secondary text-m font-bold text-center">{brand.copy.sessions.loadingCopy}</Text>
				) : sessions.length > 0 ? (
					<FlatList
						data={sessions}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item }) => (
							<View className="mb-3">
								<Button
									label={item.title + ' at ' + item.start_time + '-' + item.end_time}
									onPress={() => {
										router.push({
											pathname:'/check-in-confirm',
											params: {session_id: item.id, session_title: item.title, session_start_time: item.start_time, session_end_time: item.end_time, course_id: course_id}
										})
									}}
								/>
							</View>
						)}
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				) : (
					<Text className="text-brand-secondary text-m font-bold text-center">
						{brand.copy.courses.noDataCopy}
					</Text>
				)}
			</View>
		</SafeAreaView>
	);
}
