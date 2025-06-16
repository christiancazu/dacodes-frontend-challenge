import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import type { NotificationInstance } from 'antd/es/notification/interface'
import useNotification from 'antd/es/notification/useNotification'
import type { ReactNode } from 'react'
import { persister, queryClient } from './config/query.client'

type Props = {
	children: ReactNode
}

export default function QueryClientProviderComponent({
	children,
}: Props): React.ReactNode {
	const [api, contextHolder] = useNotification()
	queryClient.setQueryData<NotificationInstance>(['notify'], api)

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			{children}
			{contextHolder}
		</PersistQueryClientProvider>
	)
}
