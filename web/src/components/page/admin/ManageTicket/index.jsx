// import Modal from "@/components/Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets, selectTickets } from "@/redux/feature/admin/tickets";
import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import { TicketList } from "./TicketList";
import TableTicket from "./TableTicket";
import { useGetTicketQuery } from "src/rest/ticket/ticket.query";
import { DesktopFilter, MobileFilter } from "./Filter";
const ApproveTicket = () => {
  const tickets = useSelector(selectTickets);
  console.log("Tickets", tickets);
  const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({
    title: "",
    type: "",
    status: "",
  });
  const [sortOption, setSortOption] = useState({
    sortField: "createdAt",
    sortType: false,
  });
  const sortOptions = `limit=10&page=1&search=${filterOptions.title}&ticketType=${filterOptions.type}&ticketStatus=${filterOptions.status}&sortField=${sortOption.sortField}&sortType=${sortOption.sortType}`;
  console.log("SORT:", sortOptions);
  const { data: Tickets } = useGetTicketQuery(sortOptions);
  console.log("getTicket", Tickets);
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between w-full px-4 py-6 bg-white">
        <div className="text-3xl font-bold">Manage Ticket</div>
      </div>
      <div span={24}>
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
            tickets={Tickets}
            onSort={(option) => setSortOption(option)}
            sortOption={sortOption}
          />
          {/* <TableTicket/> */}
        </div>
      </div>
    </div>
  );
};

export default ApproveTicket;
