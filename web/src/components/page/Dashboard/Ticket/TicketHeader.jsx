const Header = (props) => {
  return (
    <div className="flex max-h-[56px] w-full items-center justify-between bg-white px-4 py-10">
      <div style={{ fontSize: "2em", fontWeight: "bolder" }}>Tickets</div>
      <button className="v-btn-primary" onClick={props.toggleModal}>
        Create Ticket
      </button>
    </div>
  );
};

export default Header;
