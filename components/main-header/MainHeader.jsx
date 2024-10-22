"use client";
import React from "react";

import Image from "next/image";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import { useParams, useSearchParams, usePathname } from "next/navigation";

import logoImg from "@/public/images/LokaTravel.png";
import { Search01Icon, UserIcon } from "hugeicons-react";

const MainHeader = ({
  showSearchBar,
  isMenuActive,
  onMenuClick,
  search,
  setSearch,
  handleSearch,
}) => {
  const { data: session } = useSession();
  const path = usePathname();
  const params = useSearchParams();
  return (
    <nav className="flex fixed w-full  top-0 bg-white z-20 items-center justify-between p-4 shadow-sm">
      <div className="flex gap-x-2 items-center">
        <Link href="/">
          <Image
            src={logoImg}
            alt="LokaTravel logo"
            className="flex-grow"
            width={45}
            height={45}
          />
        </Link>
        {showSearchBar && path !== "/search" ? (
          <Link href="/" className="font-black text-3xl">
            LokaTravel
          </Link>
        ) : (
          <form
            onSubmit={handleSearch}
            className="flex flex-grow items-center w-full gap-x-3 rounded-full border border-gray-300 px-3 py-2"
          >
            <button type="submit">
              <Search01Icon width={20} height={20} />
            </button>
            <input
              type="text"
              placeholder="Search"
              className="w-full focus:outline-none"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
        )}
      </div>
      {!session?.user ? (
        <button
          className="rounded-full border border-[#d8d8d8] p-3"
          onClick={() => onMenuClick(!isMenuActive)}
        >
          <UserIcon size={20} />
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={session?.user.image}
            width={40}
            height={40}
            className="rounded-full"
          />
          <button onClick={signOut} className="text-red-500 font-bold">
            Sign-Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default MainHeader;
