import {AiOutlineHome} from "react-icons/ai";
import {BsCamera} from "react-icons/bs";
import {FiUsers} from "react-icons/fi";
import {HiOutlineTicket} from "react-icons/hi";
import {IoMdNotificationsOutline} from "react-icons/io";
export const menuItems = [
  {
    icon: <AiOutlineHome size={"30px"}/>,
    label: "Home",
    value: "/admin",
    id: "home",
  },
  {
    icon: <BsCamera size={"30px"}/>,
    label: "Check In",
    value: "/admin/checkins",
    id: "checkins",
  },
  {
    icon: <IoMdNotificationsOutline size={"30px"}/>,
    label: "Notifications",
    value: "/admin/notification",
    id: "notification",
  },
  {
    icon: <FiUsers size={"30px"}/>,
    label: "Users",
    value: "/admin/users",
    id: "Users",
  },

  {
    icon: <HiOutlineTicket size={"30px"}/>,
    label: "Tickets",
    value: "/admin/ticket",
    id: "Ticket",
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
