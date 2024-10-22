"use client";
import React, { useState, useRef, useEffect } from "react";

import ElegantText from "@/components/ElegantText";
import Carousel from "@/components/Carousel";
import SearchBar from "@/components/SearchBar";
import Slider from "@/components/Slider";
import MainFooter from "@/components/main-footer/MainFooter";
import MainHeader from "@/components/main-header/MainHeader";
import Login from "@/components/login/Login";
import PlaceSection from "@/components/PlaceSection";

import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

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

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };
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

  const [culturePosts, setCulturePosts] = useState([]);
  const [nauticalPosts, setNauticalPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  useEffect(() => {
    const fetchCulturePosts = async () => {
      const cultureResponse = await fetch(`/api/places/culture`);
      const cultureData = await cultureResponse.json();
      setCulturePosts(cultureData);
    };
    const fetchNauticalPosts = async () => {
      const nauticalResponse = await fetch(`/api/places/nautical`);
      const nauticalData = await nauticalResponse.json();
      setNauticalPosts(nauticalData);
    };
    const fetchTopPosts = async () => {
      const topResponse = await fetch(`/api/places/top-rated`);
      const topData = await topResponse.json();
      setTopPosts(topData);
    };
    fetchCulturePosts();
    fetchNauticalPosts();
    fetchTopPosts();
  }, []);

  return (
    <>
      <MainHeader
        showSearchBar={isSearchBarVisible}
        isMenuActive={isMenuClicked}
        onMenuClick={setIsMenuClicked}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col w-full relative">
        <main className="mt-28">
          <div className="px-6 flex flex-col gap-y-4">
            <Slider />
            <div ref={searchBarRef}>
              <SearchBar
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
              />
            </div>
          </div>
          <h1 className="uppercase font-regular text-center mb-4 mt-6 text-sm">
            Discover Smarter, Explore Further
          </h1>
          <ElegantText>
            Think beyond the journey. Think The Art of LokaTravel®
          </ElegantText>
          <div className="mt-12 px-4"></div>
          <div className="px-4 mt-12">
            <div className="border-b border-black w-full" />
          </div>
        </main>
        <div className="flex flex-col gap-y-12 mt-6">
          <PlaceSection
            places={culturePosts}
            title="Ready to explore rich cultural treasures?"
          >
            Discover a handpicked collection of cultural gems that celebrate
            Indonesia's rich heritage.
          </PlaceSection>
          <PlaceSection
            places={nauticalPosts}
            title="Set sail to uncover hidden nautical wonders!"
          >
            Explore a curated selection of nautical treasures that highlight
            Indonesia's vibrant maritime legacy.
          </PlaceSection>
          <PlaceSection
            places={topPosts}
            title="Top experiences on Lokatravel"
            type="top"
          />
        </div>
      </section>
      <MainFooter />

      {isMenuClicked && <Login onMenuClick={setIsMenuClicked} />}
    </>
  );
};

export default Hero;
