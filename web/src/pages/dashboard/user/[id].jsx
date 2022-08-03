import Home from "@/components/page/Dashboard/Home";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const UserInfo = () => {
  const content = (
    <>
      {/* Header */}
      <div></div>
      {/* Avatar & name */}
      <div className="flex gap-4">
        <div>
          <img
            className="h-24 w-24 rounded-md"
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-3/img/1.9cba4a79.png"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="text-2xl text-cyan-800">Selina Kyle</div>
          <div className="flex gap-4">
            <button className="v-btn-primary p-1 lg:w-32">Edit</button>
            <button className="v-btn p-1 lg:w-32">Delete</button>
          </div>
        </div>
      </div>
      {/* Account Infos */}
      <div className="flex w-full flex-wrap">
        <Input
          label="Username"
          value="catwomen"
          className="w-full p-4 lg:w-1/3"
        />
        <Input label="Name" value="catwomen" className="w-full p-4 lg:w-1/3" />
        <Input label="Email" value="catwomen" className="w-full p-4 lg:w-1/3" />
        <Input label="Email" value="catwomen" className="w-full p-4 lg:w-1/3" />
        <Input label="Email" value="catwomen" className="w-full p-4 lg:w-1/3" />
        <Select
          label="Email"
          value="catwomen"
          className="w-full p-4 lg:w-1/3"
        />
      </div>
    </>
  );
  return <div>{content}</div>;
};

export default UserInfo;
const Input = (props) => {
  const label = props.label;
  const value = props.value;
  return (
    <div className={` flex flex-col gap-1 ${props.className}`}>
      <label htmlFor="user-userName">{label}</label>
      <input
        id="user-userName"
        className={`v-input`}
        placeholder={label}
        value={value}
      />
    </div>
  );
};
const Select = (props) => {
  const label = props.label;
  const [value, setValue] = useState(props.value);
  const [showingOptions, setShowingOptions] = useState(false);
  const options = [
    {
      label: "Home",
      value: "home",
    },
    {
      label: "Ticket",
      value: "ticket",
    },
  ];
  console.log(value);
  return (
    <div className={`flex flex-col gap-1 ${props.className}`}>
      <label htmlFor="user-userName">{label}</label>
      <div
        id="user-userName"
        className={`v-input flex justify-between`}
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
            className="v-select-option"
            onClick={() => {
              setShowingOptions(!showingOptions);
              setValue(option);
            }}
            selectValue={option.value}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
