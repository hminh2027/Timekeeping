const Form = (props) => {
  return (
    <form
      style={{
        minHeight: "30rem",
        maxWidth: "600px",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="flex flex-col items-center justify-center rounded-md p-12"
    >
      <div className="mb-8 text-5xl font-bold">{props.title}</div>
      {props.children}
    </form>
  );
};

export default Form;
