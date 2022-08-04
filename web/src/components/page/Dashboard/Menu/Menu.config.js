import { AiOutlineHome, AiOutlineClockCircle } from "react-icons/ai";
import { BsCamera } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineTicket } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
export const menuItems = [
  {
    icon: <AiOutlineHome size={"30px"} />,
    label: "Home",
    value: "/dashboard/",
    id: "home",
  },

  {
    icon: <AiOutlineClockCircle size={"30px"} />,
    label: "Time",
    value: "/dashboard/time",
    id: "time",
  },

  {
    icon: <IoMdNotificationsOutline size={"30px"} />,
    label: "Events",
    value: "/dashboard/event",
    id: "event",
  },
  {
    icon: <HiOutlineTicket size={"30px"} />,
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
    label: "Time",
    value: "/dashboard/time",
    id: "time",
  },

  {
    label: "Events",
    value: "/dashboard/event",
    id: "event",
  },
  {
    label: "Log Out",
    value: "/dashboard/logout",
    id: "logout",
  },
];

export const adminMenuItems = [
  {
    icon: <AiOutlineHome size={"30px"} />,
    label: "Home",
    value: "/admin",
    id: "home",
  },
  {
    icon: <IoMdNotificationsOutline size={"30px"} />,
    label: "Events",
    value: "/admin/event",
    id: "event",
  },
  {
    icon: <FiUsers size={"30px"} />,
    label: "Users",
    value: "/admin/users",
    id: "Users",
  },

  {
    icon: <HiOutlineTicket size={"30px"} />,
    label: "Tickets",
    value: "/admin/ticket",
    id: "Ticket",
  },
];
