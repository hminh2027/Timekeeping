import { useState } from "react";
import {
  usePostCommentMutation,
  useGetCommentIdQuery,
} from "@/rest/comment/comment.query";
import { useQueryClient } from "@tanstack/react-query";
import MessageRow from "@/components/Chat/MessageRow";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/feature/user/userSlice";
const ChatBox = ({ id, className, authorId }) => {
  const [Comment, setCommentData] = useState({
    content: "",
    ticketId: Number(id),
  });
  const user = useSelector(selectUserInfo);
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
      <div className="flex h-full flex-col p-2">
        <div className="w-full ">
          <div className="relative flex items-center justify-center gap-4">
            <div className="text-xl font-bold">Comments</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col  justify-between border-t border-t-gray-200">
          <div className="v-scrollbar mt-1 flex max-h-sm flex-auto flex-col overflow-y-auto">
            {CommentList?.map(({ userId, content }, index) => (
              <MessageRow
                key={index}
                id={user.id}
                userId={userId}
                content={content}
              />
            ))}
          </div>
          <div className="flex h-10 items-center">
            <textarea
              autoFocus
              name="content"
              type="text"
              placeholder="comment"
              className="input input-bordered input-accent w-full max-w-4/5 resize-none "
              value={Comment.content}
              onChange={(e) => {
                handleChange(e);
              }}
            />

            <button
              className="ml-[3px] h-full flex-1 rounded-lg border border-solid border-teal-600 bg-white text-teal-700 shadow-xl hover:bg-teal-600 hover:text-white"
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

export default ChatBox;
// BTN
{
  /* <button
className="ml-[3px] flex-1 rounded-lg border border-solid border-teal-600 bg-white text-teal-700 shadow-xl hover:bg-teal-600 hover:text-white"
onClick={() => {
  handleSubmit(Comment);
}}
>
Add
</button> */
}

//Textarea
{
  /* <textarea
autoFocus
name="content"
type="text"
placeholder="comment"
className="input input-bordered input-accent w-full max-w-4/5 resize-none "
value={Comment.content}
onChange={(e) => {
  handleChange(e);
}}
/> */
}
//Comments
{
  /* <div className="mt-1 flex max-h-sm flex-1 flex-col overflow-y-auto">
  {CommentList?.map(({ userId, content }, index) => (
    <MessageRow key={index} id={user.id} userId={userId} content={content} />
  ))}
</div>; */
}
