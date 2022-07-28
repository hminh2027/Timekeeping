// import Modal from "@/components/Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets, selectTickets } from "@/redux/feature/admin/tickets";
import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import { useGetTicketQuery } from "src/rest/ticket/ticket.query";
import { DesktopFilter, MobileFilter } from "./Filter";
import TicketLists from "./TicketList";
const ApproveTicket = () => {
  const tickets = useSelector(selectTickets);
  console.log("Tickets", tickets);
  // const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({
    title: "",
    type: "",
    status: "",
  });
  const [sortOption, setSortOption] = useState({
    sortBy: "createdAt",
    orderBy: false,
  });
  const sortOptions = `limit=10&page=1&search=${filterOptions.title}&ticketType=${filterOptions.type}&ticketStatus=${filterOptions.status}&sortField=${sortOption.sortBy}&sortType=${sortOption.orderBy}`;
  console.log("SORT:", sortOptions);
  const { data: Tickets } = useGetTicketQuery(sortOptions);
  console.log("getTicket", Tickets);
  return (
    <div className="flex-1">
      <div className="flex w-full items-center justify-between bg-white px-4 py-6">
        <div className="text-3xl font-bold">Manage Ticket</div>
      </div>
      <div span={24}>
        <div
          className="m-1 flex flex-col overflow-auto rounded-lg"
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
          {/* <TicketList
            tickets={Tickets}
            onSort={(option) => setSortOption(option)}
            sortOption={sortOption}
          /> */}
          <TicketLists
            tickets={Tickets}
            onSort = {(option) => setSortOption(option)}
            sortOption = {sortOption}
          />
          </div>
      </div>
    </div>
  );
};

export default ApproveTicket;
