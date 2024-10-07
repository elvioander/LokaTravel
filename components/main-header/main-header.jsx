import React from "react";

import Image from "next/image";
import Link from "next/link";

import logoImg from "@/public/images/LokaTravel.png";
import { Menu09Icon } from "hugeicons-react";

const MainHeader = () => {
  return (
    <nav className="flex fixed w-full  top-0 bg-white items-center justify-between p-4 shadow-sm">
      <a href="/">
        <Image src={logoImg} alt="LokaTravel logo" width={53} height={53} />
      </a>
      <button className="rounded-full border border-[#d8d8d8] p-3">
        <Menu09Icon size={20} />
      </button>
    </nav>
  );
};

export default MainHeader;
