import Link from "next/link";
import React from "react";
import CustomTable from "../Common/Table/CustomTable";
import TableButton from "../Common/Table/TableButton";
import TableHeader from "../Common/Table/TableHeader";
const LeaderBoard = () => {
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
      render: (obj) => (
        <Link href="http://localhost:3005/">{<div>{obj.username}</div>}</Link>
      ),
    },
    {
      title: "Check in",
      key: "checkin",
      render: (obj) => (
        <div className="w-fit rounded-xl bg-[#fff5e6] px-3 text-[#ff9f0a]">
          {obj.checkin}
        </div>
      ),
    },
    {
      title: "Minutes",
      key: "minutes",
      render: (obj) => (
        <div className="w-fit rounded-xl bg-[#e5f7ed] px-3 text-[#00b14f]">
          {obj.minutes}
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
    <div className="overflow-auto">
      <TableHeader title={"Top Ranking"} btnList={buttons} />

      <CustomTable dataSource={data} columns={columns} />
    </div>
  );
};

export default LeaderBoard;
