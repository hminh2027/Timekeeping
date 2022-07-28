import React, { useState, useEffect } from "react";
import { Button, Input, Select, Space } from "antd";
import api from "@/api/api";
import { ALL_TICKET_TYPES } from "@/utils/constants/ticket_constants";
const { Option } = Select;
const DesktopFilter = (props) => {
  const [ticketTypes, setTicketTypes] = useState(ALL_TICKET_TYPES);
  const [data, setData] = useState({
    title: "",
    type: "",
    status: "",
  });
  console.log("TICKET TYPE", ticketTypes);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log("DATA:", data);
  };
  const submit = () => {
    props.onSubmit(data);
  };
  return (
    <div className={`flex bg-white p-4 ${props.className}`}>
      <div className="flex w-full flex-row justify-between gap-4">
        <div className="flex flex-row gap-8">
          <div className="flex w-auto items-center gap-4">
            <div className="w-auto">Title:</div>
            <Input
              name="title"
              placeholder="Title"
              value={data.title}
              onChange={(e) => handleChange(e)}
              className="flex-1"
            />
          </div>

          <div className="flex w-auto items-center gap-4">
            <div className="w-auto">Type:</div>
            <Select
              value={data.type}
              onChange={(value, option) => {
                const e = { target: { name: "type", value: value } };
                handleChange(e);
              }}
              style={{ flex: "1 0 8em", minWidth: "8em" }}
              className="flex-1"
            >
              {ticketTypes.map(({label,value}) => (
                <Option value={value}>{label}</Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex w-80 flex-1 items-center gap-4">
              <div className="w-auto">Status:</div>
              <Select
                defaultValue="all"
                value={data.status}
                onChange={(value, option) => {
                  const e = { target: { name: "status", value: value } };
                  handleChange(e);
                }}
                className=" w-32"
                // className="flex-1"
                options={status}
              ></Select>
            </div>
            {/* <div className="flex w-auto  gap-2">
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
            </div> */}
          </div>
        </div>
        <div className="text-right">
          <button
            className="v-btn-primary"
            onClick={() => {
              submit();
            }}
          >
            Apply
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
      const data = ["", ...res.data];
      console.log("TICKET TYPE", data);
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
    <div className={`bg-paleGreen p-4  ${props.className}`}>
      {usingFilter && (
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center">
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

            <div className="flex  w-full items-center">
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
              <div className="flex w-full flex-1  items-center">
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

              <div className="flex w-full flex-1 flex-wrap gap-2">
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
            Filter
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
    value: "",
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
