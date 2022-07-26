import { Button, Input, Select, Space } from "antd";
import React from "react";

import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";

import CreditUser from "@/components/page/admin/users/CreditUserModal";
import DeleteNotification from "@/components/page/admin/users/DeleteNotificationModal";
const { Option } = Select;

const TableUsers = React.memo((props) => {
  const Users = props.Users
  
  return (
    <>
      <div
        className="w-full hidden p-4 font-semibold lg:flex"
        style={{ background: "rgb(153, 226, 180)" }}
      >
        <div className="font-semibold" style={{ flex: "1 0 3em" }}>
          Employee Id
        </div>
        <div className="font-semibold" style={{ flex: "1 0 6em" }}>
          Name
        </div>
        <div className="font-semibold" style={{ flex: "1 0 12em" }}>
          Email
        </div>
        <div className="font-semibold" style={{ flex: "1 0 5em" }}>
          Role
        </div>
        <div className="font-semibold" style={{ flex: "1 0 3em" }}>
          Action
        </div>
      </div>
      <div className="h-[500px] overflow-auto pb-1">
        {Users?.map((user,i) => (
          <UserItem
            key={i}
            id={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            email = {user.email}
            role = {user.role}
          />
        ))}
      </div>
    </>
  );
});
const UserItem = (props) => {
  console.log("props",props)
  const {
    id,
    firstName,
    lastName,
    email,
    role,
  } = props;
  
  const statusIcon = [];
  
  return (
    <div className="items-center w-full py-4 font-medium border-b border-b-orange-600 lg:flex lg:justify-start lg:px-4 lg:py-8 hover:bg-sky-200">
      <div style={{ flex: "1 0 3em" }} className="flex text-sky-800">
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          EmployeeId:
        </div>
        <div className="flex-1 font-semibold">{id}</div>
      </div>
      <div
        style={{ flex: "1 0 6em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Name:
        </div>
        <div className="flex-1">{firstName+" "+lastName}</div>
      </div>
      <div
        style={{ flex: "1 0 12em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Email:
        </div>
        <div className="flex-1">{email}</div>
      </div>
      <div
        style={{ flex: "1 0 5em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Role:
        </div>
        <div className="flex-1">{role}</div>
      </div>
      <div
        style={{ flex: "1 0 3em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Action:
        </div>
        <div className="flex-1">
          <Credit id={id} firstName={firstName} lastName={lastName} email={email} role={role}/>
          <Delete id={id}/>
        </div>
      </div>
    </div>
  );
};

const Credit = ({id, firstName, lastName, email, role}) => {
  const { isShowing, toggle } = UseModal();
  return (
    <>
      <button onClick={toggle} className="border border-solid border-teal-700 p-1 rounded-xl hover:bg-teal-600 mr-2">🖊️</button>
      <Modal isShowing={isShowing} hide={toggle}>
        <div className="flex">
          <CreditUser hide={toggle} id={id} firstName={firstName} lastName={lastName} email={email} role={role}/>
        </div>
      </Modal>
    </>
    
  )
}

const Delete = ({id}) => {
  const { isShowing, toggle } = UseModal();
  return (
    <>
      <button onClick={toggle} className="border border-solid border-gray-500 p-1 rounded-xl hover:bg-gray-400">🗑️</button>
      <Modal isShowing={isShowing} hide={toggle}>
        <div className="flex">
          <DeleteNotification hide={toggle} id={id}/>
        </div>
      </Modal>
    </>
  )
}
export default TableUsers ;
