import {
  BellOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  QrcodeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Image, Menu, Row, Space, Typography } from "antd";

import styles from "../../../styles/Layout/Dashboard.module.scss";
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
            <Menu items={menuItems} style={{ width: "100%" }} />
            <Space
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
            </Space>
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
      <Space style={{ fontSize: "1.25em" }}>
        <HomeOutlined style={{ fontSize: "1.25em" }} />
        <div>Home</div>
      </Space>
    ),
    value: "home",
  },
  {
    label: (
      <Space style={{ fontSize: "1.25em" }}>
        <QrcodeOutlined style={{ fontSize: "1.25em" }} />
        <div>Check In</div>
      </Space>
    ),
    value: "check-in",
  },
  {
    label: (
      <Space style={{ fontSize: "1.25em" }}>
        <ClockCircleOutlined style={{ fontSize: "1.25em" }} />
        <div>Time Request</div>
      </Space>
    ),
    value: "time-request",
  },
  {
    label: (
      <Space style={{ fontSize: "1.25em" }}>
        <ClockCircleOutlined style={{ fontSize: "1.25em" }} />
        <div>Time Approve</div>
      </Space>
    ),
    value: "time-apporve",
  },
  {
    label: (
      <Space style={{ fontSize: "1.25em" }}>
        <ClockCircleOutlined style={{ fontSize: "1.25em" }} />
        <div>Time Report</div>
      </Space>
    ),
    value: "time-report",
  },
  {
    label: (
      <Space style={{ fontSize: "1.25em" }}>
        <BellOutlined style={{ fontSize: "1.25em" }} />
        <div>Notification</div>
      </Space>
    ),
    value: "notification",
  },
];
