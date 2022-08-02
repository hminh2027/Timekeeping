import {AiOutlineHome, AiOutlineClockCircle} from "react-icons/ai";
import {BsCamera} from "react-icons/bs";
import {IoMdNotificationsOutline} from "react-icons/io";
import {HiOutlineTicket} from "react-icons/hi";
export const menuItems = [
  {
    icon: <AiOutlineHome size={"30px"}/>,
    label: "Home",
    value: "/dashboard/",
    id: "home",
  },
  {
    icon: <BsCamera size={"30px"}/>,
    label: "Check In",
    value: "/dashboard/checkin",
    id: "checkin",
  },

  {
    icon: <AiOutlineClockCircle size={"30px"}/>,
    label: "Time",
    value: "/dashboard/time",
    id: "time",
  },

  {
    icon: <IoMdNotificationsOutline size={"30px"}/>,
    label: "Notifications",
    value: "/dashboard/notification",
    id: "notification",
  },
  {
    icon: <HiOutlineTicket size={"30px"}/>,
    label: "My Tickets",
    value: "/dashboard/ticket",
    id: "ticket",
  },
];

export const drawerItems = [
  {
    label: "Home",
    value: "/dashboard/home",
    id: "home",
  },
  {
    label: "Check In",
    value: "/dashboard/checkin",
    id: "checkin",
  },

  {
    label: "Time",
    value: "/dashboard/time",
    id: "time",
  },

  {
    label: "Notifications",
    value: "/dashboard/notification",
    id: "notification",
  },
  {
    label: "Log Out",
    value: "/dashboard/logout",
    id: "logout",
  },
];
