"use client";

import React from "react";
import { useSession } from "next-auth/react";

import Link from "next/link";

const Sidebar = ({ onSignOut }) => {
  const { data: session } = useSession();
  return (
    <div className="border w-[35vw] bg-white border-gray-300 shadow-md rounded-lg p-3 flex flex-col gap-y-2 items-start">
      <Link href={`/my-trip/${session?.user.id}`} className="px-3 py-1">
        My Trip
      </Link>
      <button className="text-red-500 font-bold px-3 py-1" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
