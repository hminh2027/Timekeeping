import React, { useState } from "react";
import { FaLock, FaBell } from "react-icons/fa";
import { BsShieldFill } from "react-icons/bs";
import DashboardLayout from "@/layout/DashboardLayout";
import UserInfo from "@/components/page/Dashboard/User/Info";
import NotifyPreference from "@/components/page/Dashboard/User/NotifiyPreference";
import ChangePassword from "@/components/page/Dashboard/User/ChangePassword";
import { Tab } from "@headlessui/react";
import Permission from "@/components/page/Dashboard/User/Permission";
const UserDetail = () => {
  const [action, setAction] = useState("notification");

  return (
    <div className="flex w-full flex-wrap gap-4">
      <div className="card max-w-sm">
        <div className="card-body">
          <UserInfo />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Tab.Group>
          <Tab.List className="flex gap-4">
            <Tab>
              <div className="flex-4 flex">
                <button
                  onClick={() => setAction("notification")}
                  className={`flex items-baseline justify-center gap-2 rounded-lg  ${
                    action === "notification"
                      ? "bg-indigo-500 text-white"
                      : "text-indigo-900"
                  } p-2  hover:brightness-110`}
                >
                  <FaBell />
                  <span>Notifications</span>
                </button>
              </div>
            </Tab>
            <Tab>
              <div className="flex-4 flex">
                <button
                  onClick={() => setAction("changePass")}
                  className={`flex items-baseline justify-center gap-2 rounded-lg ${
                    action === "changePass"
                      ? "bg-indigo-500 text-white"
                      : "text-indigo-900"
                  } p-2  hover:brightness-110`}
                >
                  <FaLock />
                  <span>Password</span>
                </button>
              </div>
            </Tab>
            <Tab>
              <div className="flex-4 flex">
                <button
                  onClick={() => setAction("permission")}
                  className={`flex items-baseline justify-center gap-2 rounded-lg ${
                    action === "permission"
                      ? "bg-indigo-500 text-white"
                      : "text-indigo-900"
                  } p-2  hover:brightness-110`}
                >
                  <BsShieldFill />
                  <span>Permissions</span>
                </button>
              </div>
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="card flex-1">
                <div className="card-body">
                  <NotifyPreference />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="card flex-1">
                <div className="card-body">
                  <ChangePassword />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="card flex-1">
                <div className="card-body">
                  <Permission />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
UserDetail.layout = DashboardLayout;
export default UserDetail;
