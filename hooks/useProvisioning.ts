import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export function useProvisioning() {
	const [provisioned, setProvisioned] = useState<boolean | null>(null);

	useEffect(() => {
		(async () => {
			const client_id = await SecureStore.getItemAsync('client_id');
			const auth_token = await SecureStore.getItemAsync('auth_token');
			setProvisioned(!!client_id && !!auth_token);
		})();
	}, []);

	return { provisioned };
}
