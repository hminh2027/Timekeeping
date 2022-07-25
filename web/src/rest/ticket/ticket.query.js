import { useQuery } from "@tanstack/react-query";
import { TicketService } from "./ticket.service";

export const useGetMeTicketQuery = () => {
  return useQuery(["get-me-ticket"], () => {
    return TicketService.getMyTicket();
  });
};
