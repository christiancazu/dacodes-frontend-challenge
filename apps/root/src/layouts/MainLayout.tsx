import { type User, queryKeys } from '@dacodes/lib'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Avatar, Flex, Image, Layout, Space } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router'

export default function MainLayout(): React.ReactNode {
	const { data } = useSuspenseQuery<User>({
		queryKey: [queryKeys.auth],
	})

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

					<Space>
						<Avatar src={data.image} alt={data.username} />
						{data.firstName}
					</Space>
				</Flex>
			</Header>
			<Content>
				<Outlet />
			</Content>
		</Layout>
	)
}
