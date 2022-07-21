import React, { useState } from "react";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
import CheckTicket from "./Check";
import CommentTicket from "./CommentTicket";
import { Router } from "next/router";
import { Space,Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import api from "@/api/api"
const Approve = ({ num, id }) => {
  const { isShowing, toggle } = UseModal();
  console.log("ticket", num, id);
  if (num == "pending") {
    return (
      <div>
        <button  
          className="w-4/5 border border-solid border-teal-700 p-1 bg-teal-700 text-stone-100 hover:text-gray-400 rounded-lg"
          onClick={toggle}>
          Approve
        </button>
        <Modal isShowing={isShowing} hide={toggle}>
          <div className="flex">
            <CheckTicket id={id} hide={toggle} disabled={false}/> 
            <CommentTicket id={id} disabled={false}/>
          </div>
        </Modal>
      </div>
    );
  } 
  else {
    return (
      <div className="flex">
        <button 
          className="w-4/5 border border-solid border-teal-700 p-1 bg-gray-600 text-stone-100 rounded-lg hover:text-gray-400"
          onClick={toggle}>
          View
        </button>
        <Cancel id={id}></Cancel>
        <Modal isShowing={isShowing} hide={toggle}>   
          <div className="flex">
            <CheckTicket id={id} hide={toggle} disabled={true}/>
            <CommentTicket id={id} disabled={true}/>
          </div>
        </Modal>
      </div>
    );
  }
};

const Cancel = ({id}) => {
  const [isCancel, setCancel] = useState(false);
  const [errors, setErrors] = useState();
  const cancelTicket = async () => {
    setCancel(true);
    try {
      await api.delete(`ticket/${id}`);
      Router.reload(window.location.pathname)
    } catch (error) {
      setErrors(error)
    } finally {
      setCancel(false);
    }
  }
  return (
    <button
        className="flex-1 border border-solid border-teal-600 shadow-xl bg-teal-600 text-gray-100 p-1 rounded-lg hover:text-zinc-500 mr-4"
        type="primary"
        onClick={() => {
          cancelTicket();
        }}
      >
        {isCancel ? (
          <Space>
            <Spin indicator={<LoadingOutlined />} />
            <div>Cancel</div>
          </Space>
        ) : (
          "Cancel"
        )}
    </button>
  )
}

export default Approve;
