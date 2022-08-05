import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import DashboardLayout from "@/layout/DashboardLayout";
import UserInfo from "@/components/page/Dashboard/User/Info";
import NotifiyPreference from "@/components/page/Dashboard/User/NotifiyPreference";
import ChangePassword from "@/components/page/Dashboard/User/ChangePassword";
import RBACWrapper from "@/components/RBACWrapper";
import {
  CHECK_IN_PERMISSION,
  REPORT_PERMISSION,
  TICKET_PERMISSION,
} from "@/utils/constants/permission";
const UserDetail = () => {
  const [action, setAction] = useState("edit");
  let tab;
  switch (action) {
    case "edit":
      tab = <UserInfo />;
      break;

    default:
      break;
  }
  const content = (
    <div className="card">
      <div className="card-body p-4">
        {/* Header */}
        <div className="flex-4 flex">
          <button
            onClick={() => setAction("edit")}
            className="flex items-baseline justify-center gap-2 rounded-lg bg-indigo-500 p-2 text-white hover:brightness-110"
          >
            <FaUser />
            <span>Account</span>
          </button>
        </div>
        {/* Edit */}
        {tab}
      </div>
    </div>
  );
  return (
    <div className="card w-full">
      <div className="card-body">
        <UserInfo />
        <RBACWrapper
          requiredPermissions={[
            TICKET_PERMISSION.READ,
            TICKET_PERMISSION.WRITE,
            // REPORT_PERMISSION.READ,
            // CHECK_IN_PERMISSION.READ,
          ]}
        >
          <NotifiyPreference />
        </RBACWrapper>
        <ChangePassword />
      </div>
    </div>
  );
};
UserDetail.layout = DashboardLayout;
export default UserDetail;
