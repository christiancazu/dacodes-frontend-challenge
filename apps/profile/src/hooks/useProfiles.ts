import { queryKeys } from "@dacodes/lib";
import { useQuery } from "@tanstack/react-query";
import { profilesService } from "../services/profiles.service";

export function useProfiles() {
  const profilesGetById = (id: number) =>
    useQuery({
      queryKey: [queryKeys.users, "profiles", id],
      queryFn: () => profilesService.getProfileById(id),
    });

  return {
    profilesGetById,
  };
}
