import moment from "moment";
const TicketInfoFormatter = (ticket) => {
  const startDate = moment(ticket.startDate).format("YYYY-MM-DD");
  const endDate = moment(ticket.endDate).format("YYYY-MM-DD");
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
      // respondedAt: "2022-07-05",
      //   action: "Cancel",
    },
  };
};
export { TicketInfoFormatter };
