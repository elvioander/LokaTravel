import React from "react";
import { ArrowRight01Icon } from "hugeicons-react";

const OperatingTime = ({ openHour, closeHour }) => {
  // Ensure openHour and closeHour are defined before using them
  if (!openHour || !closeHour) {
    return (
      <div className="px-4 w-full flex items-center justify-between">
        <p className="text-gray-500">Operating hours unavailable</p>
      </div>
    );
  }

  // Get current time in hours and minutes
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Convert openHour and closeHour to hours and minutes
  const [openHourTime, openMinuteTime] = openHour.split(".").map(Number);
  const [closeHourTime, closeMinuteTime] = closeHour.split(".").map(Number);

  // Check if the current time is within operating hours
  const isOpenNow =
    (currentHour > openHourTime ||
      (currentHour === openHourTime && currentMinute >= openMinuteTime)) &&
    (currentHour < closeHourTime ||
      (currentHour === closeHourTime && currentMinute < closeMinuteTime));

  return (
    <div className="px-4 w-full flex items-center justify-between">
      <div>
        {isOpenNow ? (
          <p className="font-bold text-green-500">Open now</p>
        ) : (
          <p className="font-bold text-red-500">Close now</p>
        )}
        <p>
          {openHour} - {closeHour}
        </p>
      </div>
      <ArrowRight01Icon />
    </div>
  );
};

export default OperatingTime;
