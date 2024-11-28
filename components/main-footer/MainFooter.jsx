import React from "react";

import Link from "next/link";

import {
  Facebook02Icon,
  InstagramIcon,
  NewTwitterIcon,
  PinterestIcon,
} from "hugeicons-react";

import Image from "next/image";

import LokaTraveLogo from "@/public/images/LokaTravel.png";

const MainFooter = () => {
  return (
    <footer className="w-full mt-12 bg-[#f2f2f2] p-7">
      <div className="flex flex-col gap-y-1">
        <p className="font-medium text-xl">About LokaTravel</p>
        <Link href="/about-us">About Us</Link>
        <p>Blog</p>
      </div>
      <div className="flex flex-col gap-y-1 mt-4">
        <p className="font-medium text-xl">Help and Guide</p>
        <Link href="/contact-us">Contact</Link>
        <p>Terms & Conditions</p>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <form className="mt-8">
        <select
          name="language"
          id="language"
          className="text-xl w-full px-3 py-2 rounded-xl border border-gray-500 focus:outline-none appearance-none"
        >
          <option value="en">English</option>
          <option value="id">Indonesia</option>
        </select>
      </form>
      <div className="flex w-full justify-end mt-4">
        <div className="flex items-center gap-x-3">
          <Facebook02Icon width={25} height={25} />
          <NewTwitterIcon width={25} height={25} />
          <PinterestIcon width={25} height={25} />
          <InstagramIcon width={25} height={25} />
        </div>
      </div>
      <div className="mt-8 flex items-center gap-x-2">
        <Image
          src={LokaTraveLogo}
          alt="LokaTravel Logo"
          width={50}
          height={50}
        />
        <p className="font-medium">
          &#174; 2024 LokaTravel <br /> all rights reserved
        </p>
      </div>
      <p className="text-sm mt-4 text-justify">
        This is the version of our website addressed to Indonesian speakers in
        Indonesia. If you are a resident of another country or region, please
        select the appropriate English language version for your country or
        region in the drop-down menu.
      </p>
    </footer>
  );
};

export default MainFooter;
