import { useQuery, useMutation } from "@tanstack/react-query";
import { CommentService } from "./comment.service";

export const useGetCommentIdQuery = (id) => {
  return useQuery(["get-comment"], () => {
    return CommentService.getCommentId(id);
  });
};

export const usePostCommentMutation = () => {
    return useMutation((data) => {
        return CommentService.postComment(data);
    })
}
