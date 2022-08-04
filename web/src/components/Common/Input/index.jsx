import React, { useState } from "react";

const Input = React.memo((props) => {
  const label = props.label;
  const name = props.name;
  return (
    <div className={` flex flex-col gap-1 ${props.className}`}>
      <label htmlFor="user-userName">{label}</label>
      <input name={name} className={`v-input`} placeholder={label} {...props} />
    </div>
  );
});
export default Input;
