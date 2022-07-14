import moment from "moment";
const TicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("YYYY-MM-DD");
  const endDate = moment(ticket.endDate).format("YYYY-MM-DD");
  const actions = [" "];
  if (ticket.status === "pending") actions.push("Cancel");
  return {
    id: ticket.id,
    content: {
      title: ticket.title,
      type: ticket.ticketType,
      status: ticket.ticketStatus,
      startDate,
      endDate,
      createDate: ticket.createdAt,
      recipient: ticket.recipient,
      actions,
    },
  };
};
export { TicketInfoFormatter };
