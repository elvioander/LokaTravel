"use client";

import React from "react";

import Image from "next/image";

import logoImg from "@/public/images/LokaTravel.png";
import Legal from "@/components/login/Legal";

const SignIn = () => {
  return (
    <div className="w-full h-screen bg-white px-16 py-12">
      <Image src={logoImg} alt="LokaTravel Logo" width={50} height={50} />
      <div className="flex flex-col mt-4">
        <h2 className="font-semibold text-2xl ">Welcome back.</h2>
        <form action="#" className="mt-8">
          <div>
            <label htmlFor="email" className="font-semibold">
              Email address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="border-2 border-[#b3b3b3] rounded-lg text-lg px-2 py-1 focus:outline-none focus:border-black transition ease-in duration-150 w-full mt-2"
              placeholder="Email"
            />
          </div>
          <div className="mt-4 mb-4">
            <label htmlFor="email" className="font-semibold">
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className="border-2 border-[#b3b3b3] rounded-lg text-lg px-2 py-1 focus:outline-none focus:border-black transition ease-in duration-150 w-full mt-2"
              placeholder="Password"
            />
          </div>
          <a href="#" className="underline">
            Forgot password?
          </a>
          <button
            type="submit"
            className="text-white text-center py-3 bg-black rounded-full w-full mt-4"
          >
            Sign in
          </button>
        </form>
        <div className="flex gap-x-4 items-center text-[#b3b3b3] mt-4">
          <div className="border-b-2 flex-grow border-[#b3b3b3] rounded-full" />
          <p className="">Not a member?</p>
          <div className="border-b-2 flex-grow border-[#b3b3b3] rounded-full" />
        </div>
        <p className="text-center mt-4">
          <a href="#" className="underline font-semibold">
            Join
          </a>{" "}
          to unlock the best of LokaTravel.
        </p>
        <div className="mt-4">
          <Legal />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
