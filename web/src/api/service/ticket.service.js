import api from "@/api/api";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";
import { TICKET_FILTER } from "@/utils/constants";
const getMyTickets = async (sortOptions) => {
  const ticketSortOptions =
    sortOptions ||
    `${TICKET_FILTER.limit}=50&${TICKET_FILTER.page}=1&${TICKET_FILTER.title}=&${TICKET_FILTER.type}=&ticketStatus=&${TICKET_FILTER.field}=endDate&${TICKET_FILTER.orderBy}=false`;
  const url = `ticket/me?${ticketSortOptions}`;
  // console.log("URL: ", url);
  const res = await api.get(url);
  const resTickets = res.data.map((ticket) => TicketInfoFormatter(ticket));
  // console.log("RES:", resTickets);
  return resTickets;
};

const getTickets = async (sortOptions) => {
  const url = `ticket?${sortOptions}`;
  const res = await api.get(url);
  const resTickets = res.data.map((ticket) => TicketInfoFormatter(ticket));
  // console.log("RES:", resTickets);
  return resTickets;
};

const addMyTicket = async (ticketContent) => {
  const res = await api.post("ticket", ticketContent);
  return res;
};
const cancelMyTicket = async (ticketID) => {
  console.log(ticketID);
  const res = await api.patch(`ticket/${ticketID}/cancel`);
  console.log(res);
};
export { getMyTickets, cancelMyTicket, getTickets, addMyTicket };
