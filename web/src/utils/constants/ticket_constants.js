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
