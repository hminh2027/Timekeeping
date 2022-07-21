import api from "@/api/api";
import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";

const getMyTickets = async (sortOptions) => {
  const ticketSortOptions = sortOptions || "undefined";
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

const cancelTicket = async (ticketID) => {
  const res = await api.delete (`ticket/${ticketID}`);
  
};

const approveTicket = async (ticketID) => {
  const res = await api.patch(`ticket/${ticketID}/approve`);
  console.log(res)
};

const rejectTicket = async (ticketID) => {
  const res = await api.patch(`ticket/${ticketID}/reject`);
  console.log(res)
};

export { getMyTickets, cancelMyTicket, getTickets, addMyTicket, cancelTicket, approveTicket, rejectTicket };
