import { Button, Flex, Typography } from 'antd'
import type { GameGridModality } from './FlipGameBoard'
import Leaderboard from './Leaderboard'

import { LeftCircleOutlined } from '@ant-design/icons'
import { queryKeys } from '@dacodes/lib'
import queryClient from '@dacodes/root/queryClient'

import game3x3 from '../assets/game3x3.jpg'
import game4x4 from '../assets/game4x4.jpg'
import game5x5 from '../assets/game5x5.jpg'

type Props = {
	handGameGridModality: (modality: GameGridModality) => void
}

const VITE_GAME_DOMAIN_ROOT = import.meta.env.VITE_GAME_DOMAIN_ROOT || ''

export default function FlipGameSelection({
	handGameGridModality,
}: Props): React.ReactNode {
	const handleBack = () => {
		queryClient.setQueryData([queryKeys.navigate], '/directory')
	}

	return (
		<>
			<Button className="my-8" onClick={handleBack}>
				<LeftCircleOutlined />
				Volver
			</Button>
			<Flex vertical align="center">
				<Typography.Title level={3}>
					Elija la modalidad de juego
				</Typography.Title>

				<Flex
					justify="space-evenly"
					wrap
					gap={16}
					className="mt-8 w-full selection-images"
				>
					<img
						height={180}
						width={180}
						src={`${VITE_GAME_DOMAIN_ROOT}${game3x3}`}
						alt="3x3"
						onClick={() => handGameGridModality(3)}
					/>
					<img
						height={180}
						width={180}
						src={`${VITE_GAME_DOMAIN_ROOT}${game4x4}`}
						alt="4x4"
						onClick={() => handGameGridModality(4)}
					/>
					<img
						height={180}
						width={180}
						src={`${VITE_GAME_DOMAIN_ROOT}${game5x5}`}
						alt="5x5"
						onClick={() => handGameGridModality(5)}
					/>
				</Flex>

				<Leaderboard />
			</Flex>
		</>
	)
}
