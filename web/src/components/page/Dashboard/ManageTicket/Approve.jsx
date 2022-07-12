import { Button } from "antd";
import React from "react";
import UseModal from "../../../../utils/hooks/UseModal";
import Modal from "../../../Common/Modal";
import CheckTicket from "../ManageTicket/Check";
const Approve = ({num, id}) => {
  const { isShowing, toggle } = UseModal();
  console.log("number",num)
  if(num === 2){
    return (
      <div>
          <Button onClick={toggle}>Approve</Button>
          <Modal isShowing={isShowing} hide={toggle}>
              <CheckTicket id={id} hide={toggle} />
          </Modal>
      </div>
    );
  }
  else {
    return (
      <div>
          <Button disabled onClick={toggle}>Not Approve</Button>
          <Modal isShowing={isShowing} hide={toggle}>
              <CheckTicket hide={toggle} />
          </Modal>
      </div>
    );
  }
  
};

export default Approve;