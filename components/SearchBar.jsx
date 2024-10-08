import React from "react";

import { Search01Icon } from "hugeicons-react";

const SearchBar = () => {
  return (
    <form
      action="#"
      className="border border-gray-300 shadow-md rounded-lg p-6"
    >
      <div className="flex w-full gap-x-4 items-center">
        <Search01Icon width={20} height={20} />
        <input
          type="text"
          placeholder="Places to go, things to do, parks..."
          className="w-full focus:outline-none"
        />
      </div>
      <button className="mt-4 py-3 bg-[#34BEE0] w-full rounded-full font-medium">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
