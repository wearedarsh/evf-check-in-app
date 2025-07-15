
import { Image, Keyboard, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { brand } from "../constants/brand";


export default function InitialiseScreen() {
    const year = new Date().getFullYear();

	return (
		<>
        <StatusBar style="light" />
			<SafeAreaView className="flex-1 bg-brand-secondary">
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					
						<View className="flex-1 justify-center items-center px-6">
							<Image
								className="mb-5"
								source={require('../assets/images/logo.png')}
								style={{ width: 266, height: 40 }}
								resizeMode="contain"
							/>
							<Text className="text-m text-center mb-3 text-white px-6">
								 Login to your admin system and go to App setup to initialise your app.
							</Text>
						</View>
				</TouchableWithoutFeedback>
				<View className="bg-primary justify-center items-center mb-3">
					<Text className="font-s text-white">{brand.copy.login.copyright(year)}</Text>
				</View>
			</SafeAreaView>
		</>
	);
}
