import React from "react";

const TableHeader = ({ title, btnList }) => {
  return (
    <div className="flex max-h-[56px] w-full items-center justify-between bg-white py-10">
      <div style={{ fontSize: "2em", fontWeight: "bolder" }}>{title}</div>
      <div className="flex justify-between">
        {btnList?.map((btn, key) => (
          <div key={key}>{btn}</div>
        ))}
      </div>
    </div>
  );
};

export default TableHeader;
