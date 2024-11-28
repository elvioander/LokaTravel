"use client";
import React, { useState, useRef, useEffect } from "react";

import ElegantText from "@/components/ElegantText";
import Carousel from "@/components/Carousel";
import SearchBar from "@/components/SearchBar";
import Slider from "@/components/Slider";
import MainFooter from "@/components/main-footer/MainFooter";
import MainHeader from "@/components/main-header/MainHeader";
import Login from "@/components/login/Login";
import PlaceSection from "@/components/PlaceSection";

import { useRouter } from "next/navigation";

import Link from "next/link";

const AboutUs = () => {
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
          <p className="text-lg xl:text-3xl font-semibold">
            LokaTravel adalah platform web rekomendasi tempat wisata lokal yang
            didesain khusus untuk mendukung promosi dan pemasaran produk UMKM di
            Indonesia
          </p>
          <p className="text-gray-400 mt-8 text-left">
            Diluncurkan tahun 2024, Platform ini hadir untuk memberikan solusi
            cerdas bagi wisatawan lokal dan internasional dalam mencari tempat
            wisata yang menarik. LokaTravel tidak hanya menawarkan kemudahan
            dalam menemukan lokasi wisata, tetapi juga memadukan teknologi
            rekomendasi berbasis kecerdasan buatan untuk memberikan saran
            perjalanan yang optimal dan sesuai dengan preferensi pengguna.
          </p>
          <Link
            href="/"
            className="flex justify-center items-center w-full sm:w-64 sm:mx-auto  rounded-full text-center py-2 bg-blue-500 text-white font-medium mt-12"
          >
            Jelajahi Lokatravel
          </Link>
        </main>
        <div className="lg:grid lg:grid-cols-2 gap-x-4 items-start lg:px-8">
          <div className="rounded-lg border border-gray-100 shadow-md px-4 py-2 mt-8">
            <p className="text-center font-medium text-xl">Visi Kami</p>
            <p className="mt-4 text-gray-400">
              LokaTravel berkomitmen menjadi platform rekomendasi wisata lokal
              terdepan yang menghubungkan wisatawan dengan keindahan
              destinasi-destinasi yang belum tereksplor di Indonesia, serta
              meningkatkan perekonomian daerah dan memperkaya pengalaman wisata
              bagi setiap pengguna.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 shadow-md px-4 py-2 mt-8">
            <p className="text-center font-medium text-xl">Misi Kami</p>
            <p className="mt-4 text-gray-400">
              1. Menyediakan solusi wisata yang cerdas melalui teknologi
              berbasis kecerdasan buatan untuk memberikan rekomendasi tempat
              wisata dan rute perjalanan terbaik sesuai preferensi pengguna.{" "}
              <br />
              <br /> 2. Meningkatkan aksesibilitas informasi wisata dengan
              menyediakan platform yang mudah digunakan, lengkap, dan terpercaya
              untuk wisatawan dalam negeri maupun mancanegara. <br />
              <br /> 3. Menyajikan pengalaman wisata yang personal dengan fitur
              ulasan, rating, dan rekomendasi yang membantu wisatawan
              merencanakan perjalanan yang lebih bermakna dan menyenangkan.{" "}
            </p>
          </div>
        </div>
        <p className="text-gray-400 text-center px-8 lg:px-32 mt-12">
          Website ini dikembangkan oleh Elvio Anderson dengan bimbingan dari Ibu
          Irene Lazarusli, sebagai bagian dari penelitian untuk mendukung
          perkembangan sektor pariwisata dan UMKM di Indonesia.
        </p>
      </section>
      <MainFooter />
    </>
  );
};

export default AboutUs;
