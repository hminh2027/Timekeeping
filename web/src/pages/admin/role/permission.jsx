import Modal from "@/components/Common/Modal";
import PermissionTable from "@/components/Role/Permissions";
import AddPermissionModal from "@/components/Role/Permissions/AddPermissionModal";
import AdminLayout from "@/layout/AdminLayout";
import UseModal from "@/utils/hooks/UseModal";
import React from "react";

const PermissionManage = () => {
  const { isShowing, toggle } = UseModal();
  return (
    <div className="w-full p-4">
      <PermissionTable className="py-4 px-1" openAddPermission={toggle} />
      <Modal isShowing={isShowing} hide={toggle}>
        <AddPermissionModal onDiscard={toggle} onSubmit={toggle} />
      </Modal>
    </div>
  );
};
PermissionManage.layout = AdminLayout;
export default PermissionManage;
