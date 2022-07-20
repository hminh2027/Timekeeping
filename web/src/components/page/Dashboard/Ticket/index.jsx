// import Modal from "@/components/Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMyTickets,
  cancelTicket,
  setTickets,
  selectTickets,
} from "@/redux/feature/ticket/ticketSlice";

import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import SubmitTicket from "./Submit";
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
    const sortOptions = `limit=10&page=1&textSearch=${filterOptions.title}&ticketType=${filterOptions.type}&ticketStatus=${filterOptions.status}&sortField=${sortOption.sortBy}&sortType=${sortOption.orderBy}`;
    console.log("SORT:", sortOptions);
    const fetchTicketData = async () => {
      dispatch(fetchMyTickets(sortOptions));
    };
    fetchTicketData();
  }, [sortOption, filterOptions]);
  // Gọi api khi filter option thay đổi

  return (
    <>
      <Row>
        <Header toggleModal={toggle} />
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

        <Modal isShowing={isShowing} hide={toggle}>
          <SubmitTicket hide={toggle} />
        </Modal>
      </Row>
    </>
  );
};

export default TicketContent;
