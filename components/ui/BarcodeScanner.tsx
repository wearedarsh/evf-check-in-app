import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function BarcodeScanner() {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);
	const cameraRef = useRef<Camera | null>(null);
	const isFocused = useIsFocused();

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
		if (scanned) return;
		setScanned(true);
		Alert.alert('Scan successful', data, [
			{ text: 'Scan another', onPress: () => setScanned(false) },
		]);
	};

	if (hasPermission === null) {
		return <Text>Requesting camera permission...</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			{isFocused && (
				<Camera
					ref={cameraRef}
					style={StyleSheet.absoluteFillObject}
					type="back"
					onBarCodeScanned={handleBarCodeScanned}
					barCodeScannerSettings={{
						barCodeTypes: ['qr'],
					}}
				/>
			)}
			{scanned && (
				<View style={styles.overlay}>
					<Text style={styles.scanAgainText}>Tap "Scan another" to scan again</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	overlay: {
		position: 'absolute',
		bottom: 40,
		alignSelf: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)',
		padding: 12,
		borderRadius: 8,
	},
	scanAgainText: {
		color: '#fff',
		fontSize: 16,
	},
});
