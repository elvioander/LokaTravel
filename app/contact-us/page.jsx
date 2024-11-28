"use client";
import React, { useState, useRef, useEffect } from "react";

import MainHeader from "@/components/main-header/MainHeader";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Mail01Icon, Call02Icon } from "hugeicons-react";
import MainFooter from "@/components/main-footer/MainFooter";

const ContactUs = () => {
  const router = useRouter();

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const searchBarRef = useRef(null);

  const [isMenuClicked, setIsMenuClicked] = useState(false);
  useEffect(() => {
    if (isMenuClicked) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling again
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuClicked]);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSearchBarVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (searchBarRef.current) {
      observer.observe(searchBarRef.current);
    }

    return () => {
      if (searchBarRef.current) {
        observer.unobserve(searchBarRef.current);
      }
    };
  }, []);

  return (
    <>
      <MainHeader
        showSearchBar={isSearchBarVisible}
        isMenuActive={isMenuClicked}
        onMenuClick={setIsMenuClicked}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col w-full relative pb-12">
        <main className="mt-28 text-center px-6 lg:px-32 xl:px-64">
          <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

          <div className="rounded-lg border border-gray-100 shadow-md px-4 py-6 mb-12">
            <p className="text-lg text-gray-600 mb-6">
              Terima kasih atas minat Anda pada LokaTravel! Kami selalu senang
              mendengar dari Anda, baik itu pertanyaan, saran, atau masukan
              mengenai layanan kami. Tim kami siap membantu Anda untuk
              memberikan pengalaman terbaik dalam menjelajahi dan menemukan
              destinasi wisata lokal yang sesuai dengan preferensi Anda.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Jika Anda memiliki pertanyaan atau memerlukan bantuan, jangan ragu
              untuk menghubungi kami melalui salah satu saluran berikut:
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex items-center justify-start gap-4 bg-gray-100 p-6 rounded-lg">
              <Mail01Icon className="text-blue-500" width={40} height={40} />
              <div>
                <h3 className="font-semibold text-xl text-left lg:text-center">
                  Email
                </h3>
                <p className="text-gray-600">elvioander3@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center justify-start gap-4 bg-gray-100 p-6 rounded-lg">
              <Call02Icon className="text-blue-500" width={40} height={40} />
              <div>
                <h3 className="font-semibold text-xl text-left lg:text-center">
                  Telepon
                </h3>
                <p className="text-gray-600">+62 895-0338-5562</p>
              </div>
            </div>
          </div>
        </main>
      </section>
      <MainFooter />
    </>
  );
};

export default ContactUs;
