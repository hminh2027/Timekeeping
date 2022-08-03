import React, { useState, useEffect } from "react";
import UseModal from "@/utils/hooks/UseModal";
import Modal from "@/components/Common/Modal";
import CreateUser from "@/components/page/admin/users/FunctionUserModal";
import { usePostUserMutation } from "@/rest/user/user.query";

const DesktopFilter = (props) => {
  const UserData = {
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
  }
  const [data, setData] = useState({
    search: "",
  });
  const { isShowing, toggle } = UseModal();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = () => {
    props.onSubmit(data);
  };
  return (
    <div className={`flex w-full bg-white p-4 ${props.className}`}>
      <div className="flex w-full flex-row justify-between gap-4">
        <div className="flex flex-row gap-8">
          <div className="mx-auto flex w-[92%] items-center rounded-full border hover:shadow-md md:w-full">
            <div class="pl-5">
              {/* <svg
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
              </svg> */}
            </div>
            <input
              className="w-full rounded-full bg-transparent py-[10px] pl-4 outline-none"
              type="text"
              name="search"
              placeholder="search"
              value={data.search}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="text-right">
          <button
            className="rounded-md border border-red-400 bg-transparent py-2 px-4 font-semibold text-red-400 hover:border-transparent hover:bg-red-400 hover:text-white"
            onClick={() => {
              submit();
            }}
          >
            Find
          </button>
          <button
            className="ml-2 rounded-md border border-blue-400 bg-transparent py-2 px-4 font-semibold text-blue-400 hover:border-transparent hover:bg-blue-400 hover:text-white"
            onClick={toggle}
          >
            Create
          </button>
          <Modal isShowing={isShowing} hide={toggle}>
            <div className="flex">
              <CreateUser hide={toggle} click="Create" userData={UserData} Name="CREATE UER"/>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
const MobileFilter = (props) => {
  const UserData = {
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
  }
  const { isShowing, toggle } = UseModal();
  const [usingFilter, setUsingFilter] = useState(false);
  const [data, setData] = useState({
    search: "",
  });

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
            <div className="flex w-full items-center">
              <div className="mx-auto flex w-[92%] items-center rounded-full border bg-slate-50 hover:shadow-md md:w-full">
                <input
                  className="w-full rounded-full bg-transparent py-[10px] pl-4 outline-none"
                  type="text"
                  name="search"
                  placeholder="search"
                  value={data.search}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              className="rounded-md border border-red-400 bg-transparent py-2 px-4 font-semibold text-red-400 hover:border-transparent hover:bg-red-400 hover:text-white"
              onClick={() => {
                submit();
              }}
            >
              Find
            </button>
            <button
            className="ml-2 rounded-md border border-blue-400 bg-transparent py-2 px-4 font-semibold text-blue-400 hover:border-transparent hover:bg-blue-400 hover:text-white"
            onClick={toggle}
            >
              Create
            </button>
            <Modal isShowing={isShowing} hide={toggle}>
              <div className="flex">
                <CreateUser hide={toggle} click="Create" userData={UserData} Name="CREATE UER"/>
              </div>
            </Modal>
          </div>
        </div>
      )}
      {!usingFilter && (
        <div className="text-center">
          <button
            className="rounded-md border border-red-400 bg-transparent py-2 px-4 font-semibold text-red-400 hover:border-transparent hover:bg-red-400 hover:text-white"
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
