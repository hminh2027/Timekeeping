import React from "react";

const RBACWrapper = (props) => {
  const requiredRoles = props.requiredRoles || [];
  const userRoles = props.roles || [];
  // const fallback = props.fallback || (
  //   <div className="text-center">No permission</div>
  // );
  if (userRoles.includes(...requiredRoles)) {
    return <div>{props.children}</div>;
  } else return;
};

export default RBACWrapper;
