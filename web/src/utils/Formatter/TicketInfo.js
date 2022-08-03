import moment from "moment";

export const TicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("yyyy-MM-DD");
  const endDate = moment(ticket.endDate).format("yyyy-MM-DD");
  const createdAt = moment(ticket.createdAt).format("yyyy-MM-DD");
  const updatedAt = moment(ticket.createdAt).format("yyyy-MM-DD");
  return {
    id: ticket.id,
    key: ticket.id,
    recipient: ticket.recipient,
    title: ticket.title,
    type: ticket.ticketType,
    status: ticket.ticketStatus,
    createdAt,
    startDate,
    endDate,
    updatedAt,
    author: ticket.author,
    content: ticket.content,
  };
};

export const AdminTicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("yyyy-MM-DD");
  const endDate = moment(ticket.endDate).format("yyyy-MM-DD");
  const createdAt = moment(ticket.createdAt).format("yyyy-MM-DD");
  const updatedAt = moment(ticket.createdAt).format("yyyy-MM-DD");
  return {
    id: ticket.id,
    key: ticket.id,
    author: ticket.author,
    title: ticket.title,
    type: ticket.ticketType,
    status: ticket.ticketStatus,
    createdAt,
    startDate,
    endDate,
    updatedAt,
    content: ticket.content,
  };
};
