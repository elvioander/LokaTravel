"use client";
import React, { useState } from "react";

import {
  Home01Icon,
  Image02Icon,
  Tree07Icon,
  TwitterIcon,
  DropletIcon,
  ShoppingBag01Icon,
  ChurchIcon,
} from "hugeicons-react";

const Carousel = () => {
  // Set default selected item (first button selected by default)
  const [selectedItem, setSelectedItem] = useState(0);

  const items = [
    {
      id: 0,
      title: "Search All",
      src: <Home01Icon />,
    },
    {
      id: 1,
      title: "Culture",
      src: <Image02Icon />,
    },
    {
      id: 2,
      title: "Amusement Parks",
      src: <Tree07Icon />,
    },
    {
      id: 3,
      title: "Nature Preserve",
      src: <TwitterIcon />,
    },
    {
      id: 4,
      title: "Nautical",
      src: <DropletIcon />,
    },
    {
      id: 5,
      title: "Shopping Center",
      src: <ShoppingBag01Icon />,
    },
    {
      id: 6,
      title: "Worship Place",
      src: <ChurchIcon />,
    },
  ];

  return (
    <div className="relative">
      <div className="overflow-x-auto flex scrollbar-hide space-x-2">
        {items.map((item) => (
          <button
            key={item.id}
            // Conditionally apply border-b and border-black based on selectedItem state
            className={`shrink-0 flex items-center justify-center overflow-hidden pb-4 ${
              selectedItem === item.id
                ? "border-b border-black"
                : "border-b border-white"
            }`}
            // Set selected item on click
            onClick={() => setSelectedItem(item.id)}
          >
            <div className="flex items-center gap-x-1 mr-2">
              {item.src}
              <p className="font-medium">{item.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
