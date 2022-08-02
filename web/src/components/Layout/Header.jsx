import { logOut } from "@/api/service/auth.service";
import { selectUserInfo } from "@/redux/feature/user/userSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="shadow-black-500/40 z-20 flex max-h-28 w-full items-center bg-[#ffffff]  py-7 shadow-md ">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-wrap items-center gap-4 px-4 lg:gap-0">
          <div className="mx-5 hidden w-40 items-center lg:flex">
            <Image
              className=""
              src="/Image/logo.png"
              width={250}
              height={100}
              alt="Đây là Logo"
              fallback="Đây là Logo"
            />
          </div>
          <div className="flex h-12 w-12 overflow-hidden rounded-full border border-slate-800 lg:hidden">
            <img
              className="aspect-square object-contain"
              src="/Image/logo.png"
              // width={1}
              // height={1}
              // layout="responsive"
              alt="Đây là Logo"
              fallback="Đây là Logo"
            />
          </div>
          <div className="">
            <div className="text-xl font-semibold lg:text-3xl">
              Hello {userInfo.lastName} {userInfo.firstName}!
            </div>
            <div className="underline">Role: {userInfo.role}</div>
          </div>
        </div>
        <div className=" hidden h-16 w-16 overflow-hidden rounded-full border border-slate-800 lg:flex">
          <img
            className="aspect-square object-contain"
            src="/Image/logo.png"
            // width={1}
            // height={1}
            // layout="responsive"
            alt="Đây là Logo"
            fallback="Đây là Logo"
          />
        </div>
      </div>
    </div>
  );
};

const dropdow = () => {
  return (
    <>
    
      <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
      <div id="dropdown" class="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 block" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(289px, 70px);">
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
            <li>
              <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
            </li>
          </ul>
      </div>

    </>
  )
}

export default Header;
