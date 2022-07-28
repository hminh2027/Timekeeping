import React from "react";

const TableButton = ({ func, label }) => {
  return (
    <button className="ml-4 v-btn-primary" onClick={func}>
      {label}
    </button>
  );
};

export default TableButton;
