import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import { AuthProvider } from '../context/AuthContext'; // example
import "../assets/style/global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
        <StatusBar />
        <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  )
}
