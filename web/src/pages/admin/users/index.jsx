import Index from "@/layout/AdminLayout";
import React, { useEffect, useState } from "react";

import Modal from "@/components/Common/Modal";
import DeleteNotification from "@/components/page/admin/users/DeleteNotificationModal";
import CreateUser from "@/components/page/admin/users/FunctionUserModal";
import {
  DesktopFilter,
  MobileFilter,
} from "@/components/Common/Table/TableFilter";
import { useGetUserQuery } from "src/rest/user/user.query";
import Link from "next/link";
import { USER_ACTION } from "@/utils/constants/user_constants";
import CustomTable from "@/components/Common/Table/CustomTable";
import HeaderUser from "./HeaderUser";
import UseModal from "@/utils/hooks/UseModal";
const AdminUserPage = () => {
  const [type, setType] = useState("edit");
  const [curUser, setCurUser] = useState(null);
  const { isShowing, toggle } = UseModal();
  const [filterOptions, setFilterOptions] = useState({
    search: "",
  });
  const dataSort = [
    {
      name: "search",
      type: "input",
      style:
        "lg:w-full xl:w-[500px] rounded-full bg-transparent py-[10px] px-[10px] pl-4 outline-none",
      value: "",
      data: [],
    },
  ];
  const sortOptions = `limit=10&page=1&search=${filterOptions.search}`;
  const { data: Users } = useGetUserQuery(sortOptions);
  console.log("SORT USER", Users);
  const handleClick = (type, obj) => {
    setType(type);
    setCurUser(obj);
    toggle();
  };
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
      title: "LastName",
      key: "lastName",
      className: "hidden"
    },
    {
      title: "FirstName",
      key: "firstName"
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
      render: (obj) => {
        console.log("obj", obj);

        return (
          <div className="flex">
            {USER_ACTION.map(({ name, icon }) => (
              <div key={name}>
                <button
                  onClick={() => handleClick(name, obj)}
                  className="mr-2 rounded-xl p-2 hover:bg-gray-300"
                >
                  {icon}
                </button>
                {name == "DELETE" ? (
                  <Modal
                    isShowing={isShowing && type == "DELETE"}
                    hide={toggle}
                  >
                    <div className="flex">
                      <DeleteNotification hide={toggle} id={curUser?.id} />
                    </div>
                  </Modal>
                ) : (
                  <Modal isShowing={isShowing && type == "EDIT"} hide={toggle}>
                    <div className="flex">
                      <CreateUser
                        hide={toggle}
                        id={curUser?.id}
                        userData={curUser}
                        Name={name}
                        click={name}
                      />
                    </div>
                  </Modal>
                )}
              </div>
            ))}
          </div>
        );
      },
    },
  ];
  return (
    // <div>AdminUserPage</div>
    <div className="m-4 flex-1 flex-col gap-8">
      <div
        className="m-1 flex flex-col overflow-auto rounded-lg "
        style={{
          backgroundColor: "#fff",
          boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
        }}
      >
        <div className="card-body">
          <HeaderUser title={"Manager User"}/>
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
