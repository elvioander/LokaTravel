"use client";
import React, { useState, useRef, useEffect } from "react";

import ElegantText from "@/components/ElegantText";
import Carousel from "@/components/Carousel";
import SearchBar from "@/components/SearchBar";
import Slider from "@/components/Slider";
import MainFooter from "@/components/main-footer/MainFooter";
import MainHeader from "@/components/main-header/main-header";
import Login from "@/components/login/Login";

const Hero = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const searchBarRef = useRef(null);

  const [isMenuClicked, setIsMenuClicked] = useState(false);
  useEffect(() => {
    if (isMenuClicked) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling again
    }

    return () => {
      document.body.style.overflow = "auto"; // Clean up on component unmount
    };
  }, [isMenuClicked]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSearchBarVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (searchBarRef.current) {
      observer.observe(searchBarRef.current);
    }

    return () => {
      if (searchBarRef.current) {
        observer.unobserve(searchBarRef.current);
      }
    };
  }, []);

  return (
    <>
      <MainHeader
        showSearchBar={isSearchBarVisible}
        isMenuActive={isMenuClicked}
        onMenuClick={setIsMenuClicked}
      />
      <section className="flex flex-col w-full relative">
        <main className="mt-28">
          <div className="px-6 flex flex-col gap-y-4">
            <Slider />
            <div ref={searchBarRef}>
              <SearchBar />
            </div>
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

      {isMenuClicked && <Login onMenuClick={setIsMenuClicked} />}
    </>
  );
};

export default Hero;
