import React from "react";
import { Input } from "../Common/Input";
import CustomTable from "../Common/Table/CustomTable";
import Header from "./Common/Header";

const RoleEditModal = ({ onSubmit, onDiscard }) => {
  const tableData = [
    {
      permission: "Check in",
      read: true,
      write: true,
      create: true,
    },
    {
      permission: "Ticket",
      read: true,
      write: true,
      create: true,
    },
    {
      permission: "User",
      read: true,
      write: true,
      create: true,
    },
  ];
  const tableCol = [
    {
      title: "",
      key: "permission",
    },
    {
      title: "Read",
      key: "read",
      render: (obj) => {
        return <input type="checkbox" className="accent-violet-600" />;
      },
    },
    {
      title: "Write",
      key: "write",
      render: (obj) => {
        return <input type="checkbox" className="accent-violet-600" />;
      },
    },
    {
      title: "Create",
      key: "create",
      render: (obj) => {
        return <input type="checkbox" className="accent-violet-600" />;
      },
    },
  ];
  return (
    <div className="card p-4">
      <Header
        title="Edit Role"
        description="Set role permissions"
        className="items-center"
      />

      <div className="flex flex-col gap-4">
        <Input
          label="Role name"
          placeholder="Enter role name"
          onChange={() => null}
        />
        <div className="flex flex-col gap-4">
          <div className="text-xl text-violet-900">Role Permissions</div>
          <div className="flex-col-gap-2 flex">
            <CustomTable dataSource={tableData} columns={tableCol} />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button className="v-btn-primary" onClick={onSubmit}>
            Submit
          </button>
          <button className="v-btn-secondary" onClick={onDiscard}>
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleEditModal;
