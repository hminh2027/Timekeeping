import UseModal from "@/utils/hooks/UseModal";
import { TICKET_FILTER } from "@/utils/constants/ticket_constants";
import { useState, useEffect } from "react";
import SubmitTicket from "./Submit";
import Modal from "@/components/Common/Modal";
import Header from "./TicketHeader";
import { TicketList } from "./TicketList";
import { DesktopFilter, MobileFilter } from "./Filters";
import {
  useGetMeTicketQuery,
  useGetMyTicketWithSortQuery,
} from "src/rest/ticket/ticket.query";

const TicketContent = () => {
  const { isShowing, toggle } = UseModal();

  const [needFetch, setNeedFetch] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    title: "",
    type: "",
    status: "",
  });
  const [sortOption, setSortOption] = useState({
    sortBy: "createdAt",
    orderBy: true,
  });
  const onSuccessTickets = () => setNeedFetch(false);
  const sortOptions = `${TICKET_FILTER.limit}=10&${TICKET_FILTER.page}=1&${TICKET_FILTER.title}=${filterOptions.title}&${TICKET_FILTER.type}=${filterOptions.type}&ticketStatus=${filterOptions.status}&${TICKET_FILTER.field}=${sortOption.sortBy}&${TICKET_FILTER.orderBy}=${sortOption.orderBy}`;
  const { data: ticketsWithSort } = useGetMyTicketWithSortQuery(
    sortOptions,
    onSuccessTickets,
    needFetch
  );
  useEffect(() => {
    setNeedFetch(true);
  }, [sortOption, filterOptions]);
  return (
    <div className="flex-col flex-1 gap-8">
      <div
        className="flex flex-col m-1 overflow-auto rounded-lg "
        style={{
          backgroundColor: "#fff",
          boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
        }}
      >
        <Header toggleModal={toggle} />
        <DesktopFilter
          onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
          className="hidden lg:flex"
        />
        <MobileFilter
          onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
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
