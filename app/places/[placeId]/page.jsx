"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import MainHeader from "@/components/main-header/MainHeader";
import Rating from "@/components/Rating";
import OperatingTime from "@/components/OperatingTime";
import MainFooter from "@/components/main-footer/MainFooter";
import Description from "@/components/Description";

import {
  Location03Icon,
  RoadLocation02Icon,
  Time02Icon,
} from "hugeicons-react";

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

  const [location, setLocation] = useState(null);
  const [distanceDuration, setDistanceDuration] = useState(null);
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          getDistanceFromApi(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const getDistanceFromApi = async (latitude, longitude) => {
    try {
      const response = await fetch("/api/places/locate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: { lat: latitude, lng: longitude },
          destination: { lat: post.Lat, lng: post.Long },
        }),
      });

      const data = await response.json();
      setDistanceDuration(data);
    } catch (error) {
      console.error("Error fetching distance:", error);
    }
  };
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
        <div className="px-4 mt-8">
          <div className="border border-gray-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-xl p-2">
            <p className="text-2xl font-bold">About</p>
            <Description id={1} text={post.Description} />
          </div>
        </div>
        <div className="w-full px-4 mt-8">
          <div className="text-lg">
            <p className="font-medium">Distance & Duration</p>
            <div className="flex gap-x-4 text-base mt-2">
              <RoadLocation02Icon />
              <p>
                {distanceDuration ? `${distanceDuration.distance}` : "? KM"}
              </p>
            </div>
            <div className="flex gap-x-4 text-base mt-1">
              <Time02Icon />
              <p>
                {" "}
                {distanceDuration
                  ? `${distanceDuration.duration}`
                  : "? Hrs (estimated)"}
              </p>
            </div>
          </div>
          <button
            onClick={getUserLocation}
            className="bg-black mt-6 text-white rounded-full py-4 text-center w-full font-medium"
          >
            Locate Me
          </button>
        </div>
        <MainFooter />
      </section>
    </>
  );
};

export default DetailsPage;
