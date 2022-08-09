import UseModal from "@/utils/hooks/UseModal";
import Modal from "antd/lib/modal/Modal";
import DropdowItem from "./DropdowItem";
import {FiLogOut, FiSettings, FiUser} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logOut } from "@/api/service/auth.service";
import { useRef, useEffect,useState } from "react";
import { useRouter } from "next/router";

const Dropdow = ({id,...props}) => {
  const [isShowing, toggle] = useState(false)
  const dropdownMenuRef = useRef(null);



  // hook active when active change
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target)
      ) {
        if (isShowing) toggle(false);
      }
    };
    // add click even for page
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      // remove click even for page !importan need remove
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [isShowing]);

  const router = useRouter();
  const MENUS = [
  {
    title: "profile",
    onclick: () => {
      router.push(`/dashboard/user/${id}`)
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
      <div ref={dropdownMenuRef} className="relative">
        <div
          id="dropdownDefault"
          
          onClick={() => {
            
            toggle((prev) => !prev);
            console.log("show dropdown", isShowing);
            
          }}
          // onclick={toggle}
          data-dropdown-toggle="dropdown"
          className="menu hover:cursor-pointer mr-6 hidden h-16 w-16 overflow-hidden rounded-full border border-slate-800 lg:flex"
        >
          <img
            className="aspect-square object-contain"
            src="/Image/logo.png"
            alt="Đây là Logo"
            fallback="Đây là Logo"
          />
        </div>
          <div>
            <div
              id="dropdown"
              className={`top-26 absolute mt-1 w-[300px] translate-x-[-80%] transform  flex-col space-y-4 rounded-lg bg-slate-100 p-4 shadow-lg
                          ${ isShowing ? "flex" : "hidden"}`}
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
        
      </div>
    );
  }

export default Dropdow;