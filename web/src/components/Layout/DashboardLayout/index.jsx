import {
  BellOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../api/auth";
import {
  changeCheckInStatus,
  fetchCheckInStatus,
  selectUserCheckInStatus,
  selectUserInfo,
} from "../../../redux/feature/user/userSlice";
import styles from "../../../styles/Layout/Dashboard.module.scss";
import { MobileMenu, SidebarMenu } from "../../page/Dashboard/Menu";

const { Title, Text } = Typography;
const DashboardLayout = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    const checkAuthStatus = async () => {
      const authed = await auth.checkAuth();
      if (!authed) {
        router.push("/account/login");
      }
    };
    const getCheckInStatus = async () => {
      if (checkInStatus === false) {
        const res = dispatch(fetchCheckInStatus());
        if (res.data) dispatch(changeCheckInStatus({ checked_status: true }));
      }
    };
    checkAuthStatus();

    getCheckInStatus();
  }, [checkInStatus, dispatch]);
  console.log("UserInfo:", userInfo);
  const userFullName = userInfo.firstName + " " + userInfo.lastName;
  return (
    <Row className={styles[`dashboard-container`]}>
      {/* Header */}
      <Col
        span={24}
        // style={{ backgroundColor: "rgba(151, 163, 228)" }}
        className={styles.header}
      >
        <Space>
          <div style={{ width: "10em", display: "flex", alignItems: "center" }}>
            <Image
              src="/Image/logo.png"
              width="200"
              height="100"
              layout="intrinsic"
              alt="Đây là Logo"
              fallback="Đây là Logo"
            />
          </div>

          <div style={{ flexGrow: 1 }}>
            <Title style={{ margin: 0 }}>Hello {userFullName}</Title>
            <Text type="secondary">Welcome back!</Text>
          </div>
        </Space>
      </Col>
      {/* Sidebar Menu */}
      <Col
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={{ span: 0 }}
        lg={{ span: 4 }}
        style={{ borderRight: "1px solid rgb(22 0, 22  0, 22 0)" }}
      >
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
            <SidebarMenu />
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
      {/* Content */}
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 20 }}
        style={{ backgroundColor: "rgb(240, 240, 240)" }}
      >
        {props.children}
      </Col>
      {/* Mobile Menu */}
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 0 }}
        style={{
          // backgroundColor: "rgb(255,0,0)",
          position: "fixed",
          bottom: "0",
          width: "100%",
          borderTop: "1px solid rgb(220,220,220)",
        }}
      >
        <MobileMenu />
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
