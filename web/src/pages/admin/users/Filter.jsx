import React, { useState, useEffect } from "react";
import { Button, Input, Select, Space } from "antd";
import api from "@/api/api";
const { Option } = Select;
const Filters = () => {};
const filter = () => {};

const DesktopFilter = (props) => {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [data, setData] = useState({
    title: "",
    type: "",
    status: "",
  });

  useEffect(() => {
    const fetchTicketTypes = async () => {
      const res = await api.get("ticket/type");
      const data = ["",...res.data];
      setTicketTypes(data);
    };

    fetchTicketTypes();
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log("DATA:", data);
  };
  const submit = () => {
    props.onSubmit(data);
  };
  return (
    <div className={`p-4 w-full bg-white flex ${props.className}`}>
      <div className="flex flex-row justify-between gap-4 w-full">
        <div className="flex flex-row gap-8">
          <div className="md:w-full mx-auto flex w-[92%] items-center rounded-full border hover:shadow-md">
            {/* <input
              name="sreach"
              placeholder="search"
              value={data.title}
              onChange={(e) => handleChange(e)}
              className="flex-1"
            /> */}
            <div class="pl-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input type="text" class="w-full bg-transparent rounded-full py-[10px] pl-4 outline-none" />
          </div>
        </div>
        <div className="text-right">
          <button
            className="bg-transparent hover:bg-red-400 text-red-400 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded-md"
            onClick={() => {
              submit();
            }}
          >
            Find
          </button>
          <button
            className="ml-2 bg-transparent hover:bg-blue-400 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded-md"
            onClick={() => {
              submit();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
const MobileFilter = (props) => {
  const [usingFilter, setUsingFilter] = useState(false);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [data, setData] = useState({
    title: "",
    type: "",
    status: "",
  });

  useEffect(() => {
    const fetchTicketTypes = async () => {
      const res = await api.get("ticket/type");
      const data = ["",...res.data];
      console.log("TICKET TYPE", data)
      setTicketTypes(data);
    };
    fetchTicketTypes();
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = () => {
    props.onSubmit(data);
  };
  return (
    <div className={`bg-slate-200 p-4  ${props.className}`}>
      {usingFilter && (
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full">
            <div className="bg-white md:w-full mx-auto flex w-[92%] items-center rounded-full border hover:shadow-md">
            <div class="pl-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input type="text" class="w-full bg-transparent rounded-full py-[10px] pl-4 outline-none" />
          </div>
              {/* <Input
                placeholder="Title"
                name="title"
                value={data.title}
                // onChange={filter}
                // style={{ flex: "1 0 5em" }}
                className="flex-1"
                onChange={(e) => handleChange(e)}
              /> */}
            </div>
          </div>
          <div className="text-right">
            <button
              class="bg-transparent hover:bg-red-400 text-red-400 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded-md"
              onClick={() => {
                submit();
                setUsingFilter(!usingFilter);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      {!usingFilter && (
        <div className="text-center">
          <button
            className="bg-transparent hover:bg-red-400 text-red-400 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded-md"
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
export default DesktopFilter;