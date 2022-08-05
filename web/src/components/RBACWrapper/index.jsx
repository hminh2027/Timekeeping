import { selectUserPermissions } from "@/redux/feature/user/userSlice";
import React from "react";
import { useSelector } from "react-redux";

const RBACWrapper = ({ children, requiredPermissions }) => {
  // const requiredPermissions = requiredPermissions || [];
  const userPermission = useSelector(selectUserPermissions);
  console.log({ userPermission, requiredPermissions });
  console.log(userPermission.includes(requiredPermissions));

  const res = requiredPermissions
    .map((requiredPermission) => userPermission.includes(requiredPermission))
    .every((a) => a === true);
  if (res) {
    return <>{children}</>;
  } else return;
};

export default RBACWrapper;
