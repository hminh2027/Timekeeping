import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = React.memo(
  ({ label, name, placeholder, className, ...props }) => {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor="user-userName">{label}</label>
        <input
          name={name}
          className={`v-input`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

const InputPassword = React.memo(({ label, name, className, ...props }) => {
  const [isHiding, setIsHiding] = useState(true);
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor="user-userName">{label}</label>
      <div className="v-input flex items-center justify-between">
        <input
          name={name}
          className={`w-full border-none outline-none`}
          placeholder={label}
          type={isHiding ? "password" : "text"}
          {...props}
        />
        <div className="text-xl">
          {isHiding ? (
            <AiOutlineEyeInvisible onClick={() => setIsHiding(!isHiding)} />
          ) : (
            <AiOutlineEye onClick={() => setIsHiding(!isHiding)} />
          )}
        </div>
      </div>
    </div>
  );
});

export { InputPassword, Input };
