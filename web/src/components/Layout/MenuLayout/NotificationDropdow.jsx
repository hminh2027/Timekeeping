import {IoIosNotificationsOutline} from "react-icons/io";
import {HiBell} from "react-icons/hi"
import { useState, useEffect, useRef } from "react";
import { useGetMeNotificationQuery } from "@/rest/notification/notification.query";
import NotificationItem from "./NotificationItem";
import { useGetMeQuery } from "@/rest/auth/auth.query";

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
            <div className="text-white p-1 w-[25px] h-[25px]  text-sm text-center bg-red-500 rounded-full absolute top-0 right-0 ">
              <p className="font-semibold text-gray-100">{ListNotification?.length}</p>
            </div>
            :
            <div></div>
            }
            <div 
                className="m-y-1 p-4 hover:cursor-pointer bg-slate-200 hover:bg-slate-300 rounded-full"
                id="dropdownDefault"
                onClick={() => {
                console.log("show dropdown");
                toggle((prev) => !prev);
                }}
                data-dropdown-toggle="dropdown"
            >
                <HiBell className="text-slate-700 " size={"30px"}/> 
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