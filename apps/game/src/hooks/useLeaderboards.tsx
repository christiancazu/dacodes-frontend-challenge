import { type IRegisterScoreDto, queryKeys } from '@dacodes/lib'
import useNotify from '@dacodes/root/useNotify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { leaderboardService } from '../services/leaderboard.service'

export function useLeaderboards() {
	const notify = useNotify()

	const leaderboardGetTop10 = () =>
		useQuery({
			queryKey: [queryKeys.leaderboard, 'top10'],
			queryFn: leaderboardService.getTop10Leaderboard,
			refetchOnMount: true,
		})

	const leaderboardRegisterNewScore = () =>
		useMutation({
			mutationKey: [queryKeys.leaderboard, 'register'],
			mutationFn: (dto: IRegisterScoreDto) =>
				leaderboardService.registerNewScore(dto),
			onSuccess: () => {
				notify({
					message: '¡Nuevo puntaje registrado!',
				})
			},
		})

	return {
		leaderboardGetTop10,
		leaderboardRegisterNewScore,
	}
}
