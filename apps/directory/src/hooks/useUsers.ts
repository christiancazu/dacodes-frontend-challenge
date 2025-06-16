import { queryKeys } from "@dacodes/lib";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";

export function useUsers() {
  const usersGetAll = (q: string) =>
    useInfiniteQuery({
      queryKey: [queryKeys.users, q],
      queryFn: (e) => usersService.getAll({ ...e, q }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.users.length === 0 || lastPage.users.length < 15) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
        if (firstPageParam <= 0) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    });

  return {
    usersGetAll,
  };
}
