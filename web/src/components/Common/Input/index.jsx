import React, { useState } from "react";

const Input = React.memo((props) => {
  const label = props.label;
  const [value, setValue] = useState(props.value);
  const name = props.name;
  return (
    <div className={` flex flex-col gap-1 ${props.className}`}>
      <label htmlFor="user-userName">{label}</label>
      <input
        name={name}
        id="user-userName"
        className={`v-input`}
        placeholder={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
});
export default Input;
