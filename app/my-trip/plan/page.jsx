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

import { Minimize01Icon } from "hugeicons-react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

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

  const [locations, setLocations] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [availableLocations, setAvailableLocations] = useState(null);
  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("/api/places/all");
      const data = await response.json();
      setAvailableLocations(data);
    };
    fetchLocations();
  }, []);
  const handleAddLocation = (location) => {
    setLocations([...locations, location]);
    setIsPopupOpen(false); // Close popup after selection
  };
  const handleRemoveLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const [submitting, setSubmitting] = useState(false);
  const saveTrip = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!session || !session.user) {
        throw new Error("Session not found");
      }
      console.log("user id:", session.user.id);
      console.log("locations:", locations);
      const fetchResponse = await fetch("/api/places/trip", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.id,
          tripLocations: locations,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      router.push(`/my-trip/${session?.user.id}`);
    }
  };
  return (
    <>
      <MainHeader
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col w-full relative h-screen">
        <div className="mt-28 px-4 flex items-center justify-between">
          <h2 className="font-bold text-3xl ">Create Trip</h2>
        </div>
        <ul className="mt-4 px-4">
          {locations.map((location, index) => (
            <li key={index} className="mb-2 flex gap-x-2">
              <p className="font-medium">{location.Place_Name}</p>
              <button
                className="text-red-500 font-medium"
                onClick={() => handleRemoveLocation(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form
          onSubmit={saveTrip}
          className="px-4 mt-4 flex justify-between items-center"
        >
          <button
            className="font-medium border border-black px-4 py-1 rounded-full"
            onClick={() => setIsPopupOpen(true)}
            type="button"
          >
            Add Location
          </button>
          {locations.length >= 2 && (
            <button
              type="submit"
              className="font-semibold bg-blue-500 px-3 py-1 rounded-xl text-white"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          )}
        </form>
        {availableLocations && isPopupOpen && (
          <LocationPopup
            availableLocations={availableLocations}
            onSelectLocation={handleAddLocation}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </section>
    </>
  );
};

function LocationPopup({ availableLocations, onSelectLocation, onClose }) {
  return (
    <div className="absolute top-1/2 left-1/2 transul -translate-x-1/2 -translate-y-1/2 p-3 border-2 border-gray-300 shadow-md rounded-xl w-[90vw] h-[45vh] overflow-hidden overflow-y-auto bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Select a Location</h3>
        <button onClick={onClose} className="text-red-500">
          Close
        </button>
      </div>
      <ul className="mt-3">
        {availableLocations.map((location, index) => (
          <li key={location.id} className="">
            <button
              className="text-lg font-medium text-start mb-2 text-blue-500"
              onClick={() => onSelectLocation(location)}
            >
              {location.Place_Name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
