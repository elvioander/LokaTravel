"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import MainHeader from "@/components/main-header/MainHeader";

const SearchPage = () => {
  const router = useRouter();
  const query = useSearchParams().get("q");

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    const setInitialSearch = () => {
      setSearch(query);
    };
    setInitialSearch();
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/places/search?q=${query}`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <MainHeader
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col w-full relative px-4">
        <p className="text-xl mt-28 font-semibold">
          Top results matching "{query}"
        </p>
        <div className="mt-4 flex flex-col gap-y-4">
          {posts &&
            posts.map((post) => (
              <Link href={`/places/${post._id}`} className="flex gap-x-2">
                <Image
                  src="/images/carousel1.jpg"
                  width={135}
                  height={135}
                  className="aspect-square object-cover rounded-lg"
                  alt={post.Place_Name}
                />
                <div className="flex flex-col items-start">
                  <div className="px-2 py-1 uppercase text-xs border border-black rounded-lg font-medium">
                    {post.Category}
                  </div>
                  <p className="font-medium mt-2">{post.Place_Name}</p>
                  <p className="text-sm text-gray-600">
                    {post.City}, Indonesia
                  </p>
                  <p>{post.Category}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};

export default SearchPage;
