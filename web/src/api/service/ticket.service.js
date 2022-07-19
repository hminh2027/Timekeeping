import api from "@/api/api";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";

const getMyTickets = async (sortOptions) => {
  const url = `ticket/me?${sortOptions}`;
  // console.log("URL: ", url);
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
export { getMyTickets, cancelMyTicket, addMyTicket };
