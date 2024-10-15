"use client";
import React from "react";

import Image from "next/image";

import { useSession } from "next-auth/react";

import logoImg from "@/public/images/LokaTravel.png";
import { Search01Icon, UserIcon } from "hugeicons-react";
import { handleSignOut } from "@/app/actions/authActions";

const MainHeader = ({ showSearchBar, isMenuActive, onMenuClick }) => {
  const { data: session } = useSession();
  console.log(`session is: ${session}`);
  return (
    <nav className="flex fixed w-full  top-0 bg-white z-20 items-center justify-between p-4 shadow-sm">
      <div href="/" className="flex gap-x-2 items-center">
        <Image src={logoImg} alt="LokaTravel logo" width={45} height={45} />
        {showSearchBar ? (
          <p className="font-black text-3xl">LokaTravel</p>
        ) : (
          <div className="flex items-center w-full gap-x-3 rounded-full border border-gray-300 px-3 py-2">
            <Search01Icon width={20} height={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full focus:outline-none"
            />
          </div>
        )}
      </div>
      {!session ? (
        <button
          className="rounded-full border border-[#d8d8d8] p-3"
          onClick={() => onMenuClick(!isMenuActive)}
        >
          <UserIcon size={20} />
        </button>
      ) : (
        <form action={handleSignOut}>
          <p>{session.user.name}</p>
          <button type="submit" href="#" className="font-semibold">
            Sign Out
          </button>
        </form>
      )}
    </nav>
  );
};

export default MainHeader;
