import UseModal from "@/utils/hooks/UseModal";
import { TICKET_FILTER } from "@/utils/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMyTickets,
  cancelTicket,
  setTickets,
  selectTickets,
} from "@/redux/feature/ticket/ticketSlice";

import { useState, useEffect } from "react";
import SubmitTicket from "./TicketInfo";
import Modal from "@/components/Common/Modal";
import Header from "./TicketHeader";
import { TicketList } from "./TicketList";
import { DesktopFilter, MobileFilter } from "./Filters";
const TicketContent = () => {
  const { isShowing, toggle } = UseModal();
  const tickets = useSelector(selectTickets);
  const dispatch = useDispatch();

  const [filterOptions, setFilterOptions] = useState({
    title: "",
    type: "",
    status: "pending",
  });
  const [sortOption, setSortOption] = useState({
    sortBy: "createdAt",
    orderBy: true,
  });
  console.log(sortOption);
  useEffect(() => {
    const sortOptions = `${TICKET_FILTER.limit}=10&${TICKET_FILTER.page}=1&${TICKET_FILTER.title}=${filterOptions.title}&${TICKET_FILTER.type}=${filterOptions.type}&ticketStatus=${filterOptions.status}&${TICKET_FILTER.field}=${sortOption.sortBy}&${TICKET_FILTER.orderBy}=${sortOption.orderBy}`;
    const fetchTicketData = async () => {
      dispatch(fetchMyTickets(sortOptions));
    };
    fetchTicketData();
  }, [sortOption, filterOptions]);

  // Gọi api khi filter option thay đổi
  return (
    <div className="flex-1 flex-col gap-8">
      <Header toggleModal={toggle} />

      <div
        className="flex flex-col m-1 overflow-auto rounded-lg"
        style={{
          backgroundColor: "#fff",
          boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
        }}
      >
        <DesktopFilter
          onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
          className="hidden lg:flex"
        />
        <MobileFilter
          onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
          className="lg:hidden"
        />

        <TicketList
          tickets={tickets}
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
