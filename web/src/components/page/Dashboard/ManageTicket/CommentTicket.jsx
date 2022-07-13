// import Card from "../../../Common/Card";
import TextArea from "antd/lib/input/TextArea";
import CommentChild from "./CommentChild";
import { useState } from "react";
import { Button } from "antd";
const CommentTicket = () => {
    const [isAddComment, setAddComment] = useState(false)
    return(
        <div className="border border-solid border-gray-400 shadow-xl m-3 w-96 rounded">
            <div className="p-2 h-full">
                <div className="text-xl font-bold text-center h-1/7">
                    Comment
                </div>
                <div className="h-5/6">
                    <CommentChild></CommentChild>
                </div>
                <div className="h-1/7 flex">
                    <TextArea
                    rows= {2}
                    name= "comment"
                    // value= {ticketData.comment}
                    style={{width: "95%"}}
                    // className={styles[`ticket-content`]}
                    placeholder="Comment"
                    // onChange={(e) => {
                    // handleChange(e);
                    // }}
                    />
                    <button
                    className="bg-red-200 w-2/12 text-gray-50"
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
}

export default CommentTicket;