"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  ArrowRight02Icon,
  PlusSignIcon,
} from "hugeicons-react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const page = ({ params }) => {
  const { data: session } = useSession();

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

  console.log(session?.user.id);

  const [trips, setTrips] = useState(null);
  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(`/api/places/trip/${params.userId}`);
      const data = await response.json();
      setTrips(data);
    };
    fetchTrips();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    try {
      const response = await fetch("/api/places/trip", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tripId }),
      });

      if (response.ok) {
        // Remove the deleted trip from the state
        setTrips(trips.filter((trip) => trip._id !== tripId));
      } else {
        console.error("Failed to delete trip");
        alert("Failed to delete trip");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("An error occurred while deleting the trip");
    }
  };
  return (
    <>
      <MainHeader
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col w-full relative pb-8">
        <div className="mt-28 px-4 flex items-center space-x-4">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">
              {session?.user?.name || "User Profile"}
            </h1>
            <p className="text-gray-600">{session?.user?.email}</p>
          </div>
        </div>
        <div className="mt-28 sm:mt-16 px-4 flex items-center justify-between">
          <h2 className="font-bold text-3xl ">My Trips</h2>
          <Link href="#" className="flex items-center">
            <p className="text-blue-600">See all</p>
            <ArrowRight01Icon color="#2563eb" width={20} height={20} />
          </Link>
        </div>

        {!trips || trips.length === 0 ? (
          <p className="px-4 mt-4">You haven't planned a trip just yet.</p>
        ) : (
          trips.map((trip, index) => (
            <div
              key={trip._id}
              className="px-4 mx-4 mt-3 bg-blue-400 text-white p-3 rounded-xl relative"
            >
              <p className="text-xl font-semibold">Trip #{index + 1}</p>

              <div className="mt-4">
                <p className="font-medium">Locations:</p>
                <div className="flex flex-wrap gap-x-2 mt-2">
                  {trip.selectedLocations.map((l, index) => (
                    <p key={index} className="flex items-center gap-x-2">
                      <span className="font-medium">{l.Place_Name}</span>{" "}
                      {index !== trip.selectedLocations.length - 1 && (
                        <ArrowRight02Icon />
                      )}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium">Optimal Route:</p>
                <div className="flex flex-wrap gap-x-2 mt-2">
                  {trip.optimalRoute.map((l, index) => (
                    <p key={index} className="flex items-center gap-x-2">
                      <span className="font-medium">
                        {trip.selectedLocations[l].Place_Name}
                      </span>{" "}
                      {index !== trip.optimalRoute.length - 1 && (
                        <ArrowRight02Icon />
                      )}
                    </p>
                  ))}
                </div>
              </div>

              {/* Add delete button */}
              <button
                onClick={() => handleDeleteTrip(trip._id)}
                className="absolute top-3 right-4 text-red-500 bg-white rounded-lg px-3 py-1 hover:text-red-200"
              >
                Delete
              </button>
            </div>
          ))
        )}

        <Link href="/my-trip/plan" className="w-full px-4 mt-4">
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
