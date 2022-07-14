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
        <Button onClick={toggle}>Approve</Button>
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
        <Button disabled onClick={toggle}>
          Not Approve
        </Button>
        <Modal isShowing={isShowing} hide={toggle}>
          <CheckTicket hide={toggle} />
        </Modal>
      </div>
    );
  }
};

export default Approve;
