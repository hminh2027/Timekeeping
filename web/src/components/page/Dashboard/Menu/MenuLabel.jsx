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
  const color = [];
  const curItem = useSelector(selectCurrentItem);
  const dispatch = useDispatch();
  if (curItem === props.id) {
    color.push("rgb(205, 240, 234)");
  }
  console.log(props.id)
  return (
    <Link href={href}>
      <div
        className="flex items-center py-4 flex-col flex-grow cursor-pointer lg:flex-grow-0 lg:flex-row  lg:gap-4 lg:text-lg lg:p-4 hover:bg-gray-100 active:bg-primary"
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
