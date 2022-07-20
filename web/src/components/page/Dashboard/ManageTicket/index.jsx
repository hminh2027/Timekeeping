// import Modal from "@/components/Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets, selectTickets } from "@/redux/feature/admin/tickets";
import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import { TicketList } from "./TicketList";
import { DesktopFilter, MobileFilter } from "./Filter";
const ApproveTicket = () => {
  const { isShowing, toggle } = UseModal();
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
    sortType: true,
  });
  useEffect(() => {
    const sortOptions = `limit=10&page=1&textSearch=${filterOptions.title}&ticketType=${filterOptions.type}&ticketStatus=${filterOptions.status}&sortField=${sortOption.sortField}&sortType=${sortOption.sortType}`;
    console.log("SORT:", sortOptions);
    const fetchTicketData = async () => {
      dispatch(fetchTickets(sortOptions));
    };
    fetchTicketData();
  }, [sortOption, filterOptions]);
  // Gọi api khi filter option thay đổi

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
            tickets={tickets}
            onSort={(option) => setSortOption(option)}
            sortOption={sortOption}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveTicket;
