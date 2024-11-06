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
  ArrowRight01Icon,
  PlusSignIcon,
} from "hugeicons-react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const page = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

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

  const [isPlanning, setIsPlanning] = useState(false);
  return (
    <>
      <MainHeader
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col w-full relative">
        <div className="mt-28 px-4 flex items-center justify-between">
          <h2 className="font-bold text-3xl ">My Trips</h2>
          <Link href="/my-trip/all" className="flex items-center">
            <p className="text-blue-600">See all</p>
            <ArrowRight01Icon color="#2563eb" width={20} height={20} />
          </Link>
        </div>
        <p className="px-4 mt-4">You haven't planned a trip just yet.</p>
        <Link href="/my-trip/plan" className="w-full px-4 mt-2">
          <div className="h-[30vh] border-4 border-black rounded-lg w-full flex flex-col items-center justify-center">
            <PlusSignIcon width={100} height={100} />
            <p>Plan a trip</p>
          </div>
        </Link>
      </section>
    </>
  );
};

export default page;
