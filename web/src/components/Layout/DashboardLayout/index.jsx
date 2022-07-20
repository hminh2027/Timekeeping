import auth from "@/api/auth";
import Loading from "@/components/Common/Loading";
import { SidebarMenu } from "@/components/page/Dashboard/Menu";
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

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Header */}
      <Header />
      {/* Sidebar Menu */}
      <div className="flex flex-row flex-1">
        <SidebarMenu />
        {/* Content */}
        <div className="flex flex-1">{props.children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
const exitIcon = "⛔";
