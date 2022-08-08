import React from "react";

const Avatar = ({ url, name, className }) => {
  return (
    <img src={url} alt={name} className={`w-full rounded-full ${className}`} />
  );
};

export default Avatar;
