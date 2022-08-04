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
    {
      type: "Ticket",
      email: true,
      app: false,
      browser: false,
    },
    {
      type: "Events",
      email: false,
      app: false,
      browser: true,
    },
  ];
  const columns = [
    { title: "Type", key: "type" },
    {
      title: "✉ Email",
      key: "email",
      render: (obj) => {
        return (
          <input
            className="h-5 w-5  outline-0 outline-violet-500 checked:accent-violet-500"
            type={"checkbox"}
            // checked={obj.email}
          />
        );
      },
    },
    {
      title: "📱 App",
      key: "app",
      render: (obj) => (
        <input
          className="h-5 w-5 outline-0 outline-violet-500 checked:accent-violet-500"
          type={"checkbox"}
          //   checked={obj.app && "checked"}
        />
      ),
    },
    {
      title: "🌏 Browser",
      key: "browser",
      render: (obj) => (
        <input
          className="h-5 w-5 outline-0 checked:accent-violet-500"
          type={"checkbox"}
          //   checked={obj.browser}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col">
      <div>Notifications</div>
      <div>Change to notification settings, the user will get the update</div>
      <CustomTable dataSource={data} columns={columns} />
    </div>
  );
};

export default NotifiyPreference;
