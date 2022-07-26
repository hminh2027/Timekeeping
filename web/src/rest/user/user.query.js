import { useQuery } from "@tanstack/react-query";
import { UserService } from "./user.service";

export const useGetManagers = (id) => {
  return useQuery(
    ["get-managers"],
    () => {
      return UserService.getManagers(id);
    },
    {
      initialData: [],
      cacheTime: 60 * 60 * 60 * 24,
    }
  );
};
