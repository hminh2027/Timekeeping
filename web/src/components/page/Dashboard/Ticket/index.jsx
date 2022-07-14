// import Modal from "@/components/Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import api from "@/api/api";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";

import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import SubmitTicket from "./Submit";
import Modal from "@/components/Common/Modal";
import Header from "./TicketHeader";
import {TicketList} from "./TicketList";
import { DesktopFilter, MobileFilter } from "./Filters";
const TicketContent = () => {
  const { isShowing, toggle } = UseModal();
  const [newTicketSubmitted, setNewTicketSubmitted] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  useEffect(() => {
    const fetchTicketData = async () => {
      const res = await api.get(`ticket/me`);
      const resTickets = res.data.map((ticket) => TicketInfoFormatter(ticket));
      setTickets(resTickets);
      setNewTicketSubmitted(false);
    };
    fetchTicketData();
    return () => {
      setTickets([]);
    };
  }, [newTicketSubmitted]);
  // Gọi api khi filter option thay đổi
  return (
    <>
      <Row>
        <Header toggleModal={toggle} />
        <Col span={24}>
          <div
            className="flex flex-col overflow-auto rounded-lg m-1"
            style={{
              backgroundColor: "#fff",
              boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
            }}
          >
            <DesktopFilter
              onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
              className="hidden lg:flex"
            />
            <MobileFilter
              onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
              className="lg:hidden"
            />

            <TicketList tickets={tickets} />
          </div>
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
{
  /* <Col sm={24} xs={24} md={24} lg={0} xxl={0}>
        <MobileTicketList />
</Col>*/
}
