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
      <button className="v-btn-secondary" onClick={props.toggleModal}>
        Create Ticket
      </button>
    </div>
  );
};

export default Header;
