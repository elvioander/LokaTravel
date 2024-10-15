import React from "react";

const Legal = () => {
  return (
    <>
      <p className="text-center text-sm">
        By proceeding, you agree to our{" "}
        <a href="#" className="underline font-semibold">
          Terms of Use
        </a>{" "}
        and confirm you have read our{" "}
        <a href="#" className="underline font-semibold">
          Privacy and Cookie Statement
        </a>
      </p>
      <p className="mt-4 text-sm">
        This site is protected by reCAPTCHA and the{" "}
        <a href="#" className="underline font-semibold">
          Google Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline font-semibold">
          Terms of Service
        </a>{" "}
        apply
      </p>
    </>
  );
};

export default Legal;
