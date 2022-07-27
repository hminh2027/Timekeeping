import { useQuery, useMutation } from "@tanstack/react-query";
import { TicketService } from "./ticket.service";

import { TicketInfoFormatter } from "@/utils/Formatter/TicketInfo";
import { USER_TICKET } from "@/utils/constants/react-query";

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
export const useGetMyTicketWithSortQuery = (sortOptions) => {
  // console.log(sortOptions);
  return useQuery(
    [USER_TICKET.WITH_SORT, sortOptions],
    () => TicketService.getMyTicketWithSort(sortOptions),
    {
      cacheTime: 0,
      select: (tickets) => tickets.map((ticket) => TicketInfoFormatter(ticket)),
    }
  );
};
export const useGetTicketInfoQuery = (id) => {
  return useQuery(
    [USER_TICKET.TICKET_INFO, id],
    () => {
      return TicketService.getTicketInfo(id);
    },
    {
      select: (data) => TicketInfoFormatter(data),
    }
  );
};

export const useAddTicketMutation = () => {
  return useMutation((ticketInfo) => TicketService.addTicket(ticketInfo));
};
export const useUpdateTicketInfoQuery = () => {
  return useMutation((id, ticketInfo) =>
    TicketService.updateTicketInfo(id, ticketInfo)
  );
};

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
