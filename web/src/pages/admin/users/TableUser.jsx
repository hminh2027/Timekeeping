import { Button, Input, Select, Space } from "antd";
import React from "react";
import {BsPen} from "react-icons/bs";
import {ImBin} from "react-icons/im";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
import CreateUser from "@/components/page/admin/users/FunctionUserModal";
import DeleteNotification from "@/components/page/admin/users/DeleteNotificationModal";
const { Option } = Select;

const TableUsers = React.memo((props) => {
  const Users = props.Users;

  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f0f0",
        }}
        className="hidden p-4 font-semibold lg:flex"
      >
        <div className="font-semibold" style={{ flex: "1 0 3em" }}>
          Employee Id
        </div>
        <div className="font-semibold" style={{ flex: "1 0 5em" }}>
          Name
        </div>
        <div className="font-semibold" style={{ flex: "1 0 10em" }}>
          Email
        </div>
        <div className="font-semibold" style={{ flex: "1 1 3em" }}>
          Role
        </div>
        <div className="font-semibold" style={{ flex: "1 0 2em" }}>
          Action
        </div>
      </div>
      <div className="h-[500px] overflow-auto pb-1">
        {Users?.map((user, i) => (
          <UserItem
            key={i}
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            role={user.role}
            password = {user.password}
          />
        ))}
      </div>
    </>
  );
});
const UserItem = (props) => {
  console.log("props", props);
  const { id, firstName, lastName, email, role, password } = props;
  const UserData = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    role: role,
    password: password,
  }
  return (
    <div 
    className="items-center border-b-4 border-[#fafafa] py-4 font-medium lg:flex lg:justify-start lg:px-4 lg:py-8 "
    // onClick={() => openModal(id)}
    >
    <div
      style={{ flex: "1 0 3em" }}
      className="flex font-light text-gray-500 "
    >
      <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          EmployeeId:
        </div>
        <div className="flex-1 font-semibold">{id}</div>
      </div>
      <div
        style={{ flex: "1 0 5em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Name:
        </div>
        <div className="flex-1">{firstName + " " + lastName}</div>
      </div>
      <div
        style={{ flex: "1 0 10em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Email:
        </div>
        <div className="flex-1">{email}</div>
      </div>
      <div
        style={{ flex: "1 0 3em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Role:
        </div>
        <div className="flex-1">{role}</div>
      </div>
      <div
        style={{ flex: "1 0 2em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="mx-4 w-32 font-semibold text-sky-800 lg:hidden">
          Action:
        </div>
        <div className="flex-1">
          <Credit
            id={id}
            UserData={UserData}
          />
          <Delete id={id} />
        </div>
      </div>
    </div>
  );
};

const Credit = (props) => {
  const { isShowing, toggle } = UseModal();
  return (
    <>
      <button
        onClick={toggle}
        className="mr-2 rounded-xl p-2 hover:bg-slate-300"
      >
        <BsPen size={"25px"}/>
      </button>
      <Modal isShowing={isShowing} hide={toggle}>
        <div className="flex">
          <CreateUser
            hide={toggle}
            id={props.id}
            userData={props.UserData}
            Name="EDIT USER"
            click="Edit"
          />
        </div>
      </Modal>
    </>
  );
};

const Delete = ({ id }) => {
  const { isShowing, toggle } = UseModal();
  return (
    <>
      <button
        onClick={toggle}
        className="rounded-xl p-2 hover:bg-gray-400"
      >
        <ImBin size={"25px"}/>
      </button>
      <Modal isShowing={isShowing} hide={toggle}>
        <div className="flex">
          <DeleteNotification hide={toggle} id={id} />
        </div>
      </Modal>
    </>
  );
};
export default TableUsers;
