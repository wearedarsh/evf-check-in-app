import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	role_id: number;
}

interface AuthContextType {
	user: User | null;
	login: (userData: User) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	return useContext(AuthContext)!;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const loadUser = async () => {
			const stored = await SecureStore.getItemAsync('user');
			if (stored) setUser(JSON.parse(stored));
		};
		loadUser();
	}, []);

	const login = async (userData: User) => {
		await SecureStore.setItemAsync('user', JSON.stringify(userData));
		setUser(userData);
	};

	const logout = async () => {
		await SecureStore.deleteItemAsync('user');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
