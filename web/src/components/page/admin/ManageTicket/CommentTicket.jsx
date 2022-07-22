import TextArea from "antd/lib/input/TextArea";
import CommentChild from "./CommentChild";
import { useState } from "react";
import { Button } from "antd";
import { useEffect } from "react";
import { ApiFilled } from "@ant-design/icons";
const CommentTicket = ({ id }) => {
  const [isAddComment, setAddComment] = useState(false);
  const [listComment, setListComment] = useState([]);
  // useEffect(()=> {
  //   const fetchComments = async() => {
  //     const res = await api.get(`comment/${id}`)
  //     const {data} = res;
  //     setListComment(data);
  //   };
  //   fetchComments();
  // },[]);
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
          {/* <textarea className=" row-span-2 w-10/12"          
            name="comment"
            // value= {ticketData.comment}
            // style={{ width: "95%" }}
            // className={styles[`ticket-content`]}
            placeholder="Comment"
            // onChange={(e) => {
            // handleChange(e);
            // }}
          /> */}
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

export default CommentTicket;
