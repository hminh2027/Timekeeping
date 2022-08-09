import React from "react";
import Avatar from "../Avatar";
import Header from "./Common/Header";
import { FiCopy } from "react-icons/fi";
import RoleInfoCard from "./RoleInfoCard";
import RoleEditModal from "./RoleEditModal";
import Modal from "../Common/Modal";
import UseModal from "@/utils/hooks/UseModal";
import UserTable from "./UserTable";
const Role = () => {
  const { isShowing, toggle } = UseModal();
  const avatars = [
    {
      url: "https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/2.c8691d67.png",
      name: "A",
    },
    {
      url: "https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/11.9d340e5c.png",
      name: "B",
    },
    {
      url: "https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/6.858a7a6b.png",
      name: "C",
    },
    {
      url: "https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/12.761057bd.png",
      name: "D",
    },
  ];
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <Header
        title="Roles List"
        description="A role provides access to predefined menus and features depending on the assigned role to an administrator that can have access to what he needs."
      />
      <div className="flex w-full gap-8">
        <RoleInfoCard
          name="Admin"
          avatars={avatars}
          className="flex-1"
          onEdit={toggle}
        />
        <RoleInfoCard
          name="Manager"
          avatars={avatars}
          className="flex-1"
          onEdit={toggle}
        />
        <RoleInfoCard
          name="User"
          avatars={avatars}
          className="flex-1"
          onEdit={toggle}
        />
      </div>
      <UserTable />
      <Modal isShowing={isShowing} hide={toggle}>
        <RoleEditModal onDiscard={toggle} onSubmit={toggle} />
      </Modal>
    </div>
  );
};

export default Role;
