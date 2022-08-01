import { cancelTicket } from "@/redux/feature/ticket/ticketSlice";
import React, { useReducer } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { useCancelTicketMutation } from "@/rest/ticket/ticket.query";
import { USER_TICKET } from "@/utils/constants/react-query";
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
    console.log("sortOption", sortOption);
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
          Sent to
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
            {createdAt ? arrow_up_icon : arrow_down_icon}
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
          content={ticket.content}
        />
      ))}
    </>
  );
};
const TicketListItem = (props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: cancelTicket } = useCancelTicketMutation();
  const {
    id,
    content: { status, title, ticketType, recipient, createdDate },
  } = props;
  const actions = [
    {
      title: "Detail",
      style: "v-btn",
      onClick: () => router.push(`/dashboard/ticket/${id}`),
    },
  ];
  if (status === "pending")
    actions.push({
      title: "Cancel",
      style: "v-btn-gray",
      onClick: () => cancelHandler(),
    });

  const TICKET_STATUS = {
    REJECTED: { background: "bg-[#ffedeb]", text: "text-[#ff564c]" },
    APPROVED: { background: "bg-[#e5f7ed]", text: "text-[#00b14f]" },
    CANCELLED: { background: "bg-[#f5f5f5]", text: "text-[#9f9f9f]" },
    PENDING: { background: "bg-[#fff5e6]", text: "text-[#ff9f0a]" },
  };

  const cancelHandler = (id) => {
    dispatch(cancelTicket(id));
  };
  const openModal = (id) => {
    toggle();
  };
  return (
    <div
      className="items-center border-b-4 border-[#fafafa] py-4 font-medium lg:flex lg:justify-start lg:px-4 lg:py-8 "
      // onClick={() => openModal(id)}
    >
      <div
        style={{ flex: "1 0 10em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Sent to:
        </div>
        <div className="flex-1">{recipient.lastName}</div>
      </div>
      <div style={{ flex: "1 0 10em" }} className="flex text-sky-800">
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Title:
        </div>
        <div className="flex-1 font-semibold max-w-32 overflow-clip text-ellipsis">
          {title}
        </div>
      </div>
      <div
        style={{ flex: "1 0 3em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Type:
        </div>
        <div className="flex-1">{ticketType}</div>
      </div>
      <div
        style={{ flex: "1 1 2em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Status:
        </div>
        <div className="flex-1">
          <div
            className={`p-2g w-fit rounded-xl ${
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
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Created at:
        </div>
        <div className="flex-1">{createdDate}</div>
      </div>
      <div
        style={{ flex: "1 0 3em" }}
        className="flex justify-end gap-2 font-light text-gray-500 lg:justify-start"
      >
        {actions?.map((action) => (
          <button className={action.style} onClick={action.onClick}>
            {action.title}
          </button>
        ))}
      </div>
    </div>
  );
};
export { TicketListItem, TicketList };

const arrow_down_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
const arrow_up_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
