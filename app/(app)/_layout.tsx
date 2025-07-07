import { Stack } from 'expo-router';
import LogoutButton from '../../components/ui/LogoutButton';

export default function AppLayout() {
	return <Stack screenOptions={{
				headerRight: () => <LogoutButton />,
			}} />;
}
