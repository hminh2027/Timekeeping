import Link from "next/link";
import PropTypes from "prop-types";
<<<<<<< HEAD
import styles from "@/styles/Layout/menu.module.scss";
=======
>>>>>>> 3ed9525df318a9db83041aafe76ccf3165f44041
import {
  selectCurrentItem,
  changeCurrentItem,
} from "../../../../redux/feature/layout/menuSlice";

import { useSelector, useDispatch } from "react-redux";
const MenuLabel = (props) => {
  const id = props.id;
  const href = props.href;
  const label = props.label;
  const icon = props.icon;
  const color = [];
  const curItem = useSelector(selectCurrentItem);
  const dispatch = useDispatch();
  if (curItem === props.id) {
    color.push("rgb(205, 240, 234)");
  }
  return (
    <Link href={href}>
      <div
        className={styles["menu-label"]}
        style={{ backgroundColor: color[0] }}
        onClick={() => {
          dispatch(changeCurrentItem({ menuItem: id }));
        }}
      >
        {icon}
        <div>{label}</div>
      </div>
    </Link>
  );
};
MenuLabel.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
};
export default MenuLabel;
