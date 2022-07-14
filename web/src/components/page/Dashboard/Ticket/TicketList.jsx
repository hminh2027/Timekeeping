import { useDispatch } from "react-redux";
import { cancelTicket } from "@/redux/feature/ticket/ticketSlice";
const TicketList = (props) => {
  const tickets = props.tickets;
  // const tickets = props.tickets;
  return (
    <>
      {/* Table Header */}
      <div
        style={{
          backgroundColor: "#99e2b4",
        }}
        className="hidden p-4 font-semibold lg:flex"
      >
        <div className="font-semibold" style={{ flex: "1 0 10em" }}>
          Title
        </div>
        <div className="font-semibold" style={{ flex: "1 0 3em" }}>
          Type
        </div>
        <div className="font-semibold" style={{ flex: "1 1 2em" }}>
          Status
        </div>
        <div className="font-semibold" style={{ flex: "1 0 8em" }}>
          Created At
        </div>
        <div className="font-semibold" style={{ flex: "1 0 8em" }}>
          Start Date
        </div>
        <div className="font-semibold" style={{ flex: "1 0 8em" }}>
          End Date
        </div>
        <div className="font-semibold" style={{ flex: "1 0 3em" }}>
          Action
        </div>
      </div>
      {tickets.map((ticket) => (
        <TicketListItem
          key={ticket.id}
          id={ticket.id}
          content={ticket.content}
        />
      ))}
    </>
  );
};
const TicketListItem = (props) => {
  // console.log("PROPS: ", props);
  const dispatch = useDispatch();
  const {
    id,
    content: { status, title, type, startDate, endDate, actions },
  } = props;
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
    case "cancelled": {
      statusIcon.push("⚪");
      break;
    }
    default: {
      statusIcon.push("🟡");
      break;
    }
  }
  const cancelHandler = (id) => {
    dispatch(cancelTicket(id));
  };
  return (
    <div className="font-medium py-4 border-b border-b-orange-600 lg:flex items-center lg:justify-start lg:px-4 lg:py-8 hover:bg-sky-200">
      <div style={{ flex: "1 0 10em" }} className="flex text-sky-800">
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Title:
        </div>
        <div className="flex-1 font-semibold">{title}</div>
      </div>
      <div
        style={{ flex: "1 0 3em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Type:
        </div>
        <div className="flex-1">{type}</div>
      </div>
      <div
        style={{ flex: "1 1 2em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Status:
        </div>
        <div className="flex-1">
          {statusIcon[0]} <span className="text-black lg:hidden">{status}</span>
        </div>
      </div>
      <div
        style={{ flex: "1 0 8em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Created at:
        </div>
        <div className="flex-1">{startDate}</div>
      </div>
      <div
        style={{ flex: "1 0 8em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          Start date:
        </div>
        <div className="flex-1">{startDate}</div>
      </div>
      <div
        style={{ flex: "1 0 8em" }}
        className="flex font-light text-gray-500"
      >
        <div className="mx-4 text-sky-800 w-32 font-semibold lg:hidden">
          End date:
        </div>
        <div className="flex-1">{endDate}</div>
      </div>
      <div
        style={{ flex: "1 0 3em" }}
        className="flex justify-end font-light text-gray-500 lg:justify-start"
      >
        {actions.map((action) => {
          const style = action.style;
          if (action.title.trim() !== "") {
            return (
              <button className="v-btn-third" onClick={() => cancelHandler(id)}>
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
