import { useQuery, useMutation } from "@tanstack/react-query";
import { TicketService } from "./ticket.service";

import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";
import TicketInfo from "@/components/page/Dashboard/Ticket/TicketInfo";

export const useGetMeTicketQuery = () => {
  return useQuery(["get-me-ticket"], () => {
    return TicketService.getMyTicket();
  });
};

export const useGetTicketQuery = (sort) => {
  return useQuery(["get-ticket", sort], () => {
    return TicketService.getTicket(sort);
  });
};

export const useGetTicketQueryId = (id) => {
  return useQuery(["get-ticket-id"], () => {
    return TicketService.getTicketId(id);
  });
};

export const useGetTicketTypeQuery = () => {
  return useQuery([
    "get-ticket-type",
    () => {
      return TicketService.getTicketType();
    },
  ]);
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
//   return useQuery(["get-ticket-type", () => {
//     return TicketService.getTicketType();
//   }])
// }

export const useApproveTicketMutation = () => {
  return useMutation((id) => {
    return TicketService.approveTicket(id);
  });
};

export const useRejectTicketMutation = () => {
  return useMutation((id) => {
    return TicketService.rejectTicket(id);
  });
};
export const useDeleteTicketMutation = () => {
  return useMutation((id) => {
    return TicketService.deleteTicket(id);
  });
};
