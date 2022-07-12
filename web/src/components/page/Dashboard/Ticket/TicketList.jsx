import api from "@/api/api";
import styles from "@/styles/pages/dashboard/ticket.module.scss";
import { Button, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";
const { Option } = Select;
const TicketList = (props) => {
  const [tickets, setTickets] = useState(demoTickets);
  const [ticketTypes, setTicketTypes] = useState([]);

  useEffect(() => {
    const fetchTicketTypes = async () => {
      const res = await api.get("ticket/type");
      const { data } = res;
      setTicketTypes(data);
    };

    fetchTicketTypes();
  }, []);

  useEffect(() => {
    const fetchTicketData = async () => {
      const res = await api.get(`ticket/me`);
      const resTickets = res.data.map((ticket) => TicketInfoFormatter(ticket));
      setTickets(resTickets);
    };
    fetchTicketData();
    return () => {
      setTickets([]);
      props.onFetched();
    };
  }, [props.newTicketSubmitted]);

  // console.log(tickets);
  const filter = () => {};
  return (
    <div
      className={`${styles[`desktop-ticket-list`]}`}
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

              <div className="flex gap-2 flex-1">
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
          content={ticket.content}
          style={{ width: "100%" }}
        />
      ))}
    </div>
  );
};
const TicketListItem = (props) => {
  const {
    style,
    content: { status, title, type, startDate, endDate, action },
  } = props;
  // const { status, title, type, createdDate, respondedDate, action } = content;
  const statusIcon = [];
  switch (status) {
    case 0: {
      statusIcon.push("🔴");
      break;
    }
    case 1: {
      statusIcon.push("🟢");
      break;
    }
    default: {
      statusIcon.push("🟡");
      break;
    }
  }
  return (
    <div className="lg:flex items-center lg:justify-start lg:px-4 lg:py-8 lg:border-b lg:border-b-orange-600">
      <div
        style={{ flex: "1 0 12em" }}
        className="font-semibold text-sky-800 before:content-['Title:'] before:mx-4 "
      >
        {title}
      </div>
      <div
        style={{ flex: "1 0 5em" }}
        className={`font-light text-gray-500 before:content-[${"Type:"}] before:mx-4 `}
      >
        {type}
      </div>
      <div style={{ flex: "1 1 50px" }}>{statusIcon[0]}</div>
      <div style={{ flex: "1 0 10em" }} className="font-light text-gray-500">
        {startDate}
      </div>
      <div style={{ flex: "1 0 10em" }} className="font-light text-gray-500">
        {endDate}
      </div>
      <div style={{ flex: "1 0 5em" }} className="font-light text-gray-500">
        <Button>{action}</Button>
      </div>
    </div>
  );
};
export default TicketList;

const demoTickets = [
  {
    id: 1,
    content: {
      title: "Xin vắng mặt",
      type: "Xin nghỉ",
      createdAt: "2022-07-05",
      respondedAt: "2022-07-08",
      status: 1,
    },
  },
  {
    id: 2,
    content: {
      title: "Xin vắng mặt",
      type: "Xin nghỉ",
      status: 2,
      createdAt: "2022-07-05",
      // respondedAt: "2022-07-05",
      action: "Cancel",
    },
  },
  {
    id: 3,
    content: {
      title: "Xin vắng mặt",
      type: "Xin nghỉ",
      status: 0,
      createdAt: "2022-07-05",
      respondedAt: "2022-07-10",
    },
  },
  {
    id: 4,
    content: {
      title: "Xin vắng mặt",
      type: "Xin nghỉ",
      status: 2,
      createdAt: "2022-07-05",
      // respondedAt: "2022-07-05",
      action: "Cancel",
    },
  },
];
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
// const MobileTicketList = () => {
//   return (
//     <div
//       style={{ minWidth: "100%", minHeight: "5em" }}
//       className={styles[`mobile-ticket-list`]}
//     >
//       {tickets.map((ticket) => (
//         <TicketListItem
//           key={ticket.id}
//           status={ticket.status}
//           type={ticket.type}
//           title={ticket.title}
//         />
//       ))}
//     </div>
//   );
// };
