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
        <div className="flex flex-wrap items-center">
          <div className="mx-5 flex w-40 items-center">
            <Image
              className=""
              src="/Image/logo.png"
              width={250}
              height={100}
              alt="Đây là Logo"
              fallback="Đây là Logo"
            />
          </div>

          <div className="">
            <div className="text-3xl font-semibold">
              Hello {userInfo.lastName} {userInfo.firstName}!
            </div>
            <div className="underline">Role: {userInfo.role}</div>
          </div>
        </div>
        <div className="flex overflow-hidden border rounded-full border-slate-800">
          <Image
            className=""
            src="/Image/logo.png"
            width={60}
            height={60}
            alt="Đây là Logo"
            fallback="Đây là Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
