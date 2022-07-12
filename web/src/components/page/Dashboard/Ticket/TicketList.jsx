import api from "@/api/api";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";
import { DesktopFilter, MobileFilter } from "./Filters";
const TicketList = (props) => {
  const [tickets, setTickets] = useState(demoTickets);

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

  return (
    <div
      className="flex flex-col overflow-auto rounded-lg m-1"
      style={{
        backgroundColor: "#fff",
        boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
      }}
    >
      <DesktopFilter className="hidden lg:flex" />
      <MobileFilter className="lg:hidden" />
      {/* Table Header */}
      <div
        style={{
          padding: "1em",
          backgroundColor: "#99e2b4",
          fontWeight: "bold",
        }}
        className="hidden lg:flex"
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
        className="flex font-semibold text-sky-800"
      >
        <div className="mx-4 text-sky-800 w-20 font-semibold lg:hidden">
          Title:
        </div>
        <div className="flex-1">{title}</div>
      </div>
      <div
        style={{ flex: "1 0 5em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="mx-4 text-sky-800 w-20 font-semibold lg:hidden">
          Type:
        </div>
        <div className="flex-1">{type}</div>
      </div>
      <div style={{ flex: "1 1 50px" }} className="flex">
        <div className="mx-4 text-sky-800 w-20 font-semibold lg:hidden">
          Status:
        </div>
        <div className="flex-1">{statusIcon[0]}</div>
      </div>
      <div
        style={{ flex: "1 0 10em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="mx-4 text-sky-800 w-20 font-semibold lg:hidden">
          Start date:
        </div>
        <div className="flex-1">{startDate}</div>
      </div>
      <div
        style={{ flex: "1 0 10em" }}
        className="flex font-light text-gray-500"
      >
        <div className="mx-4 text-sky-800 w-20 font-semibold lg:hidden">
          End date:
        </div>
        <div className="flex-1">{endDate}</div>
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
