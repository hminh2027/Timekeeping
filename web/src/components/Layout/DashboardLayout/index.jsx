import { MenuOutlined } from "@ant-design/icons";
import { Col, Row, Space, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "@/api/auth";
import {
  changeCheckInStatus,
  fetchCheckInStatus,
  fetchMe,
  selectUserCheckInStatus,
  selectUserInfo,
} from "@/redux/feature/user/userSlice";
import styles from "@/styles/Layout/Dashboard.module.scss";
import { MobileMenu, SidebarMenu } from "@/components/page/Dashboard/Menu";
import MobileDrawer from "@/components/page/Dashboard/Menu/MobileDrawer";

// MobileMenu,
const { Title, Text } = Typography;
const DashboardLayout = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const userInfo = useSelector(selectUserInfo);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuthStatus = () => {
      const authed = auth.checkAuth();
      console.log("Auth:", authed);
      if (!authed) {
        router.push("/account/login");
      } else {
        setLoading(false);
      }
    };
    const getUserInfo = () => {
      if (Object.keys(userInfo).length === 0) {
        const res = dispatch(fetchMe());
      }
    };
    const getCheckInStatus = () => {
      if (checkInStatus === false) {
        const res = dispatch(fetchCheckInStatus());
        if (res.data) dispatch(changeCheckInStatus({ checked_status: true }));
      }
    };
    checkAuthStatus();
    getUserInfo();
    getCheckInStatus();
  }, []);

  const MobileHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5em 1em",
          // backgroundColor: "rgb(205, 240, 234)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
            Welcome {userInfo.lastName}
          </div>
          <div>Greeting!</div>
        </div>
        <div style={{ flexGrow: 1, textAlign: "right" }}>
          <MenuOutlined
            style={{ fontSize: "2em" }}
            onClick={() => setOpenDrawer(true)}
          />
        </div>
      </div>
    );
  };
  const DesktopHeader = () => {
    return (
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Space wrap>
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
            <Title style={{ margin: 0 }}>Hello {userInfo.lastName}</Title>
            <Text type="secondary">Welcome back!</Text>
          </div>
        </Space>
      </Space>
    );
  };
  const content = (
    <Row className={styles[`dashboard-container`]}>
      {/* Header */}
      <Col
        xs={0}
        sm={0}
        md={0}
        lg={24}
        xl={24}
        xxl={24}
        className={styles.header}
      >
        <DesktopHeader />
      </Col>

      <Col
        xs={24}
        sm={24}
        md={24}
        lg={0}
        xl={0}
        xxl={0}
        className={styles.header}
      >
        <MobileHeader />
      </Col>
      {/* Sidebar Menu */}
      <Col
        xs={{ span: 0 }}
        sm={{ span: 0 }}
        md={{ span: 0 }}
        lg={{ span: 4 }}
        style={{ borderRight: "5px solid rgb(220, 220, 220)" }}
      >
        <div className="flex flex-col flex-nowrap w-full gap-10">
          <Space
            className="h-full justify-between"
            direction="vertical"
            size={50}
          >
            <SidebarMenu />
          </Space>
        </div>
      </Col>
      {/* Content */}
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 20 }}
        xl={{ span: 20 }}
        style={{
          backgroundColor: "rgb(240, 240, 240)",
          minHeight: "80vh",
        }}
        className="overflow-hidden"
      >
        {props.children}
      </Col>
      {/*Mobile Menu */}
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 0 }}
        className="z-50 border-t border-t-gray-200 w-full bg-white fixed bottom-0"
      >
        <MobileDrawer
          visible={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
        <MobileMenu />
      </Col>
    </Row>
  );

  return loading ? <>Loading...</> : content;
};

export default DashboardLayout;
