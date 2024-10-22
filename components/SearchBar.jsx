"use client";
import React, { useState } from "react";

import { Search01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";

const SearchBar = ({ search, setSearch, handleSearch }) => {
  return (
    <form
      className="border border-gray-300 shadow-md rounded-lg p-6"
      onSubmit={handleSearch}
    >
      <div className="flex w-full gap-x-4 items-center">
        <Search01Icon width={20} height={20} />
        <input
          type="text"
          placeholder="Places to go, things to do, parks..."
          className="w-full focus:outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 py-3 bg-[#34BEE0] w-full rounded-full font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
