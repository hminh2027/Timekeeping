import { useState } from "react";
import {
  usePostCommentMutation,
  useGetCommentIdQuery,
} from "@/rest/comment/comment.query";
import { useQueryClient } from "@tanstack/react-query";
const CommentTicket = ({ id, className, authorId }) => {
  const [Comment, setCommentData] = useState({
    content: "",
    ticketId: Number(id),
  });
  const handleChange = (e) => {
    setCommentData({ ...Comment, [e.target.name]: e.target.value });
  };
  const { mutate: doPost } = usePostCommentMutation();
  const queryClient = useQueryClient();
  const handleSubmit = (data) => {
    doPost(data, {
      onSuccess: () => {
        console.log("success");
        Comment.content = "";
        queryClient.invalidateQueries(["get-comment"]);
      },
    });
  };
  const { data: CommentList } = useGetCommentIdQuery(id);
  return (
    <div
      className={`w-96 rounded-2xl border border-solid border-gray-400 bg-white shadow-xl ${className}`}
    >
      <div className="flex h-full  flex-col p-2">
        <div className="w-full ">
          <div className="relative flex items-center justify-center gap-4">
            <div className="text-xl font-bold">Comments</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 border-t border-t-gray-200">
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
              autoFocus
              name="content"
              type="text"
              placeholder="comment"
              className="input input-bordered input-accent w-full max-w-xs resize-none"
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
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentChild = ({ id, userId, content }) => {
  if (id == userId) {
    return (
      <div className="flex justify-start">
        <div className="mt-1 w-min truncate rounded-2xl border border-solid border-teal-500 bg-slate-100 p-2">
          <p className="mr-auto">{content}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end">
        <div className="mt-1 w-min truncate rounded-2xl border border-solid border-teal-500 bg-emerald-400 p-2 text-gray-700">
          <p className="ml-auto">{content}</p>
        </div>
      </div>
    );
  }
};

export { CommentTicket, CommentChild };
