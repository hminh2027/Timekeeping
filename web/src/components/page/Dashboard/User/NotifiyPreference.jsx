import React from "react";
import CustomTable from "@/components/Common/Table/CustomTable";
const NotifyPreference = ({role, ...props}) => {
  const data = [
    {
      type: "Checkin Alert",
      email: true,
      app: true,
      browser: false
    },
    {
      type: "Ticket",
      email: true,
      app: false,
      browser: false
    },
    {
      type: "Events",
      email: false,
      app: false,
      browser: true
    },
  ];
  const columns = [
    { title: "Type", key: "type" },
    {
      title: "✉ Email",
      key: "email",
      render: (obj) => {
        console.log(role);
        return (
          <input
            className="h-5 w-5  outline-0 outline-violet-500 checked:accent-violet-500"
            type={"checkbox"}
            disabled={role==="user"}
            // disabled
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
          disabled={role=="user"}
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
          disabled={role=="user"}
          //   checked={obj.browser}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-2xl text-cyan-800">Notifications</div>
        <div>Change notification settings</div>
      </div>

      <CustomTable dataSource={data} columns={columns} />
      <div className="flex-end flex gap-4">
        <button className="v-btn-primary w-40">Save Changes</button>
        <button className="v-btn">Reset</button>
      </div>
    </div>
  );
};

export default NotifyPreference;
