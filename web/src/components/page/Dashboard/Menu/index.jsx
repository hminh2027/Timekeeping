import styles from "@/styles/Layout/menu.module.scss";
import { menuItems } from "./Menu.config";
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
