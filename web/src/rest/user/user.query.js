import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";

export const useGetUserQuery = (sort) => {
  return useQuery(["get-user",sort], () => {
    return UserService.getUser(sort);
  });
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