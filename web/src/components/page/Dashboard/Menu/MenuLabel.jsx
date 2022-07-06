import Link from "next/link";
import PropTypes from "prop-types";
import styles from "../../../../styles/pages/dashboard/menu.module.scss";
const MenuLabel = (props) => {
  const direction = props.direction;
  const gap = direction === "column" ? "0" : "1em";
  return (
    <Link href={props.href}>
      <div
        style={{
          display: "flex",
          flexDirection: direction,
          alignItems: "center",
          gap: gap,
          // margin: "1em 0",
          fontSize: "1.25em",
          padding: "1em",
        }}
        className={styles["menu-label"]}
      >
        {props.icon}
        <div>{props.label}</div>
      </div>
    </Link>
  );
};
MenuLabel.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  href: PropTypes.string,
  direction: PropTypes.string,
};
export default MenuLabel;
