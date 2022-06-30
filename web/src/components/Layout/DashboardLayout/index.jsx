import {
  BellOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  QrcodeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Image, Menu, Row, Space } from "antd";

const DashboardLayout = (props) => {
  return (
    <Row>
      <Col span={4}>
        <Space direction="vertical" style={{ width: "100%" }} size={40}>
          <Image
            src="/Image/logo.png"
            width="10em"
            alt="Đây là Logo"
            fallback="Đây là Logo"
            preview={false}
          />
          <Space
            style={{ height: "100%", justifyContent: "space-between" }}
            direction="vertical"
            size={{}}
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
                // src="/Image/logo.png"
                preview={false}
                // alt="Đây là Logo"
                style={{ borderRadius: "50%" }}
                width="5em"
                height="5em"
                placeholder={<UserOutlined style={{ fontSize: "5em" }} />}
              />
              <div>Họ và tên</div>
            </Space>
          </Space>
        </Space>
      </Col>
      <Col span={20}>{props.children}</Col>
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
