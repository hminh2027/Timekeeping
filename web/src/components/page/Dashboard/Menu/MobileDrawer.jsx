import { CloseOutlined } from "@ant-design/icons";
import Router from "next/router";
import styles from "@/styles/Layout/Dashboard.module.scss";
import { drawerItems } from "./Menu.config";
import { changeCurrentItem } from "@/redux/feature/layout/menuSlice.js";

import { useDispatch } from "react-redux";

import { logOut } from "@/api/service/auth.service";

const MobileDrawer = (props) => {
  const dispatch = useDispatch();
  const visible = props.visible;
  return (
    <div
      className={`${styles[`mobile-drawer`]} ${
        visible ? styles["show-me"] : styles.hidden
      }`}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        fontWeight: "bold",
        top: 0,
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "right" }}>
        <CloseOutlined
          style={{ fontSize: "1.5em", padding: "0.5em", cursor: "pointer" }}
          onClick={() => props.onClose()}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "1em",
        }}
        className={styles.label}
      >
        {drawerItems.map((drawerItem) => (
          <div
            key={drawerItem.label}
            onClick={async () => {
              if (drawerItem.id === "logout") {
                await logOut();
              }
              Router.push(drawerItem.value);
              props.onClose();
              dispatch(changeCurrentItem({ menuItem: drawerItem.id }));
            }}
          >
            {drawerItem.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDrawer;
const drawerItems = [
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
