import Avatar from "@/components/Avatar";
import React from "react";
import { FiCopy } from "react-icons/fi";
const RoleInfoCard = ({ name, avatars, className, onEdit, ...props }) => {
  return (
    <div className={`card flex flex-col gap-4 p-4 ${className}`}>
      <div className="flex justify-between">
        <div className="text-gray-600">Total 4 users</div>
        <div className="flex gap-[-2px]">
          {avatars.map((avatar) => (
            <div className="relative ml-[-8px] h-7 w-7 rounded-full border-2 border-white transition-all hover:z-50 hover:translate-y-[-4px] hover:scale-110 ">
              <Avatar url={avatar.url} name={avatar.name} className="" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-xl text-violet-900">{name}</div>
        <div className="flex w-full justify-between">
          <div
            className="cursor-pointer text-sm font-semibold text-violet-600"
            onClick={onEdit}
          >
            Edit Role
          </div>
          <div className="cursor-pointer text-xl hover:text-violet-600">
            <FiCopy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoCard;
