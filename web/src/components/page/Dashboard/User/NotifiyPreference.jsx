import React from "react";
import CustomTable from "@/components/Common/Table/CustomTable";
const NotifiyPreference = () => {
  const data = [
    {
      type: "Checkin Alert",
      email: true,
      app: true,
      browser: false,
    },
  ];
  const columns = [
    { title: "Type", key: "type" },
    {
      title: "email",
      key: "email",
      render: (obj) => {
        console.log("OBJ", obj);
        return (
          <input
            className="checked:bg-violet-500"
            type={"checkbox"}
            checked={obj.email}
          />
        );
      },
    },
    {
      title: "app",
      key: "app",
      render: (obj) => (
        <input
          className="checked:bg-violet-500"
          type={"checkbox"}
          checked={obj.app}
        />
      ),
    },
    {
      title: "browser",
      key: "browser",
      render: (obj) => (
        <input
          className="checked:bg-violet-500"
          type={"checkbox"}
          checked={obj.browser}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col">
      <div>Notifications</div>
      <CustomTable dataSource={data} columns={columns} />
    </div>
  );
};

export default NotifiyPreference;
