import {
  BellOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { Col, Image, Row, Space, Typography } from "antd";
import styles from "../../../styles/Layout/Dashboard.module.scss";
import SiteMenu from "../../page/Dashboard/Menu";
const { Title, Text } = Typography;
const DashboardLayout = (props) => {
  return (
    <Row className={styles[`dashboard-container`]}>
      <Col
        span={24}
        // style={{ backgroundColor: "rgba(151, 163, 228)" }}
        className={styles.header}
      >
        <Space>
          <Image
            src="/Image/logo.png"
            width="10em"
            alt="Đây là Logo"
            fallback="Đây là Logo"
            preview={false}
            style={{ margin: "1.5em 0.5em" }}
          />
          <div style={{ flexGrow: 1 }}>
            <Title style={{ margin: 0 }}>Hello David</Title>
            <Text type="secondary">Welcome back!</Text>
          </div>
        </Space>
      </Col>
      <Col span={4} style={{ borderRight: "1px solid rgb(22 0, 22  0, 22 0)" }}>
        <div
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            width: "100%",
            gap: "40px",
          }}
        >
          <Space
            style={{ height: "100%", justifyContent: "space-between" }}
            direction="vertical"
            size={50}
          >
            <SiteMenu />
            {/* <Space
              direction="vertical"
              style={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                preview={false}
                style={{ borderRadius: "50%" }}
                width="5em"
                height="5em"
                placeholder={<UserOutlined style={{ fontSize: "5em" }} />}
              />
              <div>Họ và tên</div>
            </Space> */}
          </Space>
        </div>
      </Col>
      <Col span={20} style={{ backgroundColor: "rgb(240, 240, 240)" }}>
        {props.children}
      </Col>
    </Row>
  );
};

export default DashboardLayout;

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
