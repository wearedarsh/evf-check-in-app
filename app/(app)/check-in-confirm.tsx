import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import {
    useEffect
} from 'react';
import {
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import { brand } from '../../constants/brand';


export default function Courses() {
	const navigation = useNavigation();
	const router = useRouter();
    const { session_id, session_title, session_end_time, session_start_time, course_id, course_title } = useLocalSearchParams();

	useEffect(() => {
		navigation.setOptions({ title: brand.copy.checkInConfirm.headerTitle });
	}, [navigation]);


	return (
		<SafeAreaView className="flex-1 items-center">
            <Text className="text-black text-l font-bold text-center px-7">
                {session_title + ' - ' + session_start_time + ' to ' + session_end_time}
            </Text>
            
            <Text className="text-black text-xl text-center mt-3 mb-3 px-7">
                {brand.copy.checkInConfirm.subTitle}
            </Text>
			<View className="mb-3 mt-3">
                <Button
                    
                    label={brand.copy.checkInConfirm.scanButton}
                    onPress={() => {
                        router.push({
                            pathname: '/scan-badges',
                            params: {
                                course_id: course_id, session_id:session_id, session_title:session_title
                            }
                        });
                    }}
                />
            </View>
            <View className="mb-3 mt-3">
                <Button
                    label={brand.copy.checkInConfirm.manualButton}
                    onPress={() => {
                        router.push({
                            pathname: '/session-groups',
                        });
                    }}
                />
			</View>
		</SafeAreaView>
	);
}
