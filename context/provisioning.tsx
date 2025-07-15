import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

type ProvisioningContextType = {
	provisioned: boolean | null;
	setProvisioned: (value: boolean) => void;
};

const ProvisioningContext = createContext<ProvisioningContextType>({
	provisioned: null,
	setProvisioned: () => {},
});

export function ProvisioningProvider({ children }) {
	const [provisioned, setProvisioned] = useState<boolean | null>(null);

	useEffect(() => {
		const checkProvisioning = async () => {
			const client_id = await SecureStore.getItemAsync('client_id');
			const auth_token = await SecureStore.getItemAsync('auth_token');
			setProvisioned(!!client_id && !!auth_token);
		};

		checkProvisioning();
	}, []);

	return (
		<ProvisioningContext.Provider value={{ provisioned, setProvisioned }}>
			{children}
		</ProvisioningContext.Provider>
	);
}

export const useProvisioning = () => useContext(ProvisioningContext);
