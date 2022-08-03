import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import React, { useEffect, useState } from "react";
import TableUsers from "./TableUser";
// import { DesktopFilter, MobileFilter } from "./Filter";
import { DesktopFilter, MobileFilter } from "@/components/Common/Table/TableFilter";
import { useGetUserQuery } from "src/rest/user/user.query";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "antd/lib/modal/Modal";
import CreateUser from "@/components/page/admin/users/FunctionUserModal";
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
      data: []
    },
  ]
  const UserData = {
    email: "",
    firstName: "",
    lastName: "",
    role: "user",
    password: "",
  }
  const { isShowing, toggle } = UseModal();
  const sortOptions = `limit=10&page=1&search=${filterOptions.search}`;
  console.log("SORT USER", sortOptions);
  const { data: Users } = useGetUserQuery(sortOptions);
  return (
    // <div>AdminUserPage</div>
    <div className="w-full">
      <div className="flex w-full items-center justify-between bg-white px-4 py-6">
        <div className="text-3xl font-bold">Manage User</div>
        {/* <button
            className="ml-2 rounded-md border border-blue-400 bg-transparent py-2 px-4 font-semibold text-blue-400 hover:border-transparent hover:bg-blue-400 hover:text-white"
            onClick={toggle}
          >
            Create
          </button>
          <Modal isShowing={isShowing} hide={toggle}>
            <div className="flex">
              <CreateUser hide={toggle} click="Create" userData={UserData} Name="CREATE UER"/>
            </div>
          </Modal> */}
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
            dataSort = {dataSort}
          />
          <MobileFilter
            onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
            className="lg:hidden"
            dataSort = {dataSort}
          />
          <TableUsers Users={Users} />
        </div>
      </div>
    </div>
  );
};

AdminUserPage.layout = AdminLayout;
export default AdminUserPage;
