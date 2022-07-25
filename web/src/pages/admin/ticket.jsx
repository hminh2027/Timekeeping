import React from "react";
import { getAuthCredentials } from "@/utils/auth-utils";
import ManageTicket from "@/components/page/admin/ManageTicket";
import AdminLayout from "@/layout/AdminLayout/AdminLayout";
const ManagerTicket = () => {
  return <ManageTicket />;
};
ManagerTicket.layout = AdminLayout;
export default ManagerTicket;
