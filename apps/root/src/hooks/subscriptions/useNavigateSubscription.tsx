import { queryKeys } from '@dacodes/lib'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import queryClient from '../../config/query.client'

export default function useNavigateSubscription(): void {
	const navigate = useNavigate()

	useEffect(() => {
		const unsubscribe = queryClient.getQueryCache().subscribe((e) => {
			if (e?.type === 'updated' && e.query.queryKey[0] === queryKeys.navigate) {
				const path = e.query?.state?.data as string

				if (path) {
					navigate(path)
				}
			}
		})

		return () => {
			unsubscribe()
		}
	}, [])
}
