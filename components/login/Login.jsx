"use client";

import React from "react";
import Image from "next/image";

import logoImg from "@/public/images/LokaTravel.png";
import { Cancel01Icon, GoogleIcon } from "hugeicons-react";
import Legal from "./Legal";

import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";

const Login = ({ onMenuClick }) => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="h-screen w-full bg-white px-16 py-12 fixed top-0 bottom-0 z-30">
      <Image src={logoImg} alt="LokaTravel Logo" width={50} height={50} />
      <div className="flex flex-col mt-4">
        <h2 className="font-semibold text-3xl ">
          Sign in to unlock the best of LokaTravel.
        </h2>
        <div className="flex flex-col mt-8 gap-y-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="border-2 border-black rounded-full w-full px-4 py-2 font-medium flex gap-x-3"
              >
                <GoogleIcon />
                <p>Continue with {provider.name}</p>
              </button>
            ))}
        </div>
        <div className="mt-8">
          <Legal />
        </div>
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
