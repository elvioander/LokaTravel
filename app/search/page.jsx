"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import MainHeader from "@/components/main-header/MainHeader";
import Rating from "@/components/Rating";

const SearchPage = () => {
  const router = useRouter();
  const query = useSearchParams().get("q");

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    const setInitialSearch = () => {
      setSearch(query);
    };
    setInitialSearch();
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/places/search?q=${query}`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const isOpenNow = (openHour, closeHour) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Convert openHour and closeHour to hours and minutes
    const [openHourTime, openMinuteTime] = openHour.split(".").map(Number);
    const [closeHourTime, closeMinuteTime] = closeHour.split(".").map(Number);

    // Check if the current time is within operating hours
    const isOpenNow =
      (currentHour > openHourTime ||
        (currentHour === openHourTime && currentMinute >= openMinuteTime)) &&
      (currentHour < closeHourTime ||
        (currentHour === closeHourTime && currentMinute < closeMinuteTime));
    return isOpenNow;
  };

  return (
    <>
      <MainHeader
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col w-full relative px-4">
        <p className="text-xl mt-28 font-semibold">
          Top results matching "{query}"
        </p>
        <div className="mt-4 flex flex-col gap-y-4">
          {posts &&
            posts.map((post) => (
              <Link href={`/places/${post._id}`} className="flex gap-x-2">
                <Image
                  src="/images/carousel1.jpg"
                  width={135}
                  height={135}
                  className="aspect-square object-cover rounded-lg"
                  alt={post.Place_Name}
                />
                <div className="flex flex-col items-start">
                  <div className="flex gap-x-2">
                    <div className="px-2 py-1 uppercase text-xs border border-black rounded-lg font-medium">
                      {post.Category}
                    </div>
                    {isOpenNow(post.Opening_Hours, post.Closed_Hours) ? (
                      <p className="font-bold text-green-500">Open</p>
                    ) : (
                      <p className="text-red-500">Closed</p>
                    )}
                  </div>
                  <p className="font-medium mt-2">{post.Place_Name}</p>
                  <p className="text-sm text-gray-600">
                    {post.City}, Indonesia
                  </p>
                  <p className="text-sm mt-2">{post.Category}</p>
                  <Rating rating={post.Rating} />
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};

export default SearchPage;
