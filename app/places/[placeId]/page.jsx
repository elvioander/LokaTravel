"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import MainHeader from "@/components/main-header/MainHeader";
import Rating from "@/components/Rating";

import { Location03Icon } from "hugeicons-react";
import OperatingTime from "@/components/OperatingTime";
import MainFooter from "@/components/main-footer/MainFooter";
import Description from "@/components/Description";

const DetailsPage = ({ params }) => {
  const placeId = params.placeId;

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

  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/places/${placeId}`);
      const data = await response.json();
      setPost(data);
    };
    fetchPost();
  }, []);
  return (
    <>
      <MainHeader
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col w-full relative">
        <h2 className="mt-28 font-bold text-3xl px-4">{post.Place_Name}</h2>
        <div className="mt-2 flex items-center gap-x-2 px-4">
          <Rating rating={post.Rating} />
          <p>-</p>
          <div className="flex items-center gap-x-1">
            <Location03Icon />
            <p className="font-medium">{post.City}, Indonesia</p>
          </div>
        </div>
        <p className="mt-2 px-4 text-gray-500">
          #<span>{post.Category}</span>
        </p>
        <p className="mt-4 font-medium underline px-4">Write a review</p>
        <div className="mt-4">
          <OperatingTime
            openHour={post.Opening_Hours}
            closeHour={post.Closed_Hours}
          />
        </div>
        <Image
          src="/images/carousel1.jpg"
          alt={`${post.Description} pictures`}
          width={1080}
          height={1920}
          className="mt-8"
        />
        <div className="w-full px-4 mt-8">
          <div className="text-lg">
            <p className="font-medium">Tours & experiences</p>
            <p>Explore different ways to experience this place.</p>
          </div>
          <button className="bg-black mt-6 text-white rounded-full py-4 text-center w-full font-medium">
            See options
          </button>
        </div>
        <div className="px-4 mt-8">
          <p className="text-2xl font-bold">About</p>
          <Description id={1} text={post.Description} />
        </div>
        <MainFooter />
      </section>
    </>
  );
};

export default DetailsPage;
