import Constants from 'expo-constants';
import { Alert } from 'react-native';

export async function fetchData({
	method,
	payload = {},
	key,
}: {
	method: string;
	payload?: Record<string, any>;
	key: string; 
}): Promise<any[] | null> {
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
					client_id: Constants.expoConfig.extra.EXPO_PUBLIC_EVENT_SCAN_CLIENT_ID,
					method,
					...payload,
				}),
			}
		);

		const result = await response.json();

		if (!response.ok || result.status !== 'ok') {
			Alert.alert('Fetch Failed', result.message || `Unable to fetch ${key}.`);
			return null;
		}

		return result.payload[key] || [];
	} catch (error) {
		Alert.alert('Error', `Something went wrong fetching ${key}.`);
		return null;
	}
}
