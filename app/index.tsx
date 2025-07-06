import {
	Alert,
	Image,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

import { brand } from "../constants/brand";

import Constants from 'expo-constants';

export default function LoginScreen() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const year = new Date().getFullYear()

	const handleLogin = async () => {
	try {
		const response = await fetch(Constants.expoConfig.extra.EXPO_PUBLIC_EVENT_SCAN_APP_WEBHOOK_URL + Constants.expoConfig.extra.EXPO_PUBLIC_EVENT_SCAN_WEBHOOK_SECRET, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				client_id: Constants.expoConfig.extra.EXPO_PUBLIC_EVENT_SCAN_CLIENT_ID,
				method: 'login',
				email,
				password,
			}),
		});

		const result = await response.json();

		if (!response.ok || result.status !== 'ok') {
			console.log('Response URL:', response.url);
			console.log('Login Failed', result.message || 'Please try again.');
			return;
		}

		// Example: persist user in SecureStore
		//await SecureStore.setItemAsync('user', JSON.stringify(result.payload.user));

		//router.push('/course'); // move to course screen
		} catch (error) {
			Alert.alert('Error', error.message);
		}
	};


	return (
		<ImageBackground
			source={require('../assets/images/background.png')}
			className="flex-1"
			resizeMode="cover"
		>
			<StatusBar style="light" />
			<SafeAreaView className="flex-1">
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						className="flex-1"
					>
						<View className="flex-1 justify-center items-center px-6">
							<Image
								className="mb-3"
								source={require('../assets/images/logo-white.png')}
								style={{ width: 266, height: 40 }}
								resizeMode="contain"
							/>
							<Text className="text-l font-bold text-center mb-3 text-white">
								{brand.copy.index.title}
							</Text>

							<Input label="Email" value={email} secure={false} onChangeText={setEmail} />
							<Input label="Password" value={password} secure={true} onChangeText={setPassword} />
							<Button label="Log in" onPress={handleLogin} />
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
				<View className="bg-primary justify-center items-center mb-3">
					<Text className="font-s text-white">{brand.copy.index.copyright(year)}</Text>
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
}
