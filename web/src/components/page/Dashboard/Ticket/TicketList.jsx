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
  console.log(props);
  const {
    ticketId,
    content: { status, title, type, startDate, endDate, actions },
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
  const cancelTicket = (e, ticketId) => {
    console.log(ticketId);
  };
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
      <div
        style={{ flex: "1 0 5em" }}
        className="flex justify-end font-light text-gray-500 lg:justify-start"
      >
        {actions.map((action) => {
          const style = action.style;
          if (action.title.trim() !== "") {
            return (
              <button
                className={style}
                onClick={(e, ticketId) => cancelTicket(e, ticketId)}
              >
                {action.title}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};
export { TicketListItem, TicketList };

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
