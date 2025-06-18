import { PlayCircleOutlined } from '@ant-design/icons'
import { type User, queryKeys } from '@dacodes/lib'
import queryClient from '@dacodes/root/queryClient'
import {
	Button,
	Flex,
	Input,
	Space,
	Spin,
	Table,
	type TableColumnsType,
	Typography,
} from 'antd'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useUsers } from '../hooks/useUsers'

import classes from './DirectoryView.module.scss'

const columns: TableColumnsType<User> = [
	{
		title: 'Nombre',
		dataIndex: 'firstName',
		sorter: (a, b) =>
			a.firstName.localeCompare(b.firstName, undefined, {
				sensitivity: 'base',
			}),
		render: (_, user) => <>{user.firstName}</>,
		fixed: 'left',
	},
	{
		title: 'Apellido',
		dataIndex: 'lastName',
		sorter: (a, b) =>
			a.lastName.localeCompare(b.lastName, undefined, { sensitivity: 'base' }),
		render: (_, user) => <>{user.lastName}</>,
	},
	{
		title: 'Usuario',
		dataIndex: 'username',
		sorter: (a, b) =>
			a.username.localeCompare(b.username, undefined, { sensitivity: 'base' }),
		render: (_, user) => <>{user.username}</>,
	},
	{
		title: 'Compañia',
		dataIndex: 'company',
		sorter: (a, b) =>
			a.company.name.localeCompare(b.company.name, undefined, {
				sensitivity: 'base',
			}),
		render: (_, user) => <>{user.company.name}</>,
	},
]

export default function DirectoryView(): React.ReactNode {
	const [pagination, setPagination] = useState('')

	const { usersGetAll } = useUsers()

	const { data, fetchNextPage, isLoading, hasNextPage } =
		usersGetAll(pagination)

	const handleSearch = (value = '') => {
		setPagination(value)
	}

	const handleGoToGame = () => {
		queryClient.setQueryData([queryKeys.navigate], '/game')
	}

	const handleViewProfile = (id: number) => {
		queryClient.setQueryData([queryKeys.navigate], `/profiles/${id}`)
	}

	return (
		<Flex justify="center">
			<Flex vertical style={{ margin: '2rem 0' }}>
				<Flex justify="space-between" wrap style={{ marginBottom: '1rem' }}>
					<Input.Search
						allowClear
						style={{ maxWidth: 320, marginBottom: '1rem' }}
						onClear={handleSearch}
						onSearch={handleSearch}
						placeholder="Buscar por: nombre, apellido, usuario..."
					/>

					<Button
						type="primary"
						icon={<PlayCircleOutlined />}
						onClick={handleGoToGame}
					>
						JUGAR AHORA
					</Button>
				</Flex>

				<InfiniteScroll
					dataLength={data?.pages.flatMap((page) => page.users).length ?? 0}
					next={fetchNextPage}
					hasMore={hasNextPage}
					loader={
						<Flex
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Spin size="large" />
						</Flex>
					}
					endMessage={
						<Flex
							justify="center"
							vertical
							align="center"
							style={{ margin: '2rem 0 1rem' }}
						>
							<Space direction="vertical" size="large">
								<Typography.Text>
									<b>No hay más usuarios</b>
								</Typography.Text>
							</Space>
						</Flex>
					}
					refreshFunction={() => null}
					pullDownToRefresh
					pullDownToRefreshThreshold={50}
				>
					<Typography.Title level={3}>Usuarios</Typography.Title>
					<Table<User>
						columns={columns}
						className={classes.UserTable}
						dataSource={data?.pages.flatMap((page) => page.users) || []}
						pagination={false}
						loading={isLoading}
						rowKey={({ id }) => id}
						scroll={{ x: 720 }}
						onRow={({ id }) => ({
							onClick: () => handleViewProfile(id),
						})}
						style={{ maxWidth: 1079, height: '100%', width: '100%' }}
					/>
				</InfiniteScroll>
			</Flex>
		</Flex>
	)
}
