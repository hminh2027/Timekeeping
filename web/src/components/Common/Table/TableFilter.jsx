import React, { useState, useEffect } from "react";
const DesktopFilter = ({ dataSort, onSubmit, className, ...props }) => {
  const [filterOption, setFilterOption] = useState({
    title: "",
    status: "",
    type: "",
  });
  console.log(filterOption);
  const handleChange = (e) => {
    setFilterOption({ ...filterOption, [e.target.name]: e.target.value });
  };

  const submit = () => {
    onSubmit(filterOption);
  };

  return (
    <div className={`flex bg-white py-4 ${className}`}>
      <div className="flex w-full flex-row justify-between gap-4">
        <div className="flex flex-row gap-8">
          {dataSort.map((dt) =>
            dt.type == "input" ? (
              <Input
                key={dt.name}
                name={dt.name}
                value={filterOption[dt.name]}
                style={dt.style}
                handle={(e) => handleChange(e)}
              />
            ) : (
              <SelectInput
                name={dt.name}
                value={filterOption[dt.name]}
                handle={(e) => handleChange(e)}
                style={dt.style}
                data={dt.data}
              />
            )
          )}
        </div>
        <div className="flex items-center text-right">
          <button
            className="mr-4 rounded-lg border-2 border-solid border-teal-500 px-5 py-2 hover:bg-teal-500 hover:text-white"
            onClick={submit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
const MobileFilter = ({ dataSort, onSubmit, className, ...props }) => {
  const [usingFilter, setUsingFilter] = useState(false);
  const [filterOption, setFilterOption] = useState({});

  const handleChange = (e) => {
    setFilterOption({ ...filterOption, [e.target.name]: e.target.value });
  };

  const submit = () => {
    onSubmit(filterOption);
  };
  return (
    <div className={`bg-smoke p-4  ${className}`}>
      {usingFilter && (
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            {dataSort.map((dt) =>
              dt.type == "input" ? (
                <Input
                  key={dt.name}
                  name={dt.name}
                  value={dt.value}
                  style={dt.style}
                  handle={(e) => handleChange(e)}
                  // submit = {() => submit()}
                />
              ) : (
                <SelectInput
                  key={dt.name}
                  name={dt.name}
                  value={dt.value}
                  handle={(e) => handleChange(e)}
                  style={dt.style}
                  data={dt.data}
                />
              )
            )}
          </div>
          <div className="text-right ">
            <button
              className="mr-2 rounded-lg border-2 border-solid border-teal-500 px-5 py-2 hover:bg-teal-500 hover:text-white"
              onClick={() => {
                submit();
                setUsingFilter(!usingFilter);
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}

      {!usingFilter && (
        <div className="text-center">
          <button
            className="v-btn-primary"
            onClick={() => setUsingFilter(!usingFilter)}
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
};
export { DesktopFilter, MobileFilter };

const Input = (props) => {
  return (

      <div className="flex w-full items-center">
        <div className="mx-auto flex w-[92%] items-center rounded-full border hover:shadow-md md:w-full">
          <IconSearch />
          <input
            placeholder={props.name}
            name={props.name}
            value={props.value}
            className={props.style}
            onChange={props.handle}
          />
        </div>
      </div>
      
   
    
  );
};

const SelectInput = (props) => {
  return (
    <div className="mr-[-6rem] flex flex-row items-center justify-between">
      <div className="flex w-80 flex-1 items-center gap-4">
        <div className="w-auto">{props.name}:</div>
        <select
          name={props.name}
          value={props.value}
          onChange={props.handle}
          className="select select-bordered select-md w-40 max-w-xs rounded-lg focus:border-none"
        >
          {props.data &&
            props.data.map((e, i) => (
              <option key={i} value={e.value} className="flex justify-between">
                {e.label}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

const IconSearch = () => {
  return (
    <div class="pl-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};
