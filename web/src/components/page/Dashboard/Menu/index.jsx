import styles from "../../../../styles/Layout/menu.module.scss";
import MenuLabel from "./MenuLabel";
const SidebarMenu = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
          className={styles["menu-label"]}
          id={menuItem.id}
        />
      ))}
    </div>
  );
};
const MobileMenu = () => {
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
          id={menuItem.id}
        />
      ))}
    </div>
  );
};
export { SidebarMenu, MobileMenu };

const menuItems = [
  {
    icon: <div>🏠</div>,
    label: "Home",
    value: "/dashboard/home",
    id: "home",
  },
  {
    icon: <div>📷</div>,
    label: "Check In",
    value: "/dashboard/checkin",
    id: "checkin",
  },

  {
    icon: <div>🕐</div>,
    label: "Time",
    value: "/dashboard/time",
    id: "time",
  },

  {
    icon: <div>🔔</div>,
    label: "Notifications",
    value: "/dashboard/notification",
    id: "notification",
  },
  {
    icon: <div>🎫</div>,
    label: "Tickets",
    value: "/dashboard/ticket",
    id: "ticket",
  },
];
