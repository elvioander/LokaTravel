import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div
      className="flex w-full mt-1 text-sm text-red-800 rounded-lg"
      role="alert"
    >
      <span className="sr-only">Error</span>
      <div>*{error}</div>
    </div>
  );
};

export default ErrorMessage;
