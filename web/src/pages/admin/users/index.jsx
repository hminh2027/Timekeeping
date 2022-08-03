import Index from "@/layout/AdminLayout";
import React, { useEffect, useState } from "react";
import TableUsers from "./TableUser";
// import { DesktopFilter, MobileFilter } from "./Filter";
import {
  DesktopFilter,
  MobileFilter,
} from "@/components/Common/Table/TableFilter";
import { useGetUserQuery } from "src/rest/user/user.query";
import Link from "next/link";
import { TICKET_STATUS } from "@/utils/constants/ticket_constants";
import CustomTable from "@/components/Common/Table/CustomTable";
const AdminUserPage = () => {
  const [filterOptions, setFilterOptions] = useState({
    search: "",
  });
  const dataSort = [
    {
      name: "search",
      type: "input",
      style: "w-full rounded-full bg-transparent py-[10px] pl-4 outline-none",
      value: "",
      data: [],
    },
  ];
  const sortOptions = `limit=10&page=1&search=${filterOptions.search}`;
  const { data: Users } = useGetUserQuery(sortOptions);
  console.log("SORT USER", Users);

  const columns = [
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Full Name",
      key: "name",
      render: (obj) => {
        return (
          <Link href={`http://localhost:3005/`}>
            <div className="cursor-pointer text-blue-300">{obj.name}</div>
          </Link>
        );
      },
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
    },
    {
      title: "Created At",
      key: "createdAt",
      sortable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (obj) => (
        <div className="flex">
          <div>
            <button
              // onClick={() => router.push(`/dashboard/ticket/${obj.key}`)}
              className="v-btn"
            >
              Edit
            </button>
            {obj.status === TICKET_STATUS.PENDING && (
              <button
                // onClick={() => cancelHandler(obj.key)}
                className="v-btn-gray"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ),
    },
  ];
  return (
    // <div>AdminUserPage</div>
    <div className="w-full">
      <div className="flex w-full items-center justify-between bg-white px-4 py-6">
        <div className="text-3xl font-bold">Manage User</div>
      </div>
      <div span={24}>
        <div
          className="m-1 flex flex-col overflow-auto rounded-lg"
          style={{
            backgroundColor: "#fff",
            boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
          }}
        >
          <DesktopFilter
            onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
            className="hidden lg:flex"
            dataSort={dataSort}
          />
          <MobileFilter
            onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
            className="lg:hidden"
            dataSort={dataSort}
          />
          {Users && columns && (
            <CustomTable dataSource={Users} columns={columns} />
          )}
        </div>
      </div>
    </div>
  );
};

AdminUserPage.layout = Index;
export default AdminUserPage;
