import auth from "@/api/auth";
import Loading from "@/components/Common/Loading";
import MobileDrawer from "@/components/page/Dashboard/Menu/MobileDrawer";

import {
  changeCheckInStatus,
  fetchCheckInStatus,
  fetchMe,
  selectUserCheckInStatus,
  selectUserInfo,
} from "@/redux/feature/user/userSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import { adminMenuItems } from "@/components/page/Dashboard/Menu/Menu.config";
import { SidebarMenu } from "@/components/page/Dashboard/Menu";
import UseChatSocket from "@/utils/hooks/UseChatSocket";

const Index = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const userInfo = useSelector(selectUserInfo);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  UseChatSocket();
  useEffect(() => {
    const checkAuthStatus = () => {
      const authed = auth.checkAuth();
      console.log("userInfo", userInfo);
      // console.log("Auth:", authed);
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

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen w-screen flex-col">
      {/* Header */}
      <Header />
      {/* Sidebar Menu */}
      <div className="z-10 flex flex-1 ">
        <SidebarMenu menuItems={adminMenuItems} />
        {/* Content */}
        <div className="w-full bg-[#fafafa] lg:flex lg:flex-1">
          {props.children}
        </div>
      </div>
      <div>
        {/* <MobileDrawer
          visible={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
        <MobileMenu /> */}
      </div>
    </div>
  );
};

export default Index;
