import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";

export const useGetUserQuery = (sort) => {
  return useQuery(["get-user",sort], () => {
    return UserService.getUser(sort);
  });
}

export const useGetUserIdQuery = (id) => {
  return useQuery(["get-user-id"], () => {
    return UserService.getUserId(id);
  })
}

export const useDeleteUserMutation = () => {
  return useMutation((id)=> {
    return UserService.deleteUser(id);
  })
}

export const usePostUserMutation = () => {
  return useMutation((data) => {
    return AuthService.postUser(data)
  })
}

export const useUpdateUserMutation = () => {
  return useMutation((data) => {
    let {id,...user} = data
    return UserService.updateUser(id,user)
  })
}

