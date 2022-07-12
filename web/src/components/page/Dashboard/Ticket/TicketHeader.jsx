import { Button } from "antd";
import React from "react";
import UseModal from "../../../../utils/hooks/UseModal";
import Modal from "../../../Common/Modal";
import SubmitTicket from "./Submit";
const Header = () => {
  const { isShowing, toggle } = UseModal();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em 2em 1em 1em",
        backgroundColor: "rgb(255,255,255)",
        width: "100%",
      }}
    >
      <div style={{ fontSize: "2em", fontWeight: "bolder" }}>Tickets</div>
      <Button onClick={toggle}>Create Ticket</Button>
      <Modal isShowing={isShowing} hide={toggle}>
        <SubmitTicket hide={toggle} />
      </Modal>
    </div>
  );
};

export default Header;
