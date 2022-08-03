// import Modal from "@/components/Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets, selectTickets } from "@/redux/feature/admin/tickets";
import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import { useGetTicketQuery } from "src/rest/ticket/ticket.query";
import { DesktopFilter, MobileFilter } from "@/components/Common/Table/TableFilter";
import TicketLists from "./TicketList";
import { ALL_TICKET_TYPES, STATUS_TICKET } from "@/utils/constants/ticket_constants";
const ApproveTicket = () => {
  const tickets = useSelector(selectTickets);
  console.log("Tickets", tickets);
  // const dispatch = useDispatch();
  const [filterOptions, setFilterOptions] = useState({
    search: "",
    type: "",
    status: "",
  });
  const [sortOption, setSortOption] = useState({
    sortBy: "createdAt",
    orderBy: false,
  });
  const sortOptions = `limit=10&page=1&search=${filterOptions.search || ""}&ticketType=${filterOptions.type|| ""}&ticketStatus=${filterOptions.status|| ""}&sortField=${sortOption.sortBy}&sortType=${sortOption.orderBy}`;
  console.log("SORT:", sortOptions);
  const { data: Tickets } = useGetTicketQuery(sortOptions);
  console.log("getTicket", Tickets);
  const [ticketTypes, setTicketTypes] = useState(ALL_TICKET_TYPES);
  const [ticketStatus, setTicketStatus] = useState(STATUS_TICKET);
  const dataSort = [
    {
      name: "search",
      type: "input",
      style: "w-full rounded-full bg-transparent py-[10px] pl-4 outline-none",
      value: "",
      data: []
    },
    {
      name: "type",
      type: "select",
      style: "flex flex-row items-center justify-between mr-[-6rem]",
      value: "",
      data: ticketTypes
    },
    {
      name: "status",
      type: "select",
      style: "flex flex-row items-center justify-between",
      value: "",
      data: ticketStatus
    }
  ]
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
            dataSort = {dataSort}
          />
          <MobileFilter
            onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
            className="lg:hidden"
            dataSort = {dataSort}
          />
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
