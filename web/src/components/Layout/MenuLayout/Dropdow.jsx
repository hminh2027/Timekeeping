import UseModal from "@/utils/hooks/UseModal";
import Modal from "antd/lib/modal/Modal";
import DropdowItem from "./DropdowItem";
import {FiLogOut, FiSettings, FiUser} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logOut } from "@/api/service/auth.service";
import { useRef, useEffect,useState } from "react";

const Dropdow = () => {
  const [isShowing, toggle ] = useState(false)
  const dispatch = useDispatch();
  const dropdownMenuRef = useRef(null);

// useEffect(() => {

//   const handleOutsideClick = (e) => {
//     if (
//       dropdownMenuRef.current &&
//       !dropdownMenuRef.current.contains(e.target)
//     ) {
//       if (isShowing) toggle(false);
//     }
//   };
//   // add click even for page
//   document.addEventListener("click", handleOutsideClick, false);
//   return () => {
//     // remove click even for page !importan need remove
//     document.removeEventListener("click", handleOutsideClick, false);
//   };
// }, [isShowing]);

  const MENUS = [
  {
    title: "profile",
    onclick: () => {
      console.log("profile")
    },
    icon: <FiUser size={"20px"}/>
  },
  {
    title:"setting",
    onclick: ()=>{
      console.log("setting")
    },
    icon: <FiSettings size={"20px"}/>
  },
  {
    title:"logout",
    onclick:async ()=>{
      console.log("logout......")
      await logOut();
    },
    icon: <FiLogOut size={"20px"}/>
  }
]
    return (
      <div className="relative">
        <div
          id="dropdownDefault"
          onClick={() => {
            console.log("show dropdown");
            toggle((prev) => !prev);
          }}
          data-dropdown-toggle="dropdown"
          className="hover:cursor-pointer mr-6 hidden h-16 w-16 overflow-hidden rounded-full border border-slate-800 lg:flex"
        >
          <img
            className="aspect-square object-contain"
            src="/Image/logo.png"
            alt="Đây là Logo"
            fallback="Đây là Logo"
          />
        </div>
        <div
          id="dropdown"
          className={`top-26 absolute mt-5 flex w-[300px] translate-x-[-80%] transform  flex-col space-y-4 rounded-lg bg-slate-100 p-4 shadow-lg ${
            isShowing ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col space-y-2">
            {MENUS.map((menu) => (
              <DropdowItem
                title={menu.title}
                onclick={menu.onclick}
                icon={menu.icon}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

export default Dropdow;