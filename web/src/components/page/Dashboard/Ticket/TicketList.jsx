import { useDispatch } from "react-redux";
import { cancelTicket } from "@/redux/feature/ticket/ticketSlice";
import React, { useReducer } from "react";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
import CommentTicket from "./CommentTicket";
import TicketInfo from "./TicketInfo";
import Link from "next/link";

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
          content={ticket.content}
        />
      ))}
    </>
  );
};
const TicketListItem = (props) => {
  const { isShowing, toggle } = UseModal();
  const dispatch = useDispatch();
  const {
    id,
    content: { status, title, ticketType, recipient, actions, createdDate },
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
  const openModal = (id) => {
    toggle();
  };
  return (
    <div
      className="items-center py-4 font-medium border-b-4 border-[#fafafa] lg:flex lg:justify-start lg:px-4 lg:py-8 hover:bg-[#cdf0ea]"
      // onClick={() => openModal(id)}
    >
      <div
        style={{ flex: "1 0 10em" }}
        className="flex font-light text-gray-500 "
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Created by:
        </div>
        <div className="flex-1">{recipient.lastName}</div>
      </div>
      <div style={{ flex: "1 0 10em" }} className="flex text-sky-800">
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Title:
        </div>
        <div className="flex-1 font-semibold text-ellipsis max-w-32 overflow-clip">
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
          {statusIcon[0]} <span className="text-black lg:hidden">{status}</span>
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

const arrow_down_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
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
    className="w-5 h-5"
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
