import { useQuery, useMutation } from "@tanstack/react-query";
import { TicketService } from "./ticket.service";

export const useGetMeTicketQuery = () => {
  return useQuery(["get-me-ticket"], () => {
    return TicketService.getMyTicket();
  });
};

export const useGetTicketQuery = (sort) => {
  return useQuery(["get-ticket",sort], () => {
    return TicketService.getTicket(sort);
  });
}

export const useGetTicketQueryId = (id) => {
  return useQuery(["get-ticket-id"], () => {
    return TicketService.getTicketId(id);
  });
}

export const useGetTicketTypeQuery = () => {
  return useQuery(["get-ticket-type", () => { 
    return TicketService.getTicketType();
  }])
}

export const useApproveTicketMutation = () => {
  return useMutation((id) => {
    return TicketService.approveTicket(id);
  })
}

export const useRejectTicketMutation = () => {
  return useMutation((id) => {
    return TicketService.rejectTicket(id);
  })
}
export const useDeleteTicketMutation = () => {
  return useMutation((id) => {
    return TicketService.deleteTicket(id);
  })
}
