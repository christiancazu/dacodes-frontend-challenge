import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { type User, queryKeys } from '@dacodes/lib'
import { useQuery } from '@tanstack/react-query'
import {
	Avatar,
	Button,
	Dropdown,
	Flex,
	Grid,
	Image,
	Layout,
	Space,
	Tooltip,
} from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router'
import queryClient, { persister } from '../config/query.client'

const { useBreakpoint } = Grid

export default function MainLayout(): React.ReactNode {
	const { data } = useQuery<User>({
		queryKey: [queryKeys.auth],
		queryFn: () => queryClient.getQueryData<User>([queryKeys.auth])!,
	})

	const screens = useBreakpoint()

	function handleLogout() {
		queryClient.clear()
		persister.removeClient()
		window.localStorage.removeItem('token')
		window.location.href = '/'
	}

	return (
		<Layout className="min-h-svh">
			<Header className="flex items-center px-4 bg-gray-50 border-b border-b-gray-300">
				<Flex justify="space-between" className="w-full">
					<Flex align="center">
						<Image
							height={54}
							src="https://23746804.fs1.hubspotusercontent-na1.net/hub/23746804/hubfs/logo-dacodes-01.png?width=167&height=70&name=logo-dacodes-01.png"
							alt="dacodes - logo"
							preview={false}
						/>
					</Flex>

					{data && (
						<Space>
							<Avatar src={data.image} alt={data.username} />
							{data.firstName}

							{screens.md ? (
								<Tooltip title="Cerrar sesión">
									<Button
										type="link"
										icon={<LogoutOutlined />}
										onClick={handleLogout}
									/>
								</Tooltip>
							) : (
								<Dropdown
									menu={{
										items: [
											{
												label: 'Cerrar sesión',
												key: 'password',
												icon: <LogoutOutlined style={{ fontSize: 16 }} />,
												onClick: handleLogout,
											},
										],
									}}
									trigger={['click']}
								>
									<Button icon={<SettingOutlined />} shape="circle" />
								</Dropdown>
							)}
						</Space>
					)}
				</Flex>
			</Header>
			<Content className="grid justify-items-center my-8">
				<div className="max-w-[1080px] w-full">
					<Outlet />
				</div>
			</Content>
		</Layout>
	)
}
