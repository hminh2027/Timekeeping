import React from "react";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
import CheckTicket from "./Check";
import CommentTicket from "./CommentTicket";
const Approve = ({ num, id }) => {
  const { isShowing, toggle } = UseModal();
  console.log("ticket", num, id);
  if (num == "pending") {
    return (
      <div>
        <button
          className="w-4/5 border border-solid border-teal-700 p-1 bg-teal-700 text-stone-100 hover:text-gray-400 rounded-lg"
          onClick={toggle}
        >
          Approve
        </button>
        <Modal isShowing={isShowing} hide={toggle}>
          <div className="flex">
            <CheckTicket id={id} hide={toggle} disabled={false} />
            <CommentTicket id={id} disabled={false} />
          </div>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="w-4/5 border border-solid border-teal-700 p-1 bg-gray-600 text-stone-100 rounded-lg"
          onClick={toggle}
        >
          View
        </button>
        <Modal isShowing={isShowing} hide={toggle}>
          <div className="flex">
            <CheckTicket id={id} hide={toggle} disabled={true} />
            <CommentTicket id={id} disabled={true} />
          </div>
        </Modal>
      </div>
    );
  }
};

export default Approve;
