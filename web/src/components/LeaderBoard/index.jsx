import Link from "next/link";
import React from "react";
import CustomTable from "../Common/Table/CustomTable";
import TableButton from "../Common/Table/TableButton";
import TableHeader from "../Common/Table/TableHeader";
const LeaderBoard = () => {
  // const TICKET_STATUS = {
  //   REJECTED: { background: "bg-[#ffedeb]", text: "text-[#ff564c]" },
  //   APPROVED: { background: "bg-[#e5f7ed]", text: "text-[#00b14f]" },
  //   CANCELLED: { background: "bg-[#f5f5f5]", text: "text-[#9f9f9f]" },
  //   PENDING: { background: "bg-[#fff5e6]", text: "text-[#ff9f0a]" },
  // };

  const data = [
    {
      key: "1",
      username: "Jane Minh",
      checkin: "8:12",
      minutes: 21,
    },
    {
      key: "2",
      username: "Joe Black",
      checkin: "7:30",
      minutes: 12,
    },
  ];

  const columns = [
    { title: "ID", key: "key" },
    {
      title: "Username",
      key: "username",
      render: (text) => (
        <Link href="http://localhost:3005/">
          <div>{text}</div>
        </Link>
      ),
    },
    {
      title: "Check in",
      key: "checkin",
      render: (text) => (
        <div className="w-fit rounded-xl bg-[#fff5e6] px-3 text-[#ff9f0a]">
          {text}
        </div>
      ),
    },
    {
      title: "Minutes",
      key: "minutes",
      render: (text) => (
        <div className="w-fit rounded-xl bg-[#e5f7ed] px-3 text-[#00b14f]">
          {text}
        </div>
      ),
    },
  ];

  const buttons = [
    <TableButton func={() => console.log("log")} label={"Create"} />,
    <TableButton func={() => console.log("log")} label={"Update"} />,
    <TableButton func={() => console.log("log")} label={"Delete"} />,
  ];

  return (
    <div>
      <TableHeader title={"Name"} btnList={buttons} />

      <CustomTable
        dataSource={data}
        columns={columns}
        buttons={buttons}
        tableName={"Top Ranking"}
      />
    </div>
  );
};

export default LeaderBoard;
