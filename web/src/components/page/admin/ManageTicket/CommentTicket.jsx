import CommentChild from "./CommentChild";
import { useState } from "react";
import {
  useGetCommentIdQuery,
  usePostCommentMutation,
} from "@/rest/comment/comment.query";
import { useQueryClient } from "@tanstack/react-query";
const CommentTicket = ({ id, authorId }) => {
  const [isAddComment, setAddComment] = useState(false);
  const [Comment, setCommentData] = useState({
    content: "",
    ticketId: id,
  });
  const handleChange = (e) => {
    setCommentData({ ...Comment, [e.target.name]: e.target.value });
  };
  const { mutate: doPost } = usePostCommentMutation();
  const queryClient = useQueryClient();
  async function handleSubmit(data) {
    await doPost(data, {
      onSuccess: () => {
        console.log("success");
        Comment.content = "";
        queryClient.invalidateQueries(["get-comment"]);
      },
    });
  }
  const { data: CommentList } = useGetCommentIdQuery(id);
  console.log("COMMENT", CommentList);
  return (
    <div className="m-3 w-96 rounded-2xl border border-solid border-gray-400 bg-white shadow-xl">
      <div className="flex h-full flex-col p-2">
        <div className="text-center text-xl font-bold ">Comment</div>
        <div className="mt-1 flex flex-1 flex-col">
          {CommentList?.map(({ userId, content }) => (
            <CommentChild
              id={userId}
              userId={authorId}
              content={content}
            ></CommentChild>
          ))}
        </div>
        <div className="flex">
          <textarea
            type="text"
            name="content"
            placeholder="comment"
            class="input input-bordered input-accent w-full max-w-xs"
            value={Comment.content}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button
            className="ml-[3px] flex-1 rounded-lg border border-solid border-teal-600 bg-white text-teal-700 shadow-xl hover:bg-teal-600 hover:text-white"
            onClick={() => {
              handleSubmit(Comment);
            }}
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentTicket;
