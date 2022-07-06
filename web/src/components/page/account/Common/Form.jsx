import style from "../../../../styles/pages/account/form.module.scss";
const Form = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        minHeight: "30rem",
        maxWidth: "600px",
        width: "100%",

        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",

        borderRadius: "6px",
        padding: "3rem",
      }}
      className={style[`form`]}
    >
      <div className={style.title}>{props.title}</div>
      {props.children}
    </div>
  );
};

export default Form;
