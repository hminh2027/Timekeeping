import CustomTable from "@/components/Common/Table/CustomTable";
import React from "react";

const Permission = () => {
  const data = [
    {
      permission: "User",
      read: true,
      write: false,
      delete: false,
    },
    {
      permission: "Ticket",
      read: true,
      write: false,
      delete: true,
    },
    {
      permission: "Check in",
      read: true,
      write: true,
      delete: false,
    },
  ];
  const columns = [
    { title: "Permissions", key: "permission" },
    {
      title: "Read",
      key: "read",
      render: (obj) => {
        return (
          <input
            className="h-5 w-5  outline-0 outline-violet-500 checked:accent-violet-500"
            type={"checkbox"}
            checked={obj.read}
            disabled
          />
        );
      },
    },
    {
      title: "Write",
      key: "write",
      render: (obj) => (
        <input
          className="h-5 w-5 outline-0 outline-violet-500 checked:accent-violet-500"
          type={"checkbox"}
          checked={obj.write}
          disabled
        />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (obj) => (
        <input
          className="h-5 w-5 outline-0 checked:accent-violet-500"
          type={"checkbox"}
          checked={obj.delete}
          disabled
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-2xl text-cyan-800">Permissions</div>
        <div>User's permissions</div>
      </div>

      <CustomTable dataSource={data} columns={columns} />
      {/* <div className="flex-end flex gap-4">
        <button className="v-btn-primary w-40">Save Changes</button>
        <button className="v-btn">Reset</button>
      </div> */}
    </div>
  );
};

export default Permission;
