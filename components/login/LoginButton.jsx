import React from "react";

const LoginButton = ({ children, icon: Icon }) => {
  return (
    <div className="border-2 border-black rounded-full w-full px-4 py-2 font-medium flex gap-x-3">
      {Icon && <Icon />}
      <p>{children}</p>
    </div>
  );
};

export default LoginButton;
