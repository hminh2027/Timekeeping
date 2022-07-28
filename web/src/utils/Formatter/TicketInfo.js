import moment from "moment";
const TicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("DD-MM-yyyy");
  const endDate = moment(ticket.endDate).format("DD-MM-yyyy");
  const createdDate = moment(ticket.createdAt).format("DD-MM-yyyy");
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
