import React, { useState } from "react";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
import CheckTicket from "./Check";
import CommentTicket from "./CommentTicket";

const Approve = ({ num, id, authorId}) => {
  const { isShowing, toggle } = UseModal();
  console.log("ticket", num, id);
  if (num == "pending") {
    return (
      <div>
        <button  
          className="w-4/5 border border-solid border-teal-700 p-1 bg-white hover:bg-teal-700 hover:text-stone-100 text-black rounded-lg"
          onClick={toggle}>
          Approve
        </button>
        <Modal isShowing={isShowing} hide={toggle}>
          <div className="flex">
            <CheckTicket id={id} hide={toggle} disabled={false} />
            <CommentTicket id={id} authorId={authorId} disabled={false} />
          </div>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <button 
          className="w-4/5 border border-solid border-gray-600 p-1 bg-slate-300 hover:bg-gray-600 hover:text-stone-100 rounded-lg text-black "
          onClick={toggle}>
          View
        </button>
        <Modal isShowing={isShowing} hide={toggle}>
          <div className="flex">
            <CheckTicket id={id} hide={toggle} disabled={true} />
            <CommentTicket id={id} authorId={authorId} disabled={true} />
          </div>
        </Modal>
      </div>
    );
  }
};



export default Approve;
