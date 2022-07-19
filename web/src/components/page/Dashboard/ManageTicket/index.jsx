import { TicketList } from "./TicketList";
// import { Col, Row } from "antd";
// import { DesktopFilter, MobileFilter } from "../Ticket/Filters";
const ApproveTicket = () => {
  // const [filterOptions, setFilterOptions] = useState([]);
  return (
      <div>
        <div
          className="flex justify-between items-center bg-white w-full px-4 py-4"
        >
          <div className="text-3xl font-bold">
            Manage Ticket
          </div>
        </div>
        <TicketList/>
      </div>
  );
};

export default ApproveTicket;
