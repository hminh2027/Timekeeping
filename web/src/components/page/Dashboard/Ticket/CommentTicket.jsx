import { useState } from "react";
const CommentTicket = ({ id }) => {
  const [isAddComment, setAddComment] = useState(false);
  const [listComment, setListComment] = useState([]);
  return (
    <div className="border border-solid border-gray-400 shadow-xl m-3 w-96 rounded-2xl bg-white">
      <div className="p-2 h-full flex flex-col">
        <div className="text-xl font-bold text-center ">Comment</div>
        <div className="flex flex-col mt-1 flex-1">
          <CommentChild id={1} content={"xin chao"}></CommentChild>
          <CommentChild id={2} content={"hellllo"}></CommentChild>
          <CommentChild id={1} content={"hellllo"}></CommentChild>
          <CommentChild id={2} content={"hellllo"}></CommentChild>
        </div>
        <div className="flex">
          <textarea
            type="text"
            placeholder="comment"
            class="input input-bordered input-accent w-full max-w-xs"
          />
          <button
            className="bg-teal-600 flex-1 text-gray-100 hover:text-zinc-500 ml-[3px] rounded-lg"
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
    </div>
  );
};

const CommentChild = ({ id, content }) => {
  if (id == 1) {
    return (
      <div className="flex justify-start">
        <div className="w-min mt-1 border border-solid border-teal-500 rounded-2xl truncate p-2 bg-slate-100">
          <p className="mr-auto">{content}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end">
        <div className="w-min mt-1 border border-solid border-teal-500 rounded-2xl truncate p-2 bg-emerald-400 text-gray-700">
          <p className="ml-auto">{content}</p>
        </div>
      </div>
    );
  }
};

export default CommentTicket;
