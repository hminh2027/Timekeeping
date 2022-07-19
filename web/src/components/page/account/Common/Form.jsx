const Form = (props) => {
  return (
    <form
      style={{
        minHeight: "30rem",
        maxWidth: "600px",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="flex flex-col items-center justify-center p-12 rounded-md"
    >
      <div className="text-5xl font-bold mb-8">{props.title}</div>
      {props.children}
    </form>
  );
};

export default Form;
