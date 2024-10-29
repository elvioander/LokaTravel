import React from "react";

import Image from "next/image";

import { StarIcon, HeartAddIcon } from "hugeicons-react";
import Rating from "./Rating";

const PlaceSection = ({ places, title, type, children }) => {
  return (
    <div className="relative px-4">
      <p className="font-medium text-2xl mb-1">{title}</p>
      <p className="mb-4">{children}</p>
      <div className="overflow-x-auto flex snap-x snap-mandatory scrollbar-hide space-x-2">
        {!type
          ? places.map((place) => (
              <div
                key={place._id}
                className="snap-center shrink-0 w-[60vw] flex items-center justify-center overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src="/images/carousel1.jpg"
                    className="object-cover object-center aspect-[5/4] rounded-lg"
                    alt={place.Place_Name}
                    width={400}
                    height={400}
                  />
                  <div className="mt-4 absolute bottom-2 left-4">
                    <p className="text-[22px] text-white font-bold">
                      {place.Place_Name}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : places.map((place) => (
              <div
                key={place._id}
                className="snap-center shrink-0 w-[60vw] overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src="/images/carousel1.jpg"
                    className="object-cover object-center aspect-square rounded-lg"
                    alt={place.Place_Name}
                    width={400}
                    height={400}
                  />
                  <div className="bg-white rounded-full p-2 absolute top-2 right-2">
                    <HeartAddIcon />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-lg font-bold">{place.Place_Name}</p>
                  <Rating rating={place.Rating} />
                  <p className="text-xs mt-2 font-medium">
                    From Rp.{new Intl.NumberFormat("id-ID").format(place.Price)}{" "}
                    per adult
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PlaceSection;
