import { TicketList } from "./TicketList";
const ApproveTicket = () => {
  return (
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
      <div style={{ fontSize: "2em", fontWeight: "bolder" }}>Manage Ticket</div>
    </div>
      <TicketList/>
    </div>
    
  );
};

export default ApproveTicket;