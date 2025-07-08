import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/auth';


const LogoutButton = () => {
	const { logout } = useAuth();

	return (
		<TouchableOpacity onPress={logout}>
			<Text className="text-m text-brand-secondary mr-4">Logout</Text>
		</TouchableOpacity>
	);
}

export default LogoutButton
