import { logOut } from "@/api/service/auth.service";
import { selectUserInfo } from "@/redux/feature/user/userSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="flex items-center w-full max-h-[56px] p-5 bg-gradient-to-r from-[#a5e3e3] to-[#b5e8e9]">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-wrap items-center">
          <div className="flex items-center w-40">
            <Image
              className=""
              src="/Image/logo.png"
              width={250}
              height={100}
              alt="Đây là Logo"
              fallback="Đây là Logo"
            />
          </div>

          <div className="flex-grow">
            <div className="text-3xl font-semibold">
              Hello {userInfo.lastName} {userInfo.firstName}
            </div>
            <div className="text-gray-500 ">Welcome back!</div>
          </div>
        </div>
        <button className="btn" onClick={async () => await logOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
