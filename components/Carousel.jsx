import React from "react";

import Image from "next/image";
import Link from "next/link";

import carouselImage1 from "@/public/images/carousel1.jpg";
import carouselImage2 from "@/public/images/carousel2.jpeg";
import carouselImage3 from "@/public/images/carousel3.jpg";
import carouselImage4 from "@/public/images/carousel4.jpg";
import carouselImage5 from "@/public/images/carousel5.jpg";
import carouselImage6 from "@/public/images/carousel6.jpg";

const Carousel = () => {
  const items = [
    {
      id: 1,
      title: "Culture",
      content: "Discover rich cultural heritage.",
      src: carouselImage1,
    },
    {
      id: 2,
      title: "Amusement Parks",
      content: "Exciting parks for all ages.",
      src: carouselImage2,
    },
    {
      id: 3,
      title: "Nature Preserve",
      content: "Explore protected natural wonders.",
      src: carouselImage3,
    },
    {
      id: 4,
      title: "Nautical",
      content: "Sail through stunning islands.",
      src: carouselImage4,
    },
    {
      id: 5,
      title: "Shopping Center",
      content: "Shop at vibrant districts.",
      src: carouselImage5,
    },
    {
      id: 6,
      title: "Worship Place",
      content: "Visit sacred religious sites.",
      src: carouselImage6,
    },
  ];

  return (
    <div className="relative">
      <div className="overflow-x-auto flex snap-x snap-mandatory scrollbar-hide space-x-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="snap-center shrink-0 w-[80vw] flex items-center justify-center overflow-hidden"
          >
            <div>
              <Image
                src={item.src}
                className="object-cover object-center h-[30vh]"
                alt="Carousel Image 2"
              />
              <div className="mt-4">
                <p className="text-[22px] font-medium">{item.title}</p>
                <p className="text-[16px] leading-tight mt-1">{item.content}</p>
              </div>
              <Link href="destination">
                <button className="mt-12 px-3 py-2 border border-[#c6c6c6]">
                  View all locations
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
