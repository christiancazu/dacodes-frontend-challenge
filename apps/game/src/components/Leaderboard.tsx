import { type UserScore, queryKeys } from '@dacodes/lib'
import queryClient from '@dacodes/root/queryClient'
import useNotify from '@dacodes/root/useNotify'
import { Table, type TableColumnsType, Typography } from 'antd'
import { useEffect, useRef } from 'react'
import { Socket, io } from 'socket.io-client'
import { useLeaderboards } from '../hooks/useLeaderboards'
import { leaderboardService } from '../services/leaderboard.service'
import classes from './Leaderboard.module.scss'

const VITE_WS_LEADERBOARD_URL = import.meta.env.VITE_WS_LEADERBOARD_URL

const columns: TableColumnsType<UserScore> = [
	{
		title: '',
		dataIndex: 'image',
		responsive: ['md'],
		render: (_, { user }) => (
			<img height={48} width={48} src={user.image} alt={user.firstName} />
		),
	},
	{
		title: 'Nombre',
		dataIndex: 'firstName',
		render: (_, { user }) => <>{user.firstName}</>,
	},
	{
		title: 'Apellido',
		dataIndex: 'lastName',
		render: (_, { user }) => <>{user.lastName}</>,
	},
	{
		title: 'Usuario',
		dataIndex: 'username',
		render: (_, { user }) => <>{user.username}</>,
	},
	{
		title: 'Mejor tiempo',
		dataIndex: 'time',
		render: (time) => {
			const timeInSeconds = time / 1000
			return `${Number.isInteger(timeInSeconds) ? timeInSeconds : timeInSeconds.toFixed(4).replace(/\.?0+$/, '')} seg`
		},
	},
]

export default function Leaderboard(): React.ReactNode {
	const socketRef = useRef<Socket>(null)

	const { leaderboardGetTop10 } = useLeaderboards()

	const { data: users = [] } = leaderboardGetTop10()

	const notify = useNotify()

	useEffect(() => {
		socketRef.current = io(VITE_WS_LEADERBOARD_URL)

		socketRef.current.on('connect', () => {})

		socketRef.current.on('leaderboard:update', (data) => {
			setUsers(data)
			notify({
				message: '¡Nuevo puntaje registrado!',
				type: 'info',
			})
		})

		socketRef.current.on('disconnect', () => {})

		leaderboardService.getTop10Leaderboard().then((data) => {
			setUsers(data)
		})

		const setUsers = (users: UserScore[]) => {
			queryClient.setQueryData([queryKeys.leaderboard, 'top10'], users)
		}

		return () => {
			socketRef.current!.disconnect()
		}
	}, [])

	return (
		<>
			<Typography.Title className="my-8" level={3}>
				Top 10 mejores puntajes en tiempo real
			</Typography.Title>

			<Table<UserScore>
				className={`${classes.UserTable} my-8`}
				title={() => <div className="loader-bar" />}
				columns={columns}
				dataSource={users}
				pagination={false}
				rowKey={({ user }) => user.id}
				scroll={{ x: 720 }}
				style={{ maxWidth: 1079, height: '100%', width: '100%' }}
			/>
		</>
	)
}
