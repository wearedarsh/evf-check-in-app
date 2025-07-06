import Constants from 'expo-constants';
import { useNavigation } from 'expo-router';
import {
    useEffect,
    useState,
} from 'react';
import {
    Alert,
    FlatList,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { brand } from '../../constants/brand';

export default function Courses() {
	const navigation = useNavigation();
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		navigation.setOptions({ title: brand.copy.courses.headerTitle });

		const fetchCourses = async () => {
			try {
				const response = await fetch(
					Constants.expoConfig.extra.EXPO_PUBLIC_EVENT_SCAN_APP_WEBHOOK_URL +
						Constants.expoConfig.extra.EXPO_PUBLIC_EVENT_SCAN_WEBHOOK_SECRET,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
						body: JSON.stringify({
							client_id:
								Constants.expoConfig.extra.EXPO_PUBLIC_EVENT_SCAN_CLIENT_ID,
							method: 'courses',
						}),
					}
				);

				const result = await response.json();

				if (!response.ok || result.status !== 'ok') {
					Alert.alert(
						'Fetch Failed',
						result.message || 'Unable to fetch courses.'
					);
					setLoading(false);
					return;
				}

				setCourses(result.payload.courses || []);
				setLoading(false);
			} catch (error) {
				Alert.alert('Error', 'Something went wrong fetching courses.');
				setLoading(false);
			}
		};

		fetchCourses();
	}, [navigation]);

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1 px-6 pt-6">
				{loading ? (
					<Text className="text-white text-center">Loading...</Text>
				) : (
					<FlatList
						data={courses}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item }) => (
							<View className="mb-3">
								<Button
									label={item.title}
									onPress={() => {
										console.log('Selected course:', item.id);
									}}
								/>
							</View>
						)}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}
