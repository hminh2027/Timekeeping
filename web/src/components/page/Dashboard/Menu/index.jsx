import {
  BellOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import styles from "../../../../styles/pages/dashboard/menu.module.scss";
import MenuLabel from "./MenuLabel";
export const SidebarMenu = () => {
  return (
    <div
      style={{
        display: "flex",
        // gap: "1em",
        flexDirection: "column",
        // justifyContent: "space-evenly",
        // alignItems: "center",
        fontSize: "0.75em",
        width: "100%",
      }}
      className={styles["sidebar-menu"]}
    >
      {menuItems.map((menuItem) => (
        <MenuLabel
          key={menuItem.value}
          href={menuItem.value}
          icon={menuItem.icon}
          label={menuItem.label}
          direction="row"
        />
      ))}
    </div>
  );
};
export const MobileMenu = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "1em",
        justifyContent: "space-evenly",
        alignItems: "center",
        fontSize: "0.75em",
        width: "100%",
      }}
    >
      {menuItems.map((menuItem) => (
        <MenuLabel
          key={menuItem.value}
          href={menuItem.value}
          icon={menuItem.icon}
          label={menuItem.label}
          direction="column"
        />
      ))}
    </div>
  );
};
const menuItems = [
  {
    icon: <HomeOutlined style={{ fontSize: "1.25em" }} />,
    label: "Home",
    value: "/dashboard/home",
  },
  {
    icon: <QrcodeOutlined style={{ fontSize: "1.25em" }} />,
    label: "Check In",
    value: "/dashboard/check-in",
  },
  {
    icon: <ClockCircleOutlined style={{ fontSize: "1.25em" }} />,
    label: "Time",
    value: "/dashboard/time",
  },

  {
    icon: <BellOutlined style={{ fontSize: "1.25em" }} />,
    label: "Notifications",
    value: "/dashboard/notification",
  },
];
