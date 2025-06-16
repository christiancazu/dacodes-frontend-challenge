import ThemeProvider from '@dacodes/root/Theme'
import queryClient, { persister } from '@dacodes/root/queryClient'

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import AuthView from './views/AuthView'

export default function App(): React.ReactNode {
	return (
		<ThemeProvider>
			<PersistQueryClientProvider
				client={queryClient}
				persistOptions={{ persister }}
			>
				<AuthView />
			</PersistQueryClientProvider>
		</ThemeProvider>
	)
}
