import React from "react";

const Rating = ({ rating }) => {
  // Determine the total number of circles (5 in this case)
  const maxRating = 5;

  return (
    <div className="flex items-center gap-x-2 mt-1">
      <div className="flex gap-x-[0.15rem]">
        {[...Array(maxRating)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index < rating ? "bg-[#34BEE0]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="leading-none">{rating}</p>
    </div>
  );
};

export default Rating;
