const Header = (props) => {
  return (
    <div className="flex max-h-[56px] w-full items-center justify-between bg-white px-4 py-4">
      <div style={{ fontSize: "2em", fontWeight: "bolder" }}>Tickets</div>
      <button className="v-btn-secondary" onClick={props.toggleModal}>
        Create Ticket
      </button>
    </div>
  );
};

export default Header;
