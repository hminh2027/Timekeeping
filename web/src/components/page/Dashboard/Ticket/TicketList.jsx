import { Button } from "antd";
const TicketList = (props) => {
  const tickets = props.tickets;

  return (
    <>
      {/* Table Header */}
      <div
        style={{
          backgroundColor: "#99e2b4",
        }}
        className="hidden p-4 font-semibold lg:flex"
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
    </>
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
  return (
    <div className="lg:flex items-center lg:justify-start lg:px-4 lg:py-8 lg:border-b lg:border-b-orange-600  hover:bg-slate-300">
      <div
        style={{ flex: "1 0 12em" }}
        className="flex font-semibold text-sky-800"
      >
        <div className="mx-4 text-sky-800 w-20 font-semibold lg:hidden">
          Title:
        </div>
        <div className="flex-1">{title}</div>
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
        <Button>{action}</Button>
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
