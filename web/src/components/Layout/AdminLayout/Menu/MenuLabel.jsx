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
  // console.log(props.id);
  return (
    <Link href={href}>
      <div
        className="flex flex-grow cursor-pointer flex-col items-center justify-center rounded-md border-b-2 border-b-[#ace5e5] p-4 hover:bg-gray-200 active:bg-primary lg:flex-grow-0 lg:flex-row lg:justify-start lg:gap-4 lg:p-4 lg:text-lg"
        style={{ backgroundColor: color[0] }}
        onClick={() => {
          dispatch(changeCurrentItem({ menuItem: id }));
        }}
      >
        {icon}
        <div className="hidden lg:flex">{label}</div>
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
