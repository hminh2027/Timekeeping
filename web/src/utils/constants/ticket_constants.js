export const ALL_TICKET_TYPES = [
  { label: "All", value: "" },
  { label: "long term", value: "long term" },
  { label: "short term", value: "short term" },
];
export const SUBMIT_TICKET_TYPES = [
  { label: "long term", value: "long term" },
  { label: "short term", value: "short term" },
];

export const TICKET_FILTER = {
  limit: "limit",
  page: "page",
  title: "search",
  type: "ticketType",
  status: "ticketStatus",
  field: "sortField",
  orderBy: "sortType",
};

export const TICKET_STATUS = {
  REJECTED: "rejected",
  APPROVED: "approved",
  CANCELLED: "cancelled",
  PENDING: "pending",
};

export const TICKET_STATUS_COLOR = {
  REJECTED: {
    background: "#ffedeb",
    text: "#ff564c",
  },
  APPROVED: {
    background: "#e5f7ed",
    text: "#00b14f",
  },
  CANCELLED: {
    background: "#f5f5f5",
    text: "#9f9f9f",
  },
  PENDING: {
    background: "#fff5e6",
    text: "#ff9f0a",
  },
};

export const STATUS_TICKET = [
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">All</div>
        <div className=""></div>
      </div>
    ),
    value: "",
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
