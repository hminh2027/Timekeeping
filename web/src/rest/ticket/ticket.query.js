import { useMutation, useQuery } from "@tanstack/react-query";
import { TicketService } from "./ticket.service";

import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";
import TicketInfo from "@/components/page/Dashboard/Ticket/TicketInfo";

export const useGetMeTicketQuery = () => {
  return useQuery(["get-me-ticket"], () => {
    return TicketService.getMyTicket();
  });
};
export const useGetMyTicketWithSortQuery = (
  sortOptions,
  onSuccessTickets,
  needFetch
) => {
  return useQuery(
    ["get-my-tickets-with-sort"],
    () => TicketService.getMyTicketWithSort(sortOptions),
    {
      select: (tickets) => tickets.map((ticket) => TicketInfoFormatter(ticket)),
      onSuccess: onSuccessTickets,
      enabled: !!needFetch,
    }
  );
};
export const useGetTicketInfoQuery = (id) => {
  return useQuery(
    ["get-ticket-info"],
    () => {
      return TicketService.getTicketInfo(id);
    },
    {
      select: (data) => TicketInfoFormatter(data),
    }
  );
};
export const updateTicketInfoQuery = (id, ticketInfo) => {
  return useMutation(TicketService.updateTicketInfo(id, ticketInfo));
};
