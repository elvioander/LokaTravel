import React from "react";

import Link from "next/link";

const Sidebar = ({ onSignOut }) => {
  return (
    <div className="border w-[35vw] bg-white border-gray-300 shadow-md rounded-lg p-3 flex flex-col gap-y-2 items-start">
      <Link href="/profile" className="px-3 py-1">
        My Profile
      </Link>
      <Link href="/my-trip" className="px-3 py-1">
        My Trip
      </Link>
      <button className="text-red-500 font-bold px-3 py-1" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
