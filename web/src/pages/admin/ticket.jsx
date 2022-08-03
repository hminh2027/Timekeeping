import React from "react";
import { getAuthCredentials } from "@/utils/auth-utils";
import ManageTicket from "@/components/page/admin/ManageTicket";
import Index from "@/layout/AdminLayout";
const ManagerTicket = () => {
  return <ManageTicket />;
};
ManagerTicket.layout = Index;
export default ManagerTicket;
