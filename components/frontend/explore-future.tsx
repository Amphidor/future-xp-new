"use client";

import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExploreFuture() {
  const router = useRouter();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20">
      <div
        className="
        "
      >
        <div
          className="">
          {/* Left Content */}
          <div className="w-full text-center lg:text-center">
            <h2
              className="md:leading-[1.15] mb-2 text-3xl md:text-5xl lg:text-[44px] font-bold text-gray-900 !leading-[1.6]"
            >Explore Future Careers and Majors in Teen Language
            </h2>

            <p
              className="
                text-sm sm:text-base md:text-lg 
                text-[#7f7f7f]
                mb-[60px]
                leading-relaxed
              "
            >
              Every card offers your child a quick, clear view of a career
            </p>

            <div className="flex justify-evenly items-center mb-14">
              <h6 className="border-solid border-[3.5px] border-[#001075] rounded-[8px] w-[280px] h-[80px] m-auto flex items-center justify-center text-[18px] font-medium">Pay Range</h6>
              <h6 className="border-solid border-[3.5px] border-[#EFBF04] rounded-[8px] w-[320px] h-[80px] m-auto flex items-center justify-center text-[18px]  font-medium">What You Actually Do</h6>
            </div>

            <div className="mb-14">
              <h6 className="border-solid border-[3.5px] border-[#0033B5] w-[280px] h-[80px] m-auto flex items-center justify-center rounded-[8px] text-[18px] font-medium">Personality + Interest Fit</h6>
            </div>

            <div className="flex justify-evenly items-center">
              <h6 className="border-solid border-[3.5px] border-[#8500B5] rounded-[8px] w-[300px]  h-[80px] m-auto flex items-center justify-center text-[18px] font-medium"> Education + Classes Needed</h6>
              <h6 className="border-solid border-[3.5px] border-[#00B5BE] rounded-[8px] w-[340px]  h-[80px] m-auto pt-[8px] text-[18px] font-medium">Job Outlook <span className="block">
                (growing, declining, emerging)</span></h6>
            </div>


            <div className="text-center mt-[90px]">
              <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-8 py-3 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center m-auto text-[18px]"
                onClick={() => router.push('/#waitlist')}>
                Start Right Now <img src="/frontend/arrow.png" className="w-[20px]" />
              </button>
            </div>
          </div>

          {/* Right Image */}

        </div>
      </div>
    </section>
  );
}
