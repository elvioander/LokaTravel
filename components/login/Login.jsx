import React from "react";
import Image from "next/image";

import logoImg from "@/public/images/LokaTravel.png";
import { Cancel01Icon, GoogleIcon, Mail01Icon } from "hugeicons-react";
import LoginButton from "./LoginButton";

const Login = ({ onMenuClick }) => {
  return (
    <div className="h-screen w-full bg-white px-16 py-12 fixed top-0 bottom-0 z-30">
      <Image src={logoImg} alt="LokaTravel Logo" width={50} height={50} />
      <div className="flex flex-col mt-4">
        <h2 className="font-semibold text-3xl ">
          Sign in to unlock the best of LokaTravel.
        </h2>
        <div className="flex flex-col mt-8 gap-y-4">
          <LoginButton icon={GoogleIcon}>Continue with Google</LoginButton>
          <LoginButton icon={Mail01Icon}>Continue with email</LoginButton>
        </div>
        <p className="text-center mt-8 text-sm">
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
            Google Privacy Policy and{" "}
            <a href="#" className="underline font-semibold">
              Terms of Service
            </a>{" "}
            apply
          </a>
        </p>
      </div>
      <button
        className="absolute z-30 right-6 top-6"
        onClick={() => onMenuClick(false)}
      >
        <Cancel01Icon />
      </button>
    </div>
  );
};

export default Login;
