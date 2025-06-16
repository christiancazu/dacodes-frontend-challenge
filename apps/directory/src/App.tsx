import AppProvider from '@dacodes/root/AppProvider'
import DirectoryView from './views/DirectoryView'

export default function App(): React.ReactNode {
	return (
		<AppProvider>
			<DirectoryView />
		</AppProvider>
	)
}
