import { useState } from "react";
import Draggable from "react-draggable";
const CommentTicket = ({ id, className }) => {
  const [isAddComment, setAddComment] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [isHiding, setIsHiding] = useState(false);
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
        {!isHiding && (
          <div className="flex flex-1 flex-col gap-6 border-t border-t-gray-200">
            <div className="mt-1 flex flex-1 flex-col">
              <CommentChild id={1} content={"xin chao"}></CommentChild>
              <CommentChild id={2} content={"hello"}></CommentChild>
              <CommentChild id={1} content={"hello"}></CommentChild>
              <CommentChild id={2} content={"hello"}></CommentChild>
            </div>
            <div className="flex">
              <textarea
                autoFocus
                type="text"
                placeholder="comment"
                className="input input-bordered input-accent w-full max-w-xs resize-none"
              />

              <button
                className="ml-[3px] flex-1 rounded-lg bg-teal-600 text-gray-100 hover:text-zinc-500"
                onClick={() => {
                  submit();
                }}
              >
                {isAddComment ? (
                  <Space>
                    <Spin indicator={<LoadingOutlined />} />
                    <div>AddComment</div>
                  </Space>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentChild = ({ id, content }) => {
  if (id == 1) {
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
