import React from "react";

const LoginButton = ({ children, icon: Icon, href }) => {
  return (
    <button
      href={href}
      className="border-2 border-black rounded-full w-full px-4 py-2 font-medium flex gap-x-3"
    >
      {Icon && <Icon />}
      <p>{children}</p>
    </button>
  );
};

export default LoginButton;
