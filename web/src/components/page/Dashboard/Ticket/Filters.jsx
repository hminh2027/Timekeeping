import React, { useState, useEffect } from "react";
import { Button, Input, Select, Space } from "antd";
import api from "@/api/api";
const { Option } = Select;
const Filters = () => {};
const filter = () => {};

const DesktopFilter = (props) => {
  const [ticketTypes, setTicketTypes] = useState([]);
  useEffect(() => {
    const fetchTicketTypes = async () => {
      const res = await api.get("ticket/type");
      const { data } = res;
      setTicketTypes(data);
    };

    fetchTicketTypes();
  }, []);
  return (
    <div className={`p-4 bg-white flex ${props.className}`}>
      <div className="flex flex-row justify-between gap-4 w-full">
        <div className="flex flex-row gap-8">
          <div className="flex items-center w-auto gap-4">
            <div className="w-auto">Title:</div>
            <Input placeholder="Title" onChange={filter} className="flex-1" />
          </div>

          <div className="flex items-center w-auto gap-4">
            <div className="w-auto">Type:</div>
            <Select
              value={ticketTypes[0]}
              style={{ flex: "1 0 8em", minWidth: "8em" }}
              className="flex-1"
            >
              {ticketTypes.map((ticketType) => (
                <Option value={ticketType}>{ticketType}</Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-between flex-row">
            <div className="flex flex-1 items-center w-80 gap-4">
              <div className="w-auto">Status:</div>
              <Select
                defaultValue="all"
                className=" w-32"
                // className="flex-1"
                options={status}
              ></Select>
            </div>
            <div className="flex gap-2  w-auto">
              <div className="flex justify-between gap-1">
                <div className="">🟢</div>
                <div className="">Approved</div>
              </div>
              <div className="flex gap-1">
                <div className="">🔴</div>
                <div className="">Rejected</div>
              </div>
              <div className="flex gap-1">
                <div className="">🟡</div>
                <div className="">Pending</div>
              </div>
              <div className="flex gap-1">
                <div className="">⚪</div>
                <div className="">Cancel</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <button className="v-btn-primary">Apply</button>
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
      const { data } = res;
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
    <div className={`bg-paleGreen p-4  ${props.className}`}>
      {usingFilter && (
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full">
              <div className="w-20 ">Title:</div>
              <Input
                placeholder="Title"
                name="title"
                value={data.title}
                // onChange={filter}
                // style={{ flex: "1 0 5em" }}
                className="flex-1"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex  items-center w-full">
              <div className="w-20">Type:</div>
              <Select
                name="type"
                value={data.type}
                style={{ flex: "1 0 8em", minWidth: "8em" }}
                className="flex-1"
                onChange={(value, option) => {
                  const e = { target: { name: "type", value: value } };
                  handleChange(e);
                }}
              >
                {ticketTypes.map((ticketType) => (
                  <Option value={ticketType}>{ticketType}</Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="flex flex-1 items-center  w-full">
                <div className="w-20">Status:</div>
                <Select
                  name="status"
                  // defaultValue="all"
                  value={data.status}
                  className="flex-1"
                  options={status}
                  onChange={(value, option) => {
                    const e = { target: { name: "status", value: value } };
                    handleChange(e);
                  }}
                ></Select>
              </div>

              <div className="flex gap-2 flex-1 w-full flex-wrap">
                <div className="flex justify-between gap-1">
                  <div className="">🟢</div>
                  <div className="">Approved</div>
                </div>
                <div className="flex gap-1">
                  <div className="">🔴</div>
                  <div className="">Rejected</div>
                </div>
                <div className="flex gap-1">
                  <div className="">🟡</div>
                  <div className="">Pending</div>
                </div>
                <div className="flex gap-1">
                  <div className="">⚪</div>
                  <div className="">Cancel</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right ">
            <button
              class="v-btn-primary"
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
            className="v-btn-primary"
            onClick={() => setUsingFilter(!usingFilter)}
          >
            Filter nè
          </button>
        </div>
      )}
    </div>
  );
};
export { DesktopFilter, MobileFilter };
const status = [
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">All</div>
        <div className=""></div>
      </div>
    ),
    value: "all",
  },
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">Approved</div>
        <div className="">🟢</div>
      </div>
    ),
    value: "approved",
  },
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">Pending</div>
        <div className="">🟡</div>
      </div>
    ),
    value: "pending",
  },
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">Rejected</div>
        <div className="">🔴</div>
      </div>
    ),
    value: "rejected",
  },
  {
    label: (
      <div className="flex justify-between gap-1">
        <div className="">Cancelled</div>
        <div className="">⚪</div>
      </div>
    ),
    value: "cancelled",
  },
];
