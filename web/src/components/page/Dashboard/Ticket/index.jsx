import UseModal from "@/utils/hooks/UseModal";
import { TICKET_FILTER } from "@/utils/constants/ticket_constants";
import React, { useState, useEffect, useMemo } from "react";
import SubmitTicket from "./Submit";
import Modal from "@/components/Common/Modal";
import Header from "./TicketHeader";
import { TicketList } from "./TicketList";
import { DesktopFilter, MobileFilter } from "./Filters";
import {
  useGetMeTicketQuery,
  useGetMyTicketWithSortQuery,
} from "src/rest/ticket/ticket.query";
import { useQueryClient } from "@tanstack/react-query";
import { USER_TICKET } from "@/utils/constants/react-query";

const TicketContent = () => {
  const { isShowing, toggle } = UseModal();
  const [filterOptions, setFilterOptions] = useState({
    title: "",
    type: "",
    status: "",
  });
  const [sortOption, setSortOption] = useState({
    sortBy: "createdAt",
    orderBy: true,
  });

  const queryClient = useQueryClient();

  const sortOptions = {
    [TICKET_FILTER.limit]: 10,
    [TICKET_FILTER.page]: 1,
    [TICKET_FILTER.title]: filterOptions.title,
    [TICKET_FILTER.status]: filterOptions.status,
    [TICKET_FILTER.type]: filterOptions.type,
    [TICKET_FILTER.field]: sortOption.sortBy,
    [TICKET_FILTER.orderBy]: sortOption.orderBy,
  };
  const { data: ticketsWithSort } = useGetMyTicketWithSortQuery(sortOptions);
  console.log(ticketsWithSort);
  return (
    <div className="flex-1 flex-col gap-8">
      <div
        className="m-1 flex flex-col overflow-auto rounded-lg "
        style={{
          backgroundColor: "#fff",
          boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
        }}
      >
        <Header toggleModal={toggle} />
        <DesktopFilter
          onSubmit={(filterOptions) => {
            setFilterOptions(filterOptions);
            queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
          }}
          className="hidden lg:flex"
        />
        <MobileFilter
          onSubmit={(filterOptions) => {
            setFilterOptions(filterOptions);
            queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
          }}
          className="lg:hidden"
        />

        <TicketList
          tickets={ticketsWithSort}
          onSort={(option) => setSortOption(option)}
          sortOption={sortOption}
        />
      </div>

      <Modal isShowing={isShowing} hide={toggle} closeButton={true}>
        <SubmitTicket hide={toggle} />
      </Modal>
    </div>
  );
};

export default TicketContent;
