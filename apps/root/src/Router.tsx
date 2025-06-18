import { Spin } from 'antd'
import { Suspense, lazy } from 'react'
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
	useLocation,
} from 'react-router'
import MainLayout from './layouts/MainLayout'

const AuthView = lazy(() => import('@dacodes/auth/App'))
const DirectoryView = lazy(() => import('@dacodes/directory/App'))
const GameView = lazy(() => import('@dacodes/game/App'))
const ProfileView = lazy(() => import('@dacodes/profile/App'))
const NotFoundView = lazy(() => import('../views/NotFoundView'))

import { type User, queryKeys } from '@dacodes/lib'
import { useQuery } from '@tanstack/react-query'
import queryClient from './config/query.client'
import useNavigateSubscription from './hooks/subscriptions/useNavigateSubscription'

function AuthenticatedRoutes(): React.ReactNode {
	useNavigateSubscription()

	const location = useLocation()

	const { data } = useQuery<User>({
		queryKey: [queryKeys.auth],
		queryFn: () => queryClient.getQueryData<User>([queryKeys.auth])!,
	})

	if (data && location.pathname === '/login') {
		return <Navigate to="/directory" replace />
	}

	if (!data && location.pathname !== '/login') {
		queryClient.removeQueries({
			queryKey: [queryKeys.users],
		})
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
				element: <Navigate to="/directory" replace />,
			},
			{
				path: 'login',
				element: <AuthView />,
			},
			{
				path: 'directory',
				element: <DirectoryView />,
			},
			{
				path: 'game',
				element: <GameView />,
			},
			{
				path: 'profiles/:id',
				element: <ProfileView />,
			},
			{
				path: '*',
				element: <NotFoundView />,
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
