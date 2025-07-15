import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/auth';

import { brand } from "../constants/brand";


export default function LoginScreen() {
	const { login } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const year = new Date().getFullYear();

	const clearStorage = async () => {
		await SecureStore.deleteItemAsync('client_id');
		await SecureStore.deleteItemAsync('auth_token');
		setProvisioned(false);
	}

	const handleLogin = async () => {
		if (email === '' || password === '') {
			Alert.alert('Please enter your email and password');
			return
		}

		await login(email, password);
	};


	return (
		<>
			<StatusBar style="light" />
			<SafeAreaView className="flex-1 bg-brand-secondary">
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						className="flex-1"
					>
						<View className="flex-1 justify-center items-center px-6">
							<Image
								className="mb-3"
								source={require('../assets/images/logo.png')}
								style={{ width: 266, height: 40 }}
								resizeMode="contain"
							/>
							<Text className="text-l font-bold text-center mb-3 text-white">
								{brand.copy.login.title}
							</Text>

							<Input label="Email" value={email} secure={false} onChangeText={setEmail} />
							<Input label="Password" value={password} secure={true} onChangeText={setPassword} />
							<Button label={brand.copy.login.button} onPress={handleLogin} />
							<Button label="Clear secure storage" onPress={clearStorage} />
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
				<View className="bg-primary justify-center items-center mb-3">
					<Text className="font-s text-white">{brand.copy.login.copyright(year)}</Text>
				</View>
			</SafeAreaView>
		</>
	);
}
