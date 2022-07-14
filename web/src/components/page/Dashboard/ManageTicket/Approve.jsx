import { Button } from "antd";
import React from "react";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
import CheckTicket from "../ManageTicket/Check";
import CommentTicket from "./CommentTicket";
const Approve = ({ num, id }) => {
  const { isShowing, toggle } = UseModal();
  console.log("ticket", num, id);
  if (num == "pending") {
    return (
      <div>
        <button  
          className="w-4/5 border border-solid border-teal-700 p-1 bg-teal-700 text-stone-100 hover:text-gray-400"
        onClick={toggle}>Approve</button>
        <Modal isShowing={isShowing} hide={toggle}>
          <div className="flex">
            <CheckTicket id={id} hide={toggle} /> 
            <CommentTicket />
          </div>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <button 
          className="w-4/5 border border-solid border-teal-700 p-1 bg-teal-700 text-stone-100"
          disabled 
          onClick={toggle}>
          Not Approve
        </button>
        <Modal isShowing={isShowing} hide={toggle}>
          <CheckTicket hide={toggle} />
        </Modal>
      </div>
    );
  }
};

export default Approve;
