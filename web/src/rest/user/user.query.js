import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { USER } from "@/utils/constants/react-query";
import { UserInfoFormatter } from "@/utils/Formatter/UserInfo";
export const useGetUserQuery = (sort) => {
  return useQuery(
    ["get-user", sort],
    () => {
      return UserService.getUser(sort);
    },
    {
      select: (users) => users.map((user) => UserInfoFormatter(user)),
    }
  );
};

export const useGetUserIdQuery = (id) => {
  return useQuery(
    ["get-user-id"],
    () => {
      return UserService.getUserId(id);
    }
    // ,
    // {
    //   select: (user) => UserInfoFormatter(user),
    // }
  );
};

export const useDeleteUserMutation = () => {
  return useMutation((id) => {
    return UserService.deleteUser(id);
  });
};

export const usePostUserMutation = () => {
  return useMutation((data) => {
    return AuthService.postUser(data);
  });
};

export const useGetManagers = (id) => {
  return useQuery(
    [USER.GET_MANAGERS],
    () => {
      return UserService.getManagers(id);
    },
    {
      initialData: [],
      cacheTime: 60 * 60 * 60 * 24,
    }
  );
};
export const useUpdateUserMutation = () => {
  return useMutation((data) => {
    let { id, ...user } = data;
    return UserService.updateUser(id, user);
  });
};
