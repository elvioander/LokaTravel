import React from "react";

import { Cormorant_Garamond } from "next/font/google";

const myFont = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const ElegantText = ({ children }) => {
  return (
    <p
      className={`${myFont.className} text-[42px] text-center leading-[1] tracking-tight font-bold px-4`}
    >
      {children}
    </p>
  );
};

export default ElegantText;
