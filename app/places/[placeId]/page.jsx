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
import RatingComponent from "@/components/RatingComponent";
import Carousel from "./Carousel";

import {
  Location03Icon,
  RoadLocation02Icon,
  Time02Icon,
} from "hugeicons-react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

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

  const [cbf, setCbf] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/places/cbf/${placeId}`);
      const cbf = await response.json();
      setCbf(cbf);
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
  });

  const [map, setMap] = React.useState(null);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const center = {
    lat: post.Lat || 0,
    lng: post.Long || 0,
  };
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
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
            {console.log("Post is", post)}
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
        import Carousel from './Carousel'; // Import the Carousel component ...
        {post.Images && post.Images.length > 0 ? (
          <Carousel images={post.Images} /> // Use the Carousel component
        ) : (
          <Image
            src={"/images/carousel1.jpg"}
            alt={`${post.Description} pictures`}
            width={1080}
            height={1920}
            className="mt-8 object-cover object-top"
          />
        )}
        <div className="px-4 mt-8">
          <div className="border border-gray-300 shadow-[0_0_15px_rgba(0,0,0,0.3)] rounded-xl p-2">
            <p className="text-2xl font-bold">About</p>
            <Description id={1} text={post.Description} />
          </div>
        </div>
        <div className="px-4 mt-4">
          <h2 className="text-lg font-medium">Simillar Places</h2>
          <div className="overflow-x-auto flex snap-x snap-mandatory scrollbar-hide space-x-2">
            {cbf.map((c, index) => (
              <Link
                href={`/places/${c._id}`}
                key={index}
                className="border shrink-0 p-2 rounded-lg w-[75%]"
              >
                <Image
                  src={c.Images?.[0] || "/images/carousel1.jpg"}
                  width={120}
                  height={120}
                  alt={c.Plce_Name}
                  className="rounded-lg aspect-video object-cover w-full"
                />
                <p className="text-wrap mt-2 font-medium">{c.Place_Name}</p>
              </Link>
            ))}
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
          {isLoaded && (
            <div className="mt-6 rounded-lg overflow-hidden">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <Marker position={center} />
              </GoogleMap>
            </div>
          )}
        </div>
        <div className="mt-3 px-4">
          <RatingComponent placeId={placeId} />
        </div>
        <div className="mt-4 p-4 border rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-4">Ratings</h2>
          <div className="mt-4 p-4 border rounded-lg shadow-lg bg-white">
            {post && post.Ratings && post.Ratings.length > 0 ? (
              post.Ratings.map((rate, index) => (
                <div key={index} className="p-2 border-b last:border-b-0">
                  <div className="flex items-center gap-x-1">
                    <img
                      src={rate.User_Id?.image} // Assuming `profileImage` is the field in the User model
                      alt={`${rate.User_Id?.username}'s profile`}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-gray-800 font-medium">
                          {rate.User_Id?.username}{" "}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {new Date(rate.Created_At).toLocaleString("id-ID", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, // 12-hour format with AM/PM
                          })}
                        </span>
                      </div>
                      <span className="text-green-600 text-xl font-semibold">
                        {rate.Score}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">
                No ratings available.
              </div>
            )}
          </div>
        </div>
        <MainFooter />
      </section>
    </>
  );
};

export default DetailsPage;
