import { TicketList } from "./TicketList";
import { Col, Row } from "antd";
import { DesktopFilter, MobileFilter } from "../Ticket/Filters";
const ApproveTicket = () => {
  // const [filterOptions, setFilterOptions] = useState([]);
  return (
    // <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em 2em 1em 1em",
            backgroundColor: "rgb(255,255,255)",
            width: "100%",
          }}
        >
          <div style={{ fontSize: "2em", fontWeight: "bolder" }}>
            Manage Ticket
          </div>
        </div>
        {/* </div>
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
            <TicketList/>
          </div>
        </Col> */}

        <TicketList/>
      </div>
  );
};

export default ApproveTicket;
