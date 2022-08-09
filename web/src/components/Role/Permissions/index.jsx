import { Input } from "@/components/Common/Input";
import Pagination from "@/components/Common/Pagination";
import Select from "@/components/Common/Select";
import CustomTable from "@/components/Common/Table/CustomTable";
import React from "react";
import Header from "../Common/Header";
import { FilterEntries, FilterRoles } from "./Config";
const PermissionTable = ({ openAddPermission, className, ...props }) => {
  const tableCol = [
    { title: "Name", key: "name" },
    {
      title: "Assigned to",
      key: "roles",
      render: (obj) => {
        // console.log(obj);
        const config = {
          admin: {
            class: "bg-violet-100 text-violet-600 px-2  rounded-xl",
          },
          user: { class: "bg-orange-100 text-orange-600 px-2  rounded-xl" },
        };
        return (
          <div className="flex gap-4">
            {obj.roles.map((role) => (
              <div className={`${config[role.value].class}`}>{role.label}</div>
            ))}
          </div>
        );
      },
    },
    { title: "Created date", key: "createdAt" },
    {
      title: "Actions",
      key: "actions",
      render: (obj) => {
        return (
          <div className="flex gap-4">
            {obj.actions.map((action, index) => {
              return (
                <div
                  className={
                    index === 0 ? "v-btn-primary w-max" : "v-btn-secondary"
                  }
                  onClick={() => (index === 0 ? null : null)}
                >
                  {action}
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];
  const tableData = [
    {
      name: "Manage Users",
      roles: [FilterRoles[0]],
      createdAt: new Date(Date.now()).toLocaleDateString(),
      actions: ["Edit", "Delete"],
    },
    {
      name: "Add Ticket",
      roles: [FilterRoles[1]],
      createdAt: new Date(Date.now()).toLocaleDateString(),
      actions: ["Edit", "Delete"],
    },
    {
      name: "Approve Ticket",
      roles: [FilterRoles[0]],
      createdAt: new Date(Date.now()).toLocaleDateString(),
      actions: ["Edit", "Delete"],
    },
    {
      name: "CheckIn",
      roles: [FilterRoles[0], FilterRoles[1]],
      createdAt: new Date(Date.now()).toLocaleDateString(),
      actions: ["Edit", "Delete"],
    },
  ];
  return (
    <div className="flex flex-col gap-4 ">
      {/* Header */}
      <Header
        title="Permissions List"
        description="Each category (Basic, Professional, and Business) includes the four predefined roles shown below."
      />
      {/* Filters and Table */}
      <div className={`card flex flex-col gap-2 py-4 ${className}`}>
        {/* Filter Options*/}
        <div className="flex flex-col  px-6 py-2 lg:flex-row lg:justify-between">
          {/* Entries */}
          <div className="flex items-center gap-4">
            <div>Show</div>
            <div>
              <Select
                options={FilterEntries}
                value={FilterEntries[0]}
                onChange={() => null}
              />
            </div>
            <div>Entries</div>
          </div>
          {/* Filter */}
          <div className="flex flex-1 flex-col flex-wrap justify-end gap-4 lg:flex-row lg:items-center">
            <div className="flex w-full items-center gap-4 lg:w-max">
              <div>Search: </div>
              <Input
                placeholder="Permission name"
                name="permission-name"
                className="w-full "
              />
            </div>

            <Select
              options={FilterRoles}
              value={FilterRoles[0]}
              onChange={() => null}
              className="lg:w-40"
            />
            <button
              className="v-btn-primary w-full text-center lg:w-max"
              onClick={openAddPermission}
            >
              Add Permission
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="flex flex-col gap-2">
          <div className="overflow-auto">
            <CustomTable columns={tableCol} dataSource={tableData} />
          </div>
          <Pagination total={3} currentPage={1} onChange={() => null} />
        </div>
      </div>
    </div>
  );
};

export default PermissionTable;
