import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import ThemeProvider from '../Theme'
import queryClient, { persister } from '../config/query.client'

type Props = {
	children: React.ReactNode
}

export default function AppProvider({ children }: Props): React.ReactNode {
	return (
		<ThemeProvider>
			<PersistQueryClientProvider
				client={queryClient}
				persistOptions={{ persister }}
			>
				{children}
			</PersistQueryClientProvider>
		</ThemeProvider>
	)
}
