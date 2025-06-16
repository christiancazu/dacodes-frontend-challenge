import AppProvider from '@dacodes/root/AppProvider'
import AuthView from './views/AuthView'

export default function App(): React.ReactNode {
	return (
		<AppProvider>
			<AuthView />
		</AppProvider>
	)
}
