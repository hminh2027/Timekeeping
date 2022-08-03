import { QUERY_COMMENT } from "@/utils/constants/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CommentService } from "./comment.service";

export const useGetCommentIdQuery = (id) => {
  return useQuery([QUERY_COMMENT.GET_COMMENT], () => {
    return CommentService.getCommentId(id);
  });
};

export const usePostCommentMutation = () => {
  return useMutation((data) => {
    return CommentService.postComment(data);
  });
};
