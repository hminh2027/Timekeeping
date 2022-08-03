import {GrNotification} from "react-icons/gr";
import { useState, useEffect, useRef } from "react";
import { useGetMeNotificationQuery } from "@/rest/notification/notification.query";
import NotificationItem from "./NotificationItem";
import { useGetMeQuery } from "@/rest/auth/auth.query";
import DropdowItem from "./DropdowItem";
const NotificationDropdow = (props) => {
  const [isShowing, toggle] = useState(false)
  const dropdownMenuRef = useRef(null);
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
    const {data: ListNotification} = useGetMeNotificationQuery(); 
    const {data: Auth} = useGetMeQuery();
    console.log("ListNOTIFICATION", ListNotification)
    return (
        <div ref={dropdownMenuRef} className="mr-3 text-right relative">
            { ListNotification?.length > 0 ?
            <div className="text-base text-center text-black h-6 w-6 border-2 bg-red-300 border-solid border-red-500 rounded-full absolute top-o right-0">
                {ListNotification?.length}
            </div>
            :
            <div></div>
            }
            <div 
                className="p-1 hover:cursor-pointer"
                id="dropdownDefault"
                onClick={() => {
                console.log("show dropdown");
                toggle((prev) => !prev);
                }}
                data-dropdown-toggle="dropdown"
            >
                <GrNotification size={"45px"}/> 
            </div>
            <div
          id="dropdown"
          className={`top-26 absolute mt-5 flex w-[400px] translate-x-[-80%] transform  flex-col space-y-4 rounded-lg bg-slate-100 p-4 shadow-lg ${
            isShowing ? "" : "hidden"
          }`}
        >
          {
            ListNotification?.length > 0 ?
            <div className="flex flex-col space-y-2 h-[500px] overflow-auto">
              {ListNotification?.map((notification) => 
              (
                  <NotificationItem notification= {notification}/>
              ))}
            </div>
          : <div className="text-center text-3xl m-y-auto h-[50px]">No Notification</div>
          }
          
        </div>
            
        </div>
    
    )
}

export default NotificationDropdow;