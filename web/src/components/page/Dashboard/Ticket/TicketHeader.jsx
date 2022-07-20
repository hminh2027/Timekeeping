const Header = (props) => {
  return (
    <div
          className="flex justify-between items-center bg-white w-full px-4 py-4 max-h-[56px]"
    >
      <div style={{ fontSize: "2em", fontWeight: "bolder" }}>Tickets</div>
      <button className="v-btn-secondary" onClick={props.toggleModal}>
        Create Ticket
      </button>
    </div>
  );
};

export default Header;
