import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import React, { useState } from "react";
const Select = React.memo(
  ({ label, value, options, className, onChange, ...props }) => {
    const [showingOptions, setShowingOptions] = useState(false);

    return (
      <div className={`relative flex  flex-col gap-1 ${className}`}>
        <label htmlFor="user-userName">{label || ""}</label>
        <div
          id="user-userName"
          className={`v-select  flex justify-between bg-white`}
          onClick={() => setShowingOptions(!showingOptions)}
        >
          <div>{value.label}</div>
          <div className="flex items-center">
            {showingOptions ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
        <div
          className={`v-select-list absolute top-12 z-50 w-full transition-all duration-200 ${
            !showingOptions && "hidden"
          }`}
        >
          {options.map((option) => (
            <div
              className="v-select-option bg-white"
              onClick={() => {
                setShowingOptions(!showingOptions);
                onChange(option);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
export default Select;
