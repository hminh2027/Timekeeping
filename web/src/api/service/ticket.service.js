import api from "@/api/api";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";

const getMyTickets = async () => {
  const url = `ticket/me?limit=10&page=1&textSearch=&ticketType=short term&ticketStatus=pending&sortBy=createdAt&orderBy=true`;
  console.log("URL: ", url);
  const res = await api.get(url);
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
