import React from "react";

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
        <p>About Us</p>
        <p>Blog</p>
      </div>
      <div className="flex flex-col gap-y-1 mt-4">
        <p className="font-medium text-xl">Help and Guide</p>
        <p>Contact Us</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
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
        This is the version of our website addressed to speakers of English in
        the United States. If you are a resident of another country or region,
        please select the appropriate version of Tripadvisor for your country or
        region in the drop-down menu. more
      </p>
    </footer>
  );
};

export default MainFooter;
