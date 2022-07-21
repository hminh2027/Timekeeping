import { Button, Input, Select, Space } from "antd";
import React, { useReducer } from "react";
import Approve from "./Approve";
import { useDispatch } from "react-redux";
const { Option } = Select;
const initSort = {
  createdAt: false,
  startDate: false,
  endDate: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "SORT_CREATED_AT": {
      return { ...initSort, createdAt: action.data };
    }
    case "SORT_START_DATE": {
      state = { ...initSort };
      state.startDate = action.data;
      return state;
    }
    case "SORT_END_DATE": {
      state = { ...initSort };
      state.endDate = action.data;
      return state;
    }
    default:
      return state;
  }
}
const TicketList = React.memo((props) => {
  const tickets = props.tickets;
  console.log("TICKETS LIST ",tickets)
  const [state, dispatch] = useReducer(reducer, initSort);
  const { createdAt, startDate, endDate } = state;

  const sortHandle = (sortField, sortType) => {
    const sortOption = {
      sortField,
      sortType,
    };
    props.onSort(sortOption);
  };

  const filter = () => {};
  return (
    <>
      <div
        className="hidden p-4 font-semibold lg:flex"
        style={{ background: "rgb(153, 226, 180)" }}
      >
        <div className="font-semibold" style={{ flex: "1 0 2em" }}>
          Id
        </div>
        <div className="font-semibold" style={{ flex: "1 0 8em" }}>
          Title
        </div>
        <div className="font-semibold" style={{ flex: "1 0 5em" }}>
          Author
        </div>
        <div className="font-semibold" style={{ flex: "1 0 3em" }}>
          Type
        </div>
        <div className="font-semibold" style={{ flex: "1 1 3em" }}>
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
          <div>Created At</div>
          <div className="ml-4">
            {createdAt ? arrow_down_icon : arrow_up_icon}
          </div>
        </div>
        <div className="font-semibold" style={{ flex: "1 0 2em" }}>
          Action
        </div>
      </div>
      {/* <div className="flex flex-1"> */}
      <div className="h-[500px] overflow-auto pb-1">
        {tickets?.map((ticket,i) => (
          <TicketListItem
            key={i}
            id={ticket.id}
            content={ticket.content}
          />
        ))}
      </div>
      {/* </div> */}
    </>
  );
});
const TicketListItem = (props) => {
  console.log("props",props)
  const {
    id,
    content: { status, title, type ,author, startDate, actions },
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
    case "pending": {
      statusIcon.push("🟡");
      break;
    }
    default: {
      statusIcon.push("⚪");
      break;
    }
  }
  return (
    <div className="items-center w-full py-4 font-medium border-b border-b-orange-600 lg:flex lg:justify-start lg:px-4 lg:py-8 hover:bg-sky-200">
      <div style={{ flex: "1 0 2em" }} className="flex text-sky-800">
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Id:
        </div>
        <div className="flex-1 font-semibold">{id}</div>
      </div>
      <div
        style={{ flex: "1 0 8em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Title:
        </div>
        <div className="flex-1">{title}</div>
      </div>
      <div
        style={{ flex: "1 0 5em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Author:
        </div>
        <div className="flex-1">{author.lastName+" "+author.firstName}</div>
      </div>
      <div
        style={{ flex: "1 0 5em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Type:
        </div>
        <div className="flex-1">{type}</div>
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
        <div className="flex-1">{startDate}</div>
      </div>
      <div style={{ flex: "1 0 2em" }} className="font-light text-gray-500">
        <Approve id={id} num={status}></Approve>
      </div>
    </div>
  );
};
export { TicketListItem, TicketList };
const arrow_down_icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
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
    class="h-5 w-5"
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
