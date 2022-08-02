import UseModal from "@/utils/hooks/UseModal";
import Modal from "antd/lib/modal/Modal";
import DropdowItem from "./DropdowItem";
import {FiLogOut, FiSettings, FiUser} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logOut } from "@/api/service/auth.service";


const Dropdow = () => {
    const { isShowing, toggle } = UseModal();
    const dispatch = useDispatch();



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
        <div id="dropdownDefault" onClick={toggle} data-dropdown-toggle="dropdown" className="mr-6 hidden h-16 w-16 overflow-hidden rounded-full border border-slate-800 lg:flex">
            <img
            className="aspect-square object-contain"
            src="/Image/logo.png"
            alt="Đây là Logo"
            fallback="Đây là Logo"
            />
        </div>
        <div id="dropdown" className={
           `flex flex-col absolute top-26 mt-5 w-[300px] bg-white  transform translate-x-[-80%] rounded-lg shadow-lg p-4 space-y-4 ${isShowing ? "" : "hidden"}`}>
          <div className="flex flex-col space-y-2">
            {MENUS.map(menu=>(
              <DropdowItem title={menu.title} onclick={menu.onclick} icon={menu.icon}/>
            ))}
          </div>

        </div>
      </div>
    )
  }

export default Dropdow;