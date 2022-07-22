import { Button, Input, Select, Space } from "antd";
import React, { useEffect, useReducer, useState } from "react";
import api from"@/api/api";
// import Approve from "./Approve";
import { useDispatch } from "react-redux";
const { Option } = Select;

const TableUsers = React.memo((props) => {
//   const tickets = props.tickets;
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchGetUsers = async () => {
            const res = await api.get(`user`)
            console.log("res",res)
            const {data} = res
            setUsers(data)
        }
        fetchGetUsers();
    },[])
  console.log("TICKETS LIST ",users)
  const filter = () => {};
  return (
    <>
      <div
        className="w-full hidden p-4 font-semibold lg:flex"
        style={{ background: "rgb(153, 226, 180)" }}
      >
        <div className="font-semibold" style={{ flex: "1 0 2em" }}>
          Id
        </div>
        <div className="font-semibold" style={{ flex: "1 0 5em" }}>
          Name
        </div>
        <div className="font-semibold" style={{ flex: "1 0 10em" }}>
          Email
        </div>
        <div className="font-semibold" style={{ flex: "1 0 4em" }}>
          Role
        </div>
      {/* <div className="flex flex-1"> */}
      </div>
      <div className="h-[500px] overflow-auto pb-1">
        {users?.map((user,i) => (
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
      <div style={{ flex: "1 0 2em" }} className="flex text-sky-800">
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Id:
        </div>
        <div className="flex-1 font-semibold">{id}</div>
      </div>
      <div
        style={{ flex: "1 0 5em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Name:
        </div>
        <div className="flex-1">{firstName+" "+lastName}</div>
      </div>
      <div
        style={{ flex: "1 0 10em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Email:
        </div>
        <div className="flex-1">{email}</div>
      </div>
      <div
        style={{ flex: "1 0 4em" }}
        className={`flex font-light text-gray-500`}
      >
        <div className="w-32 mx-4 font-semibold text-sky-800 lg:hidden">
          Role:
        </div>
        <div className="flex-1">{role}</div>
      </div>
    </div>
  );
};
export { UserItem, TableUsers };
