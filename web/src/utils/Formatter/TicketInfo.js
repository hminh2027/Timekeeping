import moment from "moment";
const TicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("YYYY-MM-DD");
  const endDate = moment(ticket.endDate).format("YYYY-MM-DD");
  const actions = [{ title: " ", style: "" }];
  if (ticket.ticketStatus === "pending")
    actions.push({ title: "Cancel", style: "v-btn-third" });
  // <div className=""></div>
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
      author: ticket.author,
      content: ticket.content,
      actions,
    },
  };
};
export { TicketInfoFormatter };
