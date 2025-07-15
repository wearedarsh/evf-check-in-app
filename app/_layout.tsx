import { Stack } from 'expo-router';
import '../assets/style/global.css';
import { AuthProvider, useAuth } from '../context/auth';
import { useProvisioning } from '../hooks/useProvisioning';

function Layout() {
	const { user, loading: authLoading } = useAuth();
	const { provisioned } = useProvisioning();

	if (authLoading || provisioned === null) return null;

	return (
		<Stack>
			<Stack.Screen name="initialise" redirect={!!provisioned} options={{ headerShown: false }} />
			<Stack.Screen name="sign-in" redirect={!provisioned || !!user} options={{ headerShown: false }} />
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
