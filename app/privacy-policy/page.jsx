"use client";
import React, { useState, useRef, useEffect } from "react";
import MainHeader from "@/components/main-header/MainHeader";
import { useRouter } from "next/navigation";
import MainFooter from "@/components/main-footer/MainFooter";

const PrivacyPolicy = () => {
  const router = useRouter();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const searchBarRef = useRef(null);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  useEffect(() => {
    if (isMenuClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
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
        <main className="mt-28 text-center px-6 lg:px-24 xl:px-48">
          <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
            Kebijakan Privasi
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Selamat datang di LokaTravel. Privasi Anda sangat penting bagi kami.
            Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan,
            menggunakan, dan melindungi informasi pribadi Anda ketika
            menggunakan situs web kami. Dengan mengakses dan menggunakan layanan
            kami, Anda setuju dengan kebijakan ini.
          </p>

          <div className="text-left space-y-10 text-gray-700">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                1. Informasi Yang Kami Kumpulkan
              </h2>
              <p className="leading-loose">
                Kami mengumpulkan berbagai informasi untuk meningkatkan layanan
                kami, berupa informasi pribadi termasuk nama, alamat email, dan
                informasi lainnya yang Anda berikan secara langsung saat
                menggunakan layanan kami.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                2. Lokasi
              </h2>
              <p className="leading-loose">
                Jika Anda memberikan izin, kami dapat mengumpulkan data lokasi
                Anda untuk meningkatkan rekomendasi wisata berdasarkan lokasi
                dan jarak rute Anda.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                3. Keamanan Data
              </h2>
              <p className="leading-loose">
                Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami
                menggunakan teknologi enkripsi dan prosedur keamanan untuk
                menjaga integritas dan kerahasiaan data Anda. Namun, harap
                diingat bahwa tidak ada metode transmisi data melalui internet
                yang sepenuhnya aman.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                4. Hak Pengguna
              </h2>
              <p className="leading-loose">
                Sebagai pengguna memiliki hak untuk mengakses, memperbarui, atau
                menghapus informasi pribadi Anda. Pengguna juga memiliki hak
                untuk menghubungi kami jika Anda memiliki pertanyaan atau
                keluhan terkait dengan perlindungan data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                5. Perubahan Kebijakan
              </h2>
              <p className="leading-loose">
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke
                waktu. Jika ada perubahan signifikan, kami akan memberi tahu
                Anda melalui email atau pemberitahuan di situs kami. Kami
                menyarankan Anda untuk meninjau kebijakan ini secara berkala.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                6. Kontak Kami
              </h2>
              <p className="leading-loose">
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini,
                silakan hubungi kami melalui:
                <br />
                <span className="font-medium">
                  Elvio Anderson - Pengembang LokaTravel
                </span>
                <br />
                <a
                  href="mailto:elvioander3@gmail.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  elvioander3@gmail.com
                </a>
              </p>
            </div>
          </div>
        </main>
      </section>
      <MainFooter />
    </>
  );
};

export default PrivacyPolicy;
