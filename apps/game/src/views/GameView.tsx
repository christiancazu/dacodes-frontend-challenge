import { useCallback, useState } from 'react'
import {
	FlipGameBoard,
	type GameGridModality,
} from '../components/FlipGameBoard'
import FlipGameSelection from '../components/FlipGameSelection'
import '../assets/styles.scss'

export default function GameView(): React.ReactNode {
	const [modality, setModality] = useState<GameGridModality>()

	const handGameGridModality = useCallback(
		(modality: GameGridModality) => setModality(modality),
		[modality],
	)

	return (
		<>
			{modality ? (
				<FlipGameBoard
					modality={modality}
					handleRestartGame={() => setModality(undefined)}
				/>
			) : (
				<FlipGameSelection handGameGridModality={handGameGridModality} />
			)}
		</>
	)
}
