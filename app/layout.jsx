import React from "react";

import { Roboto } from "next/font/google";

import "./globals.css";

import MainHeader from "@/components/main-header/main-header";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "LokaTravel",
  description:
    "Discover top tourist attractions in Indonesia with personalized recommendations and optimize your travel routes for a seamless experience.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${roboto.className} relative`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
