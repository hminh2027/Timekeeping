import React, { useState } from "react";
import Select from "@/components/Common/Select";
import Input from "@/components/Common/Input";
const UserInfo = () => {
  const [data, setData] = useState({
    role: { label: "User", value: "user" },
    name: "Selina Kyle",
    username: "catwomen",
    email: "catwomen@gmail.com",
  });
  const options = [
    {
      label: "Home",
      value: "home",
    },
    {
      label: "Ticket",
      value: "ticket",
    },
  ];
  const handlerDataChange = (propName, value) => {
    setData({ ...data, [propName]: value });
  };
  return (
    <>
      {/* Avatar & name */}
      <div className="flex gap-4 p-4">
        <div>
          <img
            className="max-w-24 max-h-24 rounded-md"
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-3/img/1.9cba4a79.png"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="text-2xl text-cyan-800">Selina Kyle</div>
          <div className="flex gap-4">
            <button className="v-btn-primary p-1 lg:w-32">Update</button>
            <button className="v-btn p-1 lg:w-32">Delete</button>
          </div>
        </div>
      </div>
      {/* Account Infos */}
      <div className="flex w-full flex-wrap">
        <Input
          name="username"
          label="Username"
          value="catwomen"
          className="w-full p-4 lg:w-1/3"
          onChange={(value) => handlerDataChange("username", value)}
        />
        <Input
          name="name"
          label="Name"
          value={data.name}
          className="w-full p-4 lg:w-1/3"
          onChange={(value) => handlerDataChange("name", value)}
        />
        <Input
          name="email"
          label="Email"
          value={data.email}
          className="w-full p-4 lg:w-1/3"
          onChange={(value) => handlerDataChange("email", value)}
        />
        <Select
          label="Role"
          name="role"
          value={data.role}
          className="w-full p-4 lg:w-1/3"
          onChange={(value) => handlerDataChange("role", value)}
          options={options}
        />
      </div>
      {/* Account Permissions */}
      <div className="flex w-full flex-col gap-4 p-4 lg:flex-row">
        <button className="v-btn-primary w-full  lg:w-32">Save Changes</button>
        <button className="v-btn  w-full lg:w-24">Reset</button>
      </div>
    </>
  );
};

export default UserInfo;
