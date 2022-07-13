// import Modal from "@/components/Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import { Col, Row } from "antd";
import { useState } from "react";
import SubmitTicket from "./Submit";
import Modal from "@/components/Common/Modal";
import Header from "./TicketHeader";
import TicketList from "./TicketList";
const TicketContent = () => {
  const { isShowing, toggle } = UseModal();
  const [newTicketSubmitted, setNewTicketSubmitted] = useState(false);
  // console.log(newTicketSubmitted);
  // return <div>abc</div>
  return (
    <>
      <Row>
        <Header toggleModal={toggle} />
        <Col span={24}>
          <TicketList
            newTicketSubmitted={newTicketSubmitted}
            onFetched={() => setNewTicketSubmitted(false)}
          />
        </Col>

        <Modal isShowing={isShowing} hide={toggle}>
          <SubmitTicket
            hide={toggle}
            onSubmit={() => setNewTicketSubmitted(true)}
          />
        </Modal>
      </Row>
    </>
  );
};

export default TicketContent;
