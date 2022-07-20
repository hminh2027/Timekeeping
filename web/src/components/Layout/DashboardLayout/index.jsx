import { MenuOutlined } from "@ant-design/icons";
import { Col, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "@/api/auth";
import { logOut } from "@/api/service/auth.service";
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
        dispatch(fetchMe());
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
  });

  const MobileHeader = () => {
    return (
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col flex-grow">
          <div className="text-2xl font-bold">Welcome {userInfo.lastName}</div>
          <div>Greeting!</div>
        </div>
        <div className="flex-grow text-right">
          <MenuOutlined
            className="text-3xl"
            onClick={() => setOpenDrawer(true)}
          />
        </div>
      </div>
    );
  };
  const DesktopHeader = () => {
    return (
      <div className="flex items-center w-full h-full ">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-wrap items-center">
            <div className="w-40 flex items-center">
              <Image
                src="/Image/logo.png"
                width="200"
                height="100"
                layout="intrinsic"
                alt="Đây là Logo"
                fallback="Đây là Logo"
              />
            </div>

            <div className="flex-grow">
              <div className="font-semibold text-5xl" style={{ margin: 0 }}>
                Hello {userInfo.lastName} {userInfo.firstName}
              </div>
              <div className="text-gray-500 ">Welcome back!</div>
            </div>
          </div>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={async () => await logOut()}
          >
            <div className="font-bold">Logout</div>
            <div className="text-4xl">{exitIcon}</div>
          </div>
        </div>
      </div>
    );
  };
  const content = (
    <div className="h-screen flex flex-row flex-wrap">
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
    </div>
  );

  return loading ? <>Loading...</> : content;
};

export default DashboardLayout;
const exitIcon = "⛔";
