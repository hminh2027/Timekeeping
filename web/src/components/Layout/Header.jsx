import { logOut } from "@/api/service/auth.service";
import { selectUserInfo } from "@/redux/feature/user/userSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="flex z-20 items-center w-full max-h-28 py-7 bg-[#ffffff]  shadow-md shadow-black-500/40 ">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-wrap items-center">
          <div className="flex items-center w-40 mx-5">
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
      </div>
    </div>
  );
};

export default Header;
