"use client";

import { ArrowRightIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";


export default function FavouriteInsight() {
  const router = useRouter();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20">

        <div
          className="">
          {/* Left Content */}
          <div className="w-full text-center lg:text-center">
            <h2
              className="md:leading-[1.15] mb-8 md:mb-[60px] text-3xl md:text-5xl lg:text-[44px] font-bold text-gray-900 !leading-[1.6]"
            >All Your Favorite Insights in One Place
            </h2>

            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:justify-evenly items-stretch mb-8 md:mb-14">

              <span className="border-solid border-[3.5px] border-[#AF0202] rounded-[8px] w-full max-w-[400px] mx-auto md:m-auto py-4 px-3">

                <h6 className="text-base md:text-base md:text-[18px] font-medium">Favorite Career List</h6>
                <p className="text-[#7f7f7f] text-[14px] leading-relaxed text-center font-medium pt-2">Careers your child keeps coming back to</p>

              </span>

              <span className="border-solid border-[3.5px] border-[#FDB201] rounded-[8px] w-full max-w-[400px] mx-auto md:m-auto py-4 px-3">

                <h6 className="text-base md:text-base md:text-[18px] font-medium">Interest Trends Over Time</h6>
                <p className="text-[#7f7f7f] text-[14px] leading-relaxed text-center font-medium pt-2">How interests grow, shift, or fade</p>

              </span>

            </div>

            <div className="w-full max-w-[400px] mx-auto border-solid border-[3.5px] border-[#084A85] py-4 rounded-[8px] px-3 mb-8 md:mb-0">

              <span className="m-auto">

                <h6 className="text-base md:text-base md:text-[18px] font-medium">Strengths Snapshot</h6>
                <p className="text-[#7f7f7f] text-[14px] leading-relaxed text-center font-medium pt-2">Skills and traits revealed through play</p>

              </span>

            </div>

            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:justify-evenly items-stretch mt-8 md:mt-14 mb-8 md:mb-14">

              <span className="border-solid border-[3.5px] border-[#AF0273] rounded-[8px] w-full max-w-[400px] mx-auto md:m-auto py-4 px-3">

                <h6 className="text-base md:text-base md:text-[18px] font-medium">Classes to Take + Majors to Explore</h6>
                <p className="text-[#7f7f7f] text-[14px] leading-relaxed text-center font-medium pt-2">High school classes and college majors linked to
                  favorite careers</p>

              </span>

              <span className="border-solid border-[3.5px] border-[#1FBB00] rounded-[8px] w-full max-w-[400px] mx-auto md:m-auto py-4 px-3">

                <h6 className="text-base md:text-[18px] font-medium">Friends’ Career Trends</h6>
                <p className="text-[#7f7f7f] text-[14px] leading-relaxed text-center font-medium pt-2">See what careers are popular with friends
</p>

              </span>

            </div>

            <div className="border-solid border-[3.5px] border-[#0015F6] w-full max-w-[480px] mx-auto rounded-[8px] py-4 px-3">
              <h6 className="text-base md:text-base md:text-[18px] font-medium">Progress & Recent Activity</h6>
              <p className="text-[#7f7f7f] text-[14px] leading-relaxed text-center font-medium pt-2">Badges, cards swiped, and scenario engagement at a glance
</p>
            </div>


            <div className="text-center mt-10 md:mt-[90px]">
              <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-8 py-3 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center m-auto text-[18px]"
                onClick={() => router.push('/#waitlist')}>
                Get Started <img src="/frontend/arrow.png" className="w-[20px]" />
              </button>
            </div>
          </div>

          {/* Right Image */}

        </div>
    </section>
  );
}
