import Link from "next/link";
import PropTypes from "prop-types";
import styles from "../../../../styles/Layout/menu.module.scss";
import {
  selectCurrentItem,
  changeCurrentItem,
} from "../../../../redux/feature/layout/menuSlice";
import { useSelector, useDispatch } from "react-redux";
const MenuLabel = (props) => {
  const color = [];
  const curItem = useSelector(selectCurrentItem);
  const dispatch = useDispatch();
  if (curItem === props.id) {
    color.push("rgb(205, 240, 234)");
  }
  return (
    <Link href={props.href}>
      <div
        className={styles["menu-label"]}
        style={{ backgroundColor: color[0] }}
        onClick={() => dispatch(changeCurrentItem({ menuItem: props.id }))}
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
};
export default MenuLabel;