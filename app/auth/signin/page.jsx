"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";

import Image from "next/image";

import logoImg from "@/public/images/LokaTravel.png";
import Legal from "@/components/login/Legal";
import { handleCredentialsSignin } from "@/app/actions/authActions";
import ErrorMessage from "@/components/ErrorMessage";

const SignIn = () => {
  const form = useForm({
    // Specify that we're going to use Zod for form data validation
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const result = await handleCredentialsSignin(values);
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-white px-16 py-12">
      <Image src={logoImg} alt="LokaTravel Logo" width={50} height={50} />
      <div className="flex flex-col mt-4">
        <h2 className="font-semibold text-2xl">Welcome back.</h2>
        <form
          action="#"
          className="mt-8"
          control={form.control}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="off"
              className="border-2 border-[#b3b3b3] rounded-lg text-lg px-2 py-1 focus:outline-none focus:border-black transition ease-in duration-150 w-full mt-2"
              placeholder="Email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <ErrorMessage error={form.formState.errors.email.message} /> // Show validation error
            )}
          </div>
          <div className="mt-4 mb-4">
            <label htmlFor="email" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              className="border-2 border-[#b3b3b3] rounded-lg text-lg px-2 py-1 focus:outline-none focus:border-black transition ease-in duration-150 w-full mt-2"
              placeholder="Password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <ErrorMessage error={form.formState.errors.password.message} /> // Show validation error
            )}
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
