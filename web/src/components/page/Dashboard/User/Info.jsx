import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImTrophy } from "react-icons/im";
const UserInfo = () => {
  const [data, setData] = useState({
    role: { label: "User", value: "user" },
    name: "Selina Kyle",
    username: "catwomen",
    email: "catwomen@gmail.com",
    status: "Active",
    checkinRecord: 99,
    times_on_leaderboard: 10,
  });

  return (
    <>
      {/* Avatar & name */}
      <div className="flex flex-col items-center gap-4">
        <div>
          <img
            className="max-w-24 max-h-24 rounded-md"
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-3/img/1.9cba4a79.png"
          />
        </div>
        <div className="flex flex-1 flex-col items-center gap-1">
          <div className="text-2xl text-cyan-800">Selina Kyle</div>
          <div className="rounded-md bg-sky-100 px-2 py-1 text-sm text-sky-400">
            {data.role.label}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center gap-12">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-100 text-cyan-400">
            <FaCheck />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-medium text-cyan-800">
              {data.checkinRecord}
            </div>
            <div className="text-sm font-medium">CheckIn times</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-100 text-cyan-400">
            <ImTrophy />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-medium text-cyan-800">
              {data.times_on_leaderboard}
            </div>
            <div className="text-sm font-medium">Times on leaderboard</div>
          </div>
        </div>
      </div>
      {/* Account Infos */}
      <div className="flex w-full flex-col">
        <div className="text-2xl text-cyan-800">Details</div>
        <div class="divider"></div>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex gap-2">
            <div className="text-cyan-900">Username:</div>
            <div className="">{data.username}</div>
          </div>
          <div className="flex gap-2">
            <div className="text-cyan-900">Email:</div>
            <div>{data.email}</div>
          </div>
          <div className="flex gap-2">
            <div className="text-cyan-900">Role:</div>
            <div>{data.role.label}</div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-cyan-900">Status:</div>
            <div className="bg-green-100 py-1 px-2  text-green-600">
              {data.status}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-cyan-900">Start date:</div>
            <div>{new Date(Date.now()).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
      {/* Account Permissions */}
      <div className="flex w-full flex-row gap-4 p-4">
        <button className="v-btn-primary w-full  lg:w-32">Edit</button>
        <button className="v-btn  w-full lg:w-24">Suspend</button>
      </div>
    </>
  );
};

export default UserInfo;

// const handlerDataChange = (propName, value) => {
//   setData({ ...data, [propName]: value });
// };
{
  /* <Input
          name="username"
          label="Username"
          value="catwomen"
          className="w-full p-4 lg:w-1/3"
          onChange={(value) => handlerDataChange("username", value)}
        /> */
}
{
  /* <Input
          name="name"
          label="Name"
          value={data.name}
          className="w-full p-4 lg:w-1/3"
          onChange={(value) => handlerDataChange("name", value)}
        /> */
}
{
  /* <Input
          name="email"
          label="Email"
          value={data.email}
          className="w-full p-4 lg:w-1/3"
          onChange={(value) => handlerDataChange("email", value)}
        /> */
}
{
  /* <Select
          label="Role"
          name="role"
          value={data.role}
          className="w-full p-4 lg:w-1/3"
          onChange={(value) => handlerDataChange("role", value)}
          options={options}
        /> */
}
