import { Button } from "antd";
const Header = (props) => {
  return (
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
      <div style={{ fontSize: "2em", fontWeight: "bolder" }}>Tickets</div>
      <Button onClick={props.toggleModal}>Create Ticket</Button>
    </div>
  );
};

export default Header;
