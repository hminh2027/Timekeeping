import cardStyles from "../../styles/Common/Card.module.scss";
const Card = (props) => {
  const { children, className = " ", style } = props;
  // ${className}
  const thisClassName = cardStyles.card + " " + className;
  // console.log(thisClassName);
  return (
    <div className={thisClassName} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
