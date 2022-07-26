import CommentChild from "./CommentChild";
import { useState } from "react";
import { useGetCommentIdQuery, usePostCommentMutation } from "@/rest/comment/comment.query";
import { useQueryClient } from "@tanstack/react-query";
const CommentTicket = ({ id, authorId}) => {
  const [isAddComment, setAddComment] = useState(false);
  const [Comment, setCommentData] = useState({
    content: "",
    ticketId: id,
  });
  const handleChange = (e) => {
    setCommentData({ ...Comment, [e.target.name]: e.target.value });
  };
  const {mutate:  doPost} = usePostCommentMutation();
    const queryClient = useQueryClient()
    async function handleSubmit(data){
        await doPost(data,{
        onSuccess: ()=>{
            console.log("success")
            Comment.content = ""
            queryClient.invalidateQueries(['get-comment'])
        }
        })
    }
  const {data: CommentList} = useGetCommentIdQuery(id);
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
          <textarea
            type="text"
            name="content"
            placeholder="comment"
            class="input input-bordered input-accent w-full max-w-xs"
            value={Comment.content}
            onChange = {(e) => {
              handleChange(e);
            }}
          />
          <button
            className="hover:bg-teal-600 border border-solid border-teal-600 shadow-xl bg-white flex-1 text-teal-700 hover:text-white ml-[3px] rounded-lg"
            onClick={() => {
              handleSubmit(Comment);
            }}
          >add</button>
        </div>
      </div>
    </div>
  );
};

export default CommentTicket;
