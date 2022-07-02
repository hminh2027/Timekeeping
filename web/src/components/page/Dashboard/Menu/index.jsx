import {
  BellOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const SiteMenu = () => {
  return <Menu items={menuItems} style={{ width: "100%" }} />;
};

export default SiteMenu;
const menuItems = [
  {
    label: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1em",
          // margin: "1em 0",
          fontSize: "1.25em",
        }}
      >
        <HomeOutlined style={{ fontSize: "1.25em" }} />
        <div>Home</div>
      </div>
    ),
    value: "home",
  },
  {
    label: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1em",
          // margin: "1em 0",
          fontSize: "1.25em",
        }}
      >
        <QrcodeOutlined style={{ fontSize: "1.25em" }} />
        <div>Check In</div>
      </div>
    ),
    value: "check-in",
  },
  {
    label: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1em",
          // margin: "1em 0",
          fontSize: "1.25em",
        }}
      >
        <ClockCircleOutlined style={{ fontSize: "1.25em" }} />
        <div>Time Request</div>
      </div>
    ),
    value: "time-request",
  },
  {
    label: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1em",
          // margin: "1em 0",
          fontSize: "1.25em",
        }}
      >
        <ClockCircleOutlined style={{ fontSize: "1.25em" }} />
        <div>Time Approve</div>
      </div>
    ),
    value: "time-apporve",
  },
  {
    label: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1em",
          // margin: "1em 0",
          fontSize: "1.25em",
        }}
      >
        <ClockCircleOutlined style={{ fontSize: "1.25em" }} />
        <div>Time Report</div>
      </div>
    ),
    value: "time-report",
  },
  {
    label: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1em",
          // margin: "1em 0",
          fontSize: "1.25em",
        }}
      >
        <BellOutlined style={{ fontSize: "1.25em" }} />
        <div>Notification</div>
      </div>
    ),
    value: "notification",
  },
];
