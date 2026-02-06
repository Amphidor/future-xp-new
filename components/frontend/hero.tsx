"use client";

import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section
      className="
        relative w-full 
        min-h-[calc(100vh-80px)] 
        bg-cover bg-center
      "
      style={{ backgroundImage: "url(/frontend/hero-img.png)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"  />

      {/* Content */}
      <div
        className="
          relative max-w-7xl mx-auto 
          px-4 sm:px-6 lg:px-8 
          min-h-[calc(100vh-60px)]  /* match section height */
          flex flex-col items-center justify-center lg:justify-center
          text-center
        "
      >
        <h1
          className="
            text-[36px] md:text-[42px] lg:text-[72px] 
            font-regular text-white mt-3 sm:mt-4 md:mt-6 
            text-balance
          "
        >
          Explore Your Future - Find careers and majors that fit your vibe
        </h1>

        {/* <p
          className="
            text-[20px] sm:text-[22px] lg:text-[24px] 
            text-white/90 
            mb-6 sm:mb-8 md:mb-12 
            font-semibold 
            max-w-xl sm:max-w-4xl 
            text-balance
           pt-[180px] sm:pt-0

          "
        >
          Your fast-track to German for work, study, and daily life
        </p>

        <button
          className="
            bg-[#2A8F5E] hover:bg-[#238450] 
            text-white 
            px-5 sm:px-7 md:px-8 
            py-2.5 sm:py-3 
            rounded-full 
            font-semibold 
            flex items-center gap-1.5 sm:gap-2 
            text-sm sm:text-base
            transition 
            mt-6 sm:mt-10 md:mt-2
            md:mb-4
            lg:mb-6
            mb-12
            shadow-md
          "
          onClick={() => router.push("/#waitlist")}
        >
          GET EARLY ACCESS
          <span className="text-lg sm:text-xl">
            <ArrowUpRight />
          </span>
        </button> */}
      </div>
    </section>
  );
}
