import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import React, { useState } from "react";
const Select = React.memo((props) => {
  const label = props.label;
  const value = props.value;
  const options = props.options;
  const [showingOptions, setShowingOptions] = useState(false);

  return (
    <div className={`flex flex-col gap-1  ${props.className}`}>
      <label htmlFor="user-userName">{label}</label>
      <div
        id="user-userName"
        className={`v-select flex justify-between bg-white`}
        onClick={() => setShowingOptions(!showingOptions)}
      >
        <div>{value.label}</div>
        <div className="flex items-center">
          {showingOptions ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
      <div
        className={`v-select-list transition-all duration-200 ${
          !showingOptions && "hidden"
        }`}
      >
        {options.map((option) => (
          <div
            className="v-select-option bg-white"
            onClick={() => {
              setShowingOptions(!showingOptions);
              // setValue(option);
              props.onChange(option);
            }}
            // selectValue={option.value}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
});
export default Select;
