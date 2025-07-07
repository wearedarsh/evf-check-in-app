import { Stack } from 'expo-router';
import '../assets/style/global.css';
import { AuthProvider, useAuth } from '../context/auth';

function Layout() {
	const { user, loading } = useAuth();

	if (loading) return null;

	return (
		<Stack>
			<Stack.Screen name="sign-in" redirect={!!user} options={{ headerShown: false }} />
			<Stack.Screen name="(app)" redirect={!user} options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<AuthProvider>
			<Layout />
		</AuthProvider>
	);
}
