import AppProvider from '@dacodes/root/AppProvider'
import ProfileView from './views/ProfileView'

export default function App(): React.ReactNode {
	return (
		<AppProvider>
			<ProfileView />
		</AppProvider>
	)
}
