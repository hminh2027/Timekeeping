import moment from "moment";
const TicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("yyyy-MM-DD");
  const endDate = moment(ticket.endDate).format("yyyy-MM-DD");
  const createdDate = moment(ticket.createdAt).format("yyyy-MM-DD");
  const actions = [{ title: "Detail", style: "" }];
  if (ticket.ticketStatus === "pending")
    actions.push({ title: "Cancel", style: "v-btn-green" });

  return {
    id: ticket.id,
    content: {
      title: ticket.title,
      ticketType: ticket.ticketType,
      status: ticket.ticketStatus,
      startDate,
      endDate,
      createdDate,
      updateDate: ticket.updatedAt,
      recipientId: ticket.recipient.id,
      recipient: ticket.recipient,
      author: ticket.author,
      content: ticket.content,
      actions,
    },
  };
};
export { TicketInfoFormatter };
