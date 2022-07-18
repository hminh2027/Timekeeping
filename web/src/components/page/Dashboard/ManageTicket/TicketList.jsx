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
const TicketList = () => {
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
  const filter = () => {};
  return (
    <div
      className={styles[`desktop-ticket-list`]}
      style={{
        backgroundColor: "#fff",
        boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
      }}
    >
      <div className = "flex flex-col p-4">
        <div className="flex justify-between">
          <div className="flex gap-8">
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
          <div className="flex gap-2 flex-1 mx-1 my-3" >
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
            <button 
              type="primary" 
              className=" w-full border border-solid border-teal-600 shadow-xl bg-teal-600 text-gray-100 p-2 hover:text-zinc-500 rounded-lg">
              Apply
            </button>
          </div>
        </div>
      </div>
      <div
        className=" bg-emerald-400 hidden p-4 font-semibold lg:flex">
        <div style={{ flex: "1 0 12em" }}>Title</div>
        <div style={{ flex: "1 0 5em" }}>Type</div>
        <div style={{ flex: "1 1 50px" }}>Status</div>
        <div style={{ flex: "1 0 10em" }}>Start Date</div>
        <div style={{ flex: "1 0 10em" }}>End Date</div>
        <div style={{ flex: "1 0 5em" }}>Action</div>
      </div>
      {tickets.map((ticket) => (
        <TicketListItem
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
    content: { status, title, type, startDate, endDate, actions },
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
  // const { isShowing, toggle } = UseModal();
  return (
    <div className="py-4 border-b border-b-orange-600 lg:flex items-center lg:justify-start lg:px-4 lg:py-8 hover:bg-sky-200">
      <div
        style={{ flex: "1 0 12em" }}
        className="flex font-semibold text-sky-800"
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Title:
        </div>
        <div className="flex-1">{title}</div>
      </div>
      <div
        style={{ flex: "1 0 5em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Type:
        </div>
        <div className="flex-1">{type}</div>
      </div>
      <div style={{ flex: "1 1 50px" }} className="flex">
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Status:
        </div>
        <div className="flex-1">{statusIcon[0]}</div>
      </div>
      <div
        style={{ flex: "1 0 10em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Start date:
        </div>
        <div className="flex-1">{startDate}</div>
      </div>
      <div
        style={{ flex: "1 0 10em" }}
        className="flex font-light text-gray-500"
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          End date:
        </div>
        <div className="flex-1">{endDate}</div>
      </div>
      <div style={{ flex: "1 0 5em" }} className="font-light text-gray-500">
        <Approve id={id} num={status}></Approve>
      </div>
    </div>
  );
};
export { TicketListItem, TicketList };

const demoTickets = [];

const status = [
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">All</div>
        <div className=""></div>
      </div>
    ),
    value: "all",
  },
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">Approved</div>
        <div className="">🟢</div>
      </div>
    ),
    value: "approved",
  },
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">Pending</div>
        <div className="">🟡</div>
      </div>
    ),
    value: "pending",
  },
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">Rejected</div>
        <div className="">🔴</div>
      </div>
    ),
    value: "rejected",
  },
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">Cancelled</div>
        <div className="">⚪</div>
      </div>
    ),
    value: "cancelled",
  },
];
