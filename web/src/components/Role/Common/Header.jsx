import React from "react";

const Header = ({ title, description, className, ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`} {...props}>
      <div className="text-2xl text-violet-900">{title}</div>
      <div className=" text-violet-900">{description}</div>
    </div>
  );
};

export default Header;
