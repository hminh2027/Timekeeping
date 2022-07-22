import api from "@/api/api";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";
import { TICKET_FILTER } from "@/utils/constants";
const getMyTickets = async (sortOptions) => {
  try {
    const ticketSortOptions =
      sortOptions ||
      `${TICKET_FILTER.limit}=50&${TICKET_FILTER.page}=1&${TICKET_FILTER.title}=&${TICKET_FILTER.type}=&ticketStatus=&${TICKET_FILTER.field}=endDate&${TICKET_FILTER.orderBy}=false`;
    const url = `ticket/me?${ticketSortOptions}`;
    const res = await api.get(url);
    const resTickets = res.data.map((ticket) => TicketInfoFormatter(ticket));
    return resTickets;
  } catch (err) {
    console.log(err);
  }
};

const getTickets = async (sortOptions) => {
  const url = `ticket?${sortOptions}`;
  const res = await api.get(url);
  const resTickets = res.data.map((ticket) => TicketInfoFormatter(ticket));
  // console.log("RES:", resTickets);
  return resTickets;
};
const getTicket = async (id) => {
  const url = `ticket/${id}`;
  const res = await api.get(url);
  const ticket = TicketInfoFormatter(res.data);
  return ticket;
};

const addMyTicket = async (ticketContent) => {
  const res = await api.post("ticket", ticketContent);
  return res;
};
const updateMyTicket = async (ticketID, ticketContent) => {
  const res = await api.patch(`ticket/${ticketID}`, ticketContent);
  return res;
};
const cancelMyTicket = async (ticketID) => {
  const res = await api.patch(`ticket/${ticketID}/cancel`);
  console.log(res);
};

export {
  getMyTickets,
  cancelMyTicket,
  getTickets,
  addMyTicket,
  updateMyTicket,
  getTicket,
};
