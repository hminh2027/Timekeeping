import { logOut } from "@/api/service/auth.service";
import { selectUserInfo } from "@/redux/feature/user/userSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dropdow from "./MenuLayout/Dropdow";
import NotificationDropdow from "./MenuLayout/NotificationDropdow";

const Header = () => {
  const [isShowing, toggle] = useState(false)
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
        <div className="flex">
          <NotificationDropdow/>
          <Dropdow/>
        </div>
        
      </div>
    </div>
  );
};



export default Header;
