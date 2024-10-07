import React from "react";

import ElegantText from "@/components/ElegantText";
import Carousel from "@/components/Carousel";

const Hero = () => {
  return (
    <section className="flex flex-col w-full h-[100dvh] relative">
      <main className="mt-32">
        <h1 className="uppercase font-regular text-center mb-4 text-sm">
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
  );
};

export default Hero;
