import React from "react";

const TableButton = ({ func, label }) => {
  return (
    <button className="v-btn-primary" onClick={func}>
      {label}
    </button>
  );
};

export default TableButton;
