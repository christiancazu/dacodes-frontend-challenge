import { Spin } from 'antd'
import { Suspense } from 'react'
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
	useLocation,
} from 'react-router'
import MainLayout from './layouts/MainLayout'

import AuthView from '@dacodes/auth/App'
import DirectoryView from '@dacodes/directory/App'
import { type User, queryKeys } from '@dacodes/lib'
import { useQuery } from '@tanstack/react-query'
import queryClient from './config/query.client'
import useNavigateSubscription from './hooks/subscriptions/useNavigateSubscription'

function AuthenticatedRoutes(): React.ReactNode {
	useNavigateSubscription()

	const location = useLocation()

	const { data } = useQuery<User>({
		queryKey: [queryKeys.auth],
	})

	if (data && location.pathname === '/login') {
		return <Navigate to="/directory" replace />
	}

	if (!data && location.pathname !== '/login') {
		queryClient.resetQueries()
		return <Navigate to="/login" replace />
	}

	return <MainLayout />
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthenticatedRoutes />,
		children: [
			{
				index: true,
				element: <Navigate to="/login" replace />,
			},
			{
				path: 'login',
				element: <AuthView />,
			},
			{
				path: 'directory',
				element: <DirectoryView />,
			},
		],
	},
])

export default function RouterProviderComponent(): React.ReactNode {
	return (
		<Suspense
			fallback={<Spin className="flex justify-center my-5" size="large" />}
		>
			<RouterProvider router={router} />
		</Suspense>
	)
}
