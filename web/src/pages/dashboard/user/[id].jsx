import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import DashboardLayout from "@/layout/DashboardLayout";
import UserInfo from "@/components/page/Dashboard/User/Info";
import NotifiyPreference from "@/components/page/Dashboard/User/NotifiyPreference";
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
    <div className="w-full">
      {content}
      <NotifiyPreference />
    </div>
  );
};
UserDetail.layout = DashboardLayout;
export default UserDetail;
