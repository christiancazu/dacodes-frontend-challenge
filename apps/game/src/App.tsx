import AppProvider from '@dacodes/root/AppProvider'
import GameView from './views/GameView'

export default function App(): React.ReactNode {
	return (
		<AppProvider>
			<GameView />
		</AppProvider>
	)
}
