import moment from "moment";

const TicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("yyyy-MM-DD");
  const endDate = moment(ticket.endDate).format("yyyy-MM-DD");
  const createdAt = moment(ticket.createdAt).format("yyyy-MM-DD");
  const updatedAt = moment(ticket.createdAt).format("yyyy-MM-DD");
  const formatted = {
    id: ticket.id,
    key: ticket.id,
    recipientName: ticket.recipient.firstName + " " + ticket.recipient.lastName,
    title: ticket.title,
    type: ticket.ticketType,
    status: ticket.ticketStatus,
    createdAt,
    startDate,
    endDate,
    updatedAt,
    recipient: ticket.recipient,
    author: ticket.author,
    content: ticket.content,
  };
  return formatted;
};
export { TicketInfoFormatter };
