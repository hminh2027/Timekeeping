import { useRouter } from "next/router";
import React from "react";
import Avatar from "../Avatar";
import { Input } from "../Common/Input";
import Pagination from "../Common/Pagination";
import Select from "../Common/Select";
import CustomTable from "../Common/Table/CustomTable";
import Header from "./Common/Header";
import { FilterRoles, FilterEntries } from "./Permissions/Config";

const UserTable = ({ className }) => {
  const router = useRouter();
  const tableCol = [
    {
      title: "Name",
      key: "name",
      render: (obj) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8">
              <Avatar url="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/2.c8691d67.png" />
            </div>
            <div className="flex flex-col">
              <div>{obj.name}</div>
              <div>temp@temp.com</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Roles",
      key: "roles",
      render: (obj) => {
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
    {
      title: "Actions",
      key: "actions",
      render: (obj) => {
        return obj.actions.map((action) => (
          <button
            className="v-btn-secondary"
            onClick={() => router.push("/dashboard/user/1")}
          >
            {action}
          </button>
        ));
      },
    },
  ];
  const tableData = [
    {
      name: "User A",
      roles: [FilterRoles[0], FilterRoles[1]],
      actions: ["Detail"],
    },
    {
      name: "User B",
      roles: [FilterRoles[1]],
      actions: ["Detail"],
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <Header title="User with their roles" />
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
                className="min-w-16"
              />
            </div>
            <div>Entries</div>
          </div>
          {/* Filter */}
          <div className="flex flex-1 flex-col flex-wrap justify-end gap-4 lg:flex-row lg:items-center">
            <div className="flex w-full items-center gap-4 lg:w-max">
              <div>Search: </div>
              <Input name="name" className="w-full " />
            </div>

            <Select
              options={FilterRoles}
              value={FilterRoles[0]}
              onChange={() => null}
              className="lg:w-40"
            />
          </div>
        </div>
        <CustomTable dataSource={tableData} columns={tableCol} />
        <Pagination total={5} currentPage={1} onChange={() => null} />
      </div>
    </div>
  );
};

export default UserTable;
