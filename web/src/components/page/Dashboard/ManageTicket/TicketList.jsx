import { Button, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../../api/api";
import { selectUserInfo } from "../../../../redux/feature/user/userSlice";
import styles from "../../../../styles/pages/dashboard/ticket.module.scss";
import { TicketInfoFormatter } from "../../../../utils/Formatter/TicketInfo";
import UseModal from "../../../../utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
// import SubmitTicket from "../Ticket/Submit";
import Approve from "./Approve";
const { Option } = Select;
const DesktopTicketList = () => {
  const [tickets, setTickets] = useState(demoTickets);
  const [ticketTypes, setTicketTypes] = useState([]);
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    const fetchTicketTypes = async () => {
      const res = await api.get("ticket/type");
      const { data } = res;
      setTicketTypes(data);
    };
    const fetchTicketData = async () => {
      const res = await api.get(`ticket`);
      const tickets = res.data.map((ticket) => TicketInfoFormatter(ticket));
      setTickets(tickets);
    };
    fetchTicketTypes();
    fetchTicketData();
  }, []);
  // console.log(tickets);
  const filter = () => {};
  return (
    <div
      className={styles[`desktop-ticket-list`]}
      style={{
        backgroundColor: "#fff",
        boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: "1em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "2em" }}>
            <Space>
              <div>Title:</div>
              <Input
                placeholder="Title"
                onChange={filter}
                style={{ flex: "1 0 5em" }}
              />
            </Space>

            <Space>
              <div>Type:</div>
              <Select
                value={ticketTypes[0]}
                style={{ flex: "1 0 8em", minWidth: "8em" }}
              >
                {ticketTypes.map((ticketType) => (
                  <Option value={ticketType}>{ticketType}</Option>
                ))}
              </Select>
            </Space>
            <div className="flex items-center justify-between ">
              <div className="flex flex-1 items-center w-80">
                <div>Status:</div>
                <Select
                  defaultValue="all"
                  className=" w-32"
                  options={status}
                ></Select>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-1" style={{ margin: "2px 10px" }}>
            <div className="flex justify-between gap-1">
              <div className="">🟢</div>
              <div className="">Approved</div>
            </div>
            <div className="flex gap-1">
              <div className="">🔴</div>
              <div className="">Rejected</div>
            </div>
            <div className="flex gap-1">
              <div className="">🟡</div>
              <div className="">Pending</div>
            </div>
            <div className="flex gap-1">
              <div className="">⚪</div>
              <div className="">Cancel</div>
            </div>
          </div>
          <div>
            <Button type="primary">Apply</Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "1em",
          backgroundColor: "#99e2b4",
          fontWeight: "bold",
        }}
      >
        <div style={{ flex: "1 0 12em" }}>Title</div>
        <div style={{ flex: "1 0 5em" }}>Type</div>
        <div style={{ flex: "1 1 50px" }}>Status</div>
        <div style={{ flex: "1 0 10em" }}>Start Date</div>
        <div style={{ flex: "1 0 10em" }}>End Date</div>
        <div style={{ flex: "1 0 5em" }}>Action</div>
      </div>
      {tickets.map((ticket) => (
        <TicketListItem
          key={ticket.id}
          id={ticket.id}
          content={ticket.content}
          style={{ width: "100%" }}
        />
      ))}
    </div>
  );
};
const TicketListItem = (props) => {
  const {
    id,
    style,
    content: { status, title, type, startDate, endDate, action },
  } = props;
  // const { status, title, type, createdDate, respondedDate, action } = content;
  const statusIcon = [];
  switch (status) {
    case "rejected": {
      statusIcon.push("🔴");
      break;
    }
    case "approved": {
      statusIcon.push("🟢");
      break;
    }
    default: {
      statusIcon.push("🟡");
      break;
    }
  }
  const { isShowing, toggle } = UseModal();
  return (
    <div className={styles[`list-item`]} style={style}>
      <div style={{ flex: "1 0 12em" }} className={styles[`title`]}>
        {title}
      </div>
      <div style={{ flex: "1 0 5em" }} className={styles[`type`]}>
        {type}
      </div>
      <div style={{ flex: "1 1 50px" }}>{statusIcon[0]}</div>
      <div style={{ flex: "1 0 10em" }} className={styles[`type`]}>
        {startDate}
      </div>
      <div style={{ flex: "1 0 10em" }} className={styles[`type`]}>
        {endDate}
      </div>
      <div style={{ flex: "1 0 5em" }} className={styles[`type`]}>
        <Approve id={id} num={status}></Approve>
      </div>
    </div>
  );
};
export { TicketListItem, DesktopTicketList };

const demoTickets = [
  {
    id: 1,
    content: {
      title: "Xin vắng mặt",
      type: "Xin nghỉ",
      startDate: "2022-07-05",
      endDate: "2022-07-08",
      status: 1,
    },
  },
  {
    id: 2,
    content: {
      title: "Xin vắng mặt",
      type: "Xin nghỉ",
      status: 2,
      startDate: "2022-07-05",
      endDate: "2022-07-05",
      action: "Approve",
    },
  },
  {
    id: 3,
    content: {
      title: "Xin vắng mặt",
      type: "Xin nghỉ",
      status: 0,
      startDate: "2022-07-05",
      endDate: "2022-07-10",
    },
  },
  {
    id: 4,
    content: {
      title: "Xin vắng mặt",
      type: "Xin nghỉ",
      status: 2,
      startDate: "2022-07-05",
      endDate: "2022-07-05",
      action: "Cancel",
    },
  },
];
