import moment from "moment";
const TicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("yyyy-MM-DD");
  const endDate = moment(ticket.endDate).format("yyyy-MM-DD");
  const createdDate = moment(ticket.createdAt).format("yyyy-MM-DD");
  const actions = [{ title: " ", style: "" }];
  if (ticket.ticketStatus === "pending")
    actions.push({ title: "Cancel", style: "v-btn-third" });
  return {
    id: ticket.id,
    content: {
      title: ticket.title,
      ticketType: ticket.ticketType,
      status: ticket.ticketStatus,
      startDate,
      endDate,
      createdDate,
      recipient: ticket.recipient,
      author: ticket.author,
      content: ticket.content,
      actions,
    },
  };
};
export { TicketInfoFormatter };
