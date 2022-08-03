import Link from "next/link";
import PropTypes from "prop-types";
import {
  selectCurrentItem,
  changeCurrentItem,
} from "@/redux/feature/layout/menuSlice";

import { useSelector, useDispatch } from "react-redux";
const MenuLabel = (props) => {
  const id = props.id;
  const href = props.href;
  const label = props.label;
  const icon = props.icon;
  const isActive = props.isActive;
  const color = [];
  const curItem = useSelector(selectCurrentItem);
  if (curItem === props.id) {
    color.push("rgb(205, 240, 234)");
  }
  return (
    <Link href={href}>
      <div
        className={isActive ? "v-menu-item-active" : "v-menu-item"}
        style={{ backgroundColor: color[0] }}
      >
        <div className="p-4 lg:px-4 lg:py-0">{icon}</div>
        <div className="hidden pr-6 font-bold lg:flex">{label}</div>
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
