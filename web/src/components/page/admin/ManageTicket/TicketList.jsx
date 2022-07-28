import React, { useReducer } from "react";
import Approve from "./Approve";
const initSort = {
  createdAt: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "SORT_CREATED_AT": {
      return { ...initSort, createdAt: action.data };
    }
    default:
      return state;
  }
}
const TicketList = (props) => {
  const tickets = props.tickets;
  const [state, dispatch] = useReducer(reducer, initSort);
  const { createdAt } = state;
  const sortHandle = (sortBy, orderBy) => {
    const sortOption = {
      sortBy,
      orderBy,
    };
    props.onSort(sortOption);
  };

  return (
    <>
      {/* Table Header */}
      <div
        style={{
          backgroundColor: "#f0f0f0",
        }}
        className="hidden p-4 font-semibold lg:flex"
      >
        <div className="font-semibold" style={{ flex: "1 0 10em" }}>
          Created by
        </div>
        <div className="font-semibold" style={{ flex: "1 0 10em" }}>
          Title
        </div>
        <div className="font-semibold" style={{ flex: "1 0 3em" }}>
          Type
        </div>
        <div className="font-semibold" style={{ flex: "1 1 2em" }}>
          Status
        </div>
        <div
          className="flex font-semibold"
          style={{ flex: "1 0 8em" }}
          onClick={() => {
            dispatch({ type: "SORT_CREATED_AT", data: !createdAt });
            sortHandle("createdAt", !createdAt);
          }}
        >
          Created At
          <div className="ml-4">
            {createdAt ? arrow_down_icon : arrow_up_icon}
          </div>
        </div>
        <div className="font-semibold" style={{ flex: "1 0 3em" }}>
          Action
        </div>
      </div>
      {tickets?.map((ticket) => (
        <TicketListItem
          key={ticket.id}
          id={ticket.id}
          author={ticket.author}
          content={ticket.content}
          title={ticket.title}
          createdAt={new Date(ticket.createdAt).toLocaleDateString()}
          status={ticket.ticketStatus}
          type={ticket.ticketType}
        />
      ))}
    </>
  );
};
const TicketListItem = (props) => {
  const {
    id,
    status,
    title,
    type,
    author,
    content,
    createdAt,    
    } = props;

  const statusIcon = [];

  const TICKET_STATUS = {
    REJECTED: { background: "bg-[#ffedeb]", text: "text-red-600" },
    APPROVED: { background: "bg-[#e5f7ed]", text: "text-[#00b14f]" },
    CANCELLED: { background: "bg-[#f5f5f5]", text: "text-red-600" },
    PENDING: { background: "bg-[#fff5e6]", text: "text-[#ff9f0a]" },
  };

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
  return (
    <div
      className="items-center border-b-4 border-[#fafafa] py-4 font-medium lg:flex lg:justify-start lg:px-4 lg:py-8 "
      // onClick={() => openModal(id)}
    >
      <div
        style={{ flex: "1 0 10em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Created by:
        </div>
        <div className="flex-1">{author.lastName}</div>
      </div>
      <div style={{ flex: "1 0 10em" }} className="flex text-sky-800">
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Title:
        </div>
        <div className="max-w-32 flex-1 overflow-clip text-ellipsis font-semibold">
          {title}
        </div>
      </div>
      <div
        style={{ flex: "1 0 3em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Type:
        </div>
        <div className="flex-1">{type}</div>
      </div>
      <div
        style={{ flex: "1 1 2em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Status:
        </div>
        <div className="flex-1">
          <div
            className={`w-fit rounded-xl p-2 text-black ${
              TICKET_STATUS[status.toUpperCase()].background
            } ${TICKET_STATUS[status.toUpperCase()].text}`}
          >
            {status}
          </div>
        </div>
      </div>
      <div
        style={{ flex: "1 0 8em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Created at:
        </div>
        <div className="flex-1">{createdAt}</div>
      </div>
      <div
        style={{ flex: "1 0 3em" }}
        className="flex justify-end gap-2 font-light text-gray-500 lg:justify-start"
      >
        <Approve id={id} num={status}></Approve>
      </div>
    </div>
  );
};
export default TicketList;

const arrow_down_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
      clip-rule="evenodd"
    />
  </svg>
);
const arrow_up_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
      clip-rule="evenodd"
    />
  </svg>
);