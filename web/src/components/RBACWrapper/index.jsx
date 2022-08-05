import { selectUserPermissions } from "@/redux/feature/user/userSlice";
import React from "react";
import { useSelector } from "react-redux";

const RBACWrapper = React.memo(({ children, requiredPermissions }) => {
  const userPermission = useSelector(selectUserPermissions);

  const res = requiredPermissions
    .map((requiredPermission) => userPermission.includes(requiredPermission))
    .every((result) => result === true);
  // useMemo(() => first, [second]);
  return res ? <>{children}</> : <></>;
});

export default RBACWrapper;
