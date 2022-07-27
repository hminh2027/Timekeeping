const Header = (props) => {
  return (
    <div className="flex justify-between items-center w-full p-8 pt-10 max-h-[56px]">
      <div style={{ fontSize: "2em", fontWeight: "bolder" }}>Tickets</div>
      <button className="v-btn-primary" onClick={props.toggleModal}>
        Create Ticket
      </button>
    </div>
  );
};

export default Header;
