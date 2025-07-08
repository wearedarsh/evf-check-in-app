import { useNavigation, useRouter } from 'expo-router';
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


export default function Courses() {
	const navigation = useNavigation();
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const router = useRouter();

	const fetchCourses = async () => {
		setLoading(true);
		const data = await fetchData({ method: 'courses', key: 'courses'});
		if (data) setCourses(data);
		setLoading(false);
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchCourses();
		setRefreshing(false);
	};

	useEffect(() => {
		navigation.setOptions({ title: brand.copy.courses.headerTitle });

		fetchCourses();
	}, [navigation]);



	return (
		<SafeAreaView className="flex-1 items-center">
			<View className="flex-1 px-3 pt-3">
	{loading && !refreshing ? (
		<Text className="text-brand-secondary text-m font-bold text-center">
			{brand.copy.courses.loadingCopy}
		</Text>
	) : courses.length > 0 ? (
		<FlatList
			data={courses}
			keyExtractor={(item) => String(item.id)}
			renderItem={({ item }) => (
				<View className="mb-3">
					<Button
						label={item.title}
						onPress={() => {
							router.push({
								pathname: '/session-groups',
								params: { course_id: item.id, course_title: item.title },
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
			{brand.copy.courses.noDataCopy}
		</Text>
	)}
</View>

		</SafeAreaView>
	);
}
