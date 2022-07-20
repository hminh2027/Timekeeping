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
    sortBy: "createdAt",
    orderBy: true,
  });
  useEffect(() => {
    const sortOptions = `limit=10&page=1&textSearch=${filterOptions.title}&ticketType=${filterOptions.type}&ticketStatus=${filterOptions.status}&sortBy=${sortOption.sortBy}&orderBy=${sortOption.orderBy}`;
    console.log("SORT:", sortOptions);
    const fetchTicketData = async () => {
      dispatch(fetchTickets(sortOptions));
    };
    fetchTicketData();
  }, [sortOption, filterOptions]);
  // Gọi api khi filter option thay đổi

  return (
    <>
      <Row>
        <div className="flex justify-between items-center bg-white w-full px-4 py-6">
          <div className="text-3xl font-bold">Manage Ticket</div>
        </div>
        <Col span={24}>
          <div
            className="flex flex-col overflow-auto rounded-lg m-1"
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
        </Col>
      </Row>
    </>
  );
};

export default ApproveTicket;
