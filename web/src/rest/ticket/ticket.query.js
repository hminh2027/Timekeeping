import { useQuery } from "@tanstack/react-query";
import { TicketService } from "./ticket.service";

export const useGetMeTicketQuery = () => {
  return useQuery(["get-me-ticket"], () => {
    return TicketService.getMyTicket();
  });
};

export const useGetTicketQuery = () => {
  return useQuery(["get-ticket"], () => {
    return TicketService.getTicket();
  });
}
