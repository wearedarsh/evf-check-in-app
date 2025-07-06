import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../../assets/style/global.css";
import { AuthProvider } from '../../context/AuthContext';

export default function RootLayout() {

    return (
        <AuthProvider>
            <SafeAreaProvider>
                <StatusBar />
                <Stack />
            </SafeAreaProvider>
        </AuthProvider>
    )
}