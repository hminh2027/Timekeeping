import React, { useState, useEffect } from "react";
import { Button, Input, Select, Space } from "antd";
import api from "@/api/api";
import { TICKET_TYPES } from "@/utils/constants";
const { Option } = Select;

const DesktopFilter = (props) => {
  const [ticketTypes, setTicketTypes] = useState(TICKET_TYPES);

  console.log("TICKET_TYPES:", ticketTypes);
  const [data, setData] = useState({
    title: "",
    type: "",
    status: "",
  });

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });

    // console.log("DATA:", data);
  };
  const submit = () => {
    props.onSubmit(data);
  };
  return (
    <div className={`p-4 bg-white flex ${props.className}`}>
      <div className="flex flex-row justify-between w-full gap-4">
        <div className="flex flex-row gap-8">
          <div className="flex items-center w-auto gap-4">
            <div className="w-auto">Title:</div>
            <input
              name="title"
              placeholder="Title"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="flex-1 p-2 border input input-bordered rounded-none w-full max-w-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center w-auto gap-4">
            <div className="w-auto">Type:</div>
            <select
              onChange={(e) => {
                handleChange("type", e.target.value);
              }}
              style={{ flex: "1 0 8em", minWidth: "8em" }}
              className="flex-1 select select-bordered rounded-none w-full max-w-xs focus:border-none"
            >
              {ticketTypes &&
                ticketTypes.map((e, i) => (
                  <option key={i} value={e.value}>
                    {e.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center flex-1 gap-4 w-80">
              <div className="w-auto">Status:</div>
              <select
                value={data.status}
                onChange={(e) => {
                  // const e = { target: { name: "status", value: value } };
                  // handleChange(e);
                  handleChange("status", e.target.value);
                  console.log(e.target.value);
                }}
                className="w-40 select-md select select-bordered rounded-none max-w-xs focus:border-none"
              >
                {status.map((e, i) => (
                  <option
                    key={i}
                    value={e.value}
                    className="flex justify-between"
                  >
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-auto gap-2">
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
        <div className="text-right flex items-center ">
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
              <input
                placeholder="Title"
                name="title"
                value={data.title}
                // onChange={filter}
                // style={{ flex: "1 0 5em" }}
                className="flex-1 border border-gray-200 input-xs focus:outline-none"
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* Filter by type */}
            <div className="flex items-center w-full">
              <div className="w-20">Type:</div>
              <select
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
                  <option key={ticketType} value={ticketType}>
                    {ticketType}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="flex items-center flex-1 w-full">
                <div className="w-20">Status:</div>
                <select
                  name="status"
                  // defaultValue="all"
                  value={data.status}
                  className="flex-1"
                  onChange={(value, option) => {
                    const e = { target: { name: "status", value: value } };
                    handleChange(e);
                  }}
                >
                  {status.map((e) => (
                    <option key={e} value={e.value}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status description */}
              <div className="flex flex-wrap flex-1 w-full gap-2">
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
              className="v-btn-primary"
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
