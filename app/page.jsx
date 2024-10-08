import React from "react";

import ElegantText from "@/components/ElegantText";
import Carousel from "@/components/Carousel";
import SearchBar from "@/components/SearchBar";
import Slider from "@/components/Slider";
import MainFooter from "@/components/main-footer/MainFooter";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col w-full relative">
        <main className="mt-28">
          <div className="px-6 flex flex-col gap-y-4">
            <Slider />
            <SearchBar />
          </div>
          <h1 className="uppercase font-regular text-center mb-4 mt-6 text-sm">
            Discover Smarter, Explore Further
          </h1>
          <ElegantText>
            Think beyond the journey. Think The Art of LokaTravel®
          </ElegantText>
          <div className="mt-12 px-4">
            <Carousel />
          </div>
          <div className="px-4 mt-12">
            <div className="border-b border-black w-full" />
          </div>
        </main>
      </section>
      <MainFooter />
    </>
  );
};

export default Hero;
