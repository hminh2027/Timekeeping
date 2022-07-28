import React, { useState } from "react";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
import CheckTicket from "./Check";
import CommentTicket from "./CommentTicket";
import { useRouter } from "next/router";

const Approve = ({ num, id, authorId }) => {
  const router = useRouter();
  const { isShowing, toggle } = UseModal();
  console.log("ticket", num, id);
  if (num == "pending") {
    return (
      <div>
        <button
          className="w-4/5 rounded-lg border border-solid border-teal-700 bg-white p-1 text-black hover:bg-teal-700 hover:text-stone-100"
          // onClick={toggle}
          onClick={ () => router.push(`/admin/ticket/${id}`)}
        >
          Approve
        </button>
        {/* <Modal isShowing={isShowing} hide={toggle}>
          <div className="flex">
            <CheckTicket id={id} hide={toggle} disabled={false} />
            <CommentTicket id={id} authorId={authorId} disabled={false} />
          </div>
        </Modal> */}
      </div>
    );
  } else {
    return (
      <div className="flex">
        <button
          className="w-4/5 rounded-lg border border-solid border-gray-600 bg-slate-300 p-1 text-black hover:bg-gray-600 hover:text-stone-100 "
          // onClick={toggle}
          onClick={ () => router.push(`/admin/ticket/${id}`)}
        >
          View
        </button>
        {/* <Modal isShowing={isShowing} hide={toggle}>
          <div className="flex">
            <CheckTicket id={id} hide={toggle} disabled={true} />
            <CommentTicket id={id} authorId={authorId} disabled={true} />
          </div>
        </Modal> */}
      </div>
    );
  }
};

export default Approve;
