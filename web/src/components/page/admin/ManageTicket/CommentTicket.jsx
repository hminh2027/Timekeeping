import { useState } from "react";
import {
  useGetCommentIdQuery,
  usePostCommentMutation,
} from "@/rest/comment/comment.query";
import { useQueryClient } from "@tanstack/react-query";
const CommentTicket = ({ id, authorId}) => {
  const [Comment, setCommentData] = useState({
    content: "",
    ticketId: Number(id),
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
    <div className="border border-solid border-gray-400 shadow-xl m-3 w-96 rounded-2xl bg-white">
      <div className="p-2 h-full flex flex-col">
        <div className="text-xl font-bold text-center ">Comment</div>
        <div className="flex flex-col mt-1 flex-1">
          {CommentList?.map(({userId,content}) => (
            <CommentChild id={userId} userId={authorId} content={content}></CommentChild>
          ))}
        </div>
        <div className="flex">
        <input
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
          >add</button>
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

export default CommentTicket;
