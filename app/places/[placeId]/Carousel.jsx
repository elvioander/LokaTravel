import React, { useState, useEffect } from "react";
import Image from "next/image";

import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]); // Re-run when the currentIndex changes

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0"
            style={{ width: "100%" }}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={1080}
              height={1920}
              className="object-cover aspect-video"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute ml-2 left-0 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full shadow"
      >
        <ArrowLeft01Icon />
      </button>
      <button
        onClick={handleNext}
        className="absolute mr-2 right-0 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full shadow"
      >
        <ArrowRight01Icon />
      </button>
    </div>
  );
};

export default Carousel;
