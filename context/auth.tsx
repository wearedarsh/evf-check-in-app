import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	

	useEffect(() => {
		SecureStore.getItemAsync('user').then((stored) => {
			if (stored) setUser(JSON.parse(stored));
			setLoading(false);
		});
	}, []);

	const login = async (userData) => {
		await SecureStore.setItemAsync('user', JSON.stringify(userData));
		setUser(userData);
	};

	const logout = async () => {
		await SecureStore.deleteItemAsync('user');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
