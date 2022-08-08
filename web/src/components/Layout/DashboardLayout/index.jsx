import auth from "@/api/auth";
import Loading from "@/components/Common/Loading";
import { MobileMenu, SidebarMenu } from "@/components/page/Dashboard/Menu";
import MobileDrawer from "@/components/page/Dashboard/Menu/MobileDrawer";
import {
  fetchCheckInStatus,
  selectUserCheckInStatus,
  setUserInfo,
  setUserPermissions,
} from "@/redux/feature/user/userSlice";
import { ROLES } from "@/utils/constants/roles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import { menuItems } from "@/components/page/Dashboard/Menu/Menu.config";
import { ToastContainer } from "react-toastify";
import UseChatSocket from "@/utils/hooks/UseChatSocket";
import { useGetMeQuery } from "@/rest/auth/auth.query";
const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkInStatus = useSelector(selectUserCheckInStatus);
  const { data: userInfo } = useGetMeQuery();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);

  UseChatSocket();
  useEffect(() => {
    const checkAuthStatus = () => {
      const authed = auth.checkAuth();
      // console.log("Auth:", authed);
      if (!authed) {
        router.push("/account/login");
      } else {
        setLoading(false);
      }
    };
    const getUserInfo = () => {
      if (userInfo) {
        dispatch(setUserInfo({ userInfo: userInfo }));
        ROLES.forEach((ROLE) => {
          if (ROLE.name === userInfo.role) {
            dispatch(setUserPermissions(ROLE.permissions));
          }
        });
      }
    };
    const getCheckInStatus = () => {
      if (checkInStatus === false) {
        const res = dispatch(fetchCheckInStatus());
        // if (res.data) dispatch(changeCheckInStatus({ checked_status: true }));
      }
    };
    checkAuthStatus();
    getUserInfo();
    getCheckInStatus();
  }, [userInfo]);

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />
      {/* Sidebar Menu */}
      <div className="z-10 flex flex-1 ">
        <SidebarMenu menuItems={menuItems} />
        {/* Content */}
        <div className="w-full bg-[#fafafa] lg:flex lg:flex-1">{children}</div>
      </div>
      <div>
        <MobileDrawer
          visible={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
        <MobileMenu />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
