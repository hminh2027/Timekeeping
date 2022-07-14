import api from "@/api/api";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";

const getMyTickets = async () => {
  const res = await api.get(`ticket/me`);
  const resTickets = res.data.map((ticket) => TicketInfoFormatter(ticket));
  // console.log("RES:", resTickets);
  return resTickets;
};

const cancelMyTicket = async (ticketID) => {
  console.log(ticketID);
  const res = await api.patch(`ticket/${ticketID}/cancel`);
  console.log(res);
};
export { getMyTickets, cancelMyTicket };
