import { CameraView } from 'expo-camera';
import Constants from 'expo-constants';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';

export default function BadgeScanner() {
	const [scanned, setScanned] = useState(false);
	const isProcessing = useRef(false);

	const { course_id, session_id } = useLocalSearchParams();
	const client_id = Constants.expoConfig?.extra?.EXPO_PUBLIC_EVENT_SCAN_CLIENT_ID;
	const base_url = Constants.expoConfig?.extra?.EXPO_PUBLIC_EVENT_SCAN_CHECK_IN_WEBHOOK_URL;
	const secret = Constants.expoConfig?.extra?.EXPO_PUBLIC_EVENT_SCAN_WEBHOOK_SECRET;

	const handleScan = async ({ data }: { data: string }) => {
		if (isProcessing.current) return;

		isProcessing.current = true;
		setScanned(true);
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

		try {
            console.log('qr_payload:', data)
			const response = await fetch(`${base_url}${secret}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					client_id,
					qr_payload: data,
					course_id: parseInt(course_id as string),
					event_session_id: parseInt(session_id as string),
					checked_in_by: 1, // Replace with actual user ID if known
					checked_in_route: 'app-scan',
				}),
			});

			const json = await response.json();

			if (response.ok) {
				Alert.alert('Success', 'Delegate checked in', [
					{ text: 'Scan another', onPress: () => resetScanner() },
				]);
			} else {
				throw new Error(json.error || 'Unknown error');
			}
		} catch (err: any) {
			Alert.alert('Error', err.message || 'Failed to check in', [
				{ text: 'Try again', onPress: () => resetScanner() },
			]);
		}
	};

	const resetScanner = () => {
		setScanned(false);
		isProcessing.current = false;
	};

	return (
		<View className="flex-1">
			<CameraView
				facing="back"
				style={{ flex: 1 }}
				onBarcodeScanned={handleScan}
				barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
			/>
			{scanned && (
				<View className="absolute bottom-10 self-center bg-black/60 px-4 py-3 rounded-lg">
					<Text className="text-white text-base">successful scan</Text>
				</View>
			)}
		</View>
	);
}
