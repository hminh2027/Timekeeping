import cardStyles from "../../styles/Common/Card.module.scss";
const Card = ({ children, className, style }) => {
  return (
    <div className={`${cardStyles.card} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
