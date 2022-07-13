import { Col, Row } from "antd";
import Header from "./TicketHeader";
import { DesktopTicketList } from "./TicketList";
const TicketContent = () => {
  return (
    <Row>
      <Header />
      {/*  sm={0} xs={0} md={0} lg={24} xxl={24} */}
      <Col span={24}>
        <DesktopTicketList />
      </Col>
      {/* <Card>aaaaaaaaaaaaaaaaaaaaa</Card> */}
      {/* <Col sm={24} xs={24} md={24} lg={18} xxl={18}>
        <SubmitTicket />
      </Col> */}
    </Row>
  );
};

export default TicketContent;
{
  /* <Col sm={24} xs={24} md={24} lg={0} xxl={0}>
        <MobileTicketList />
</Col>*/
}
