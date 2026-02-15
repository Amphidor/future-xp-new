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
                mb-8 md:mb-[60px]
                leading-relaxed
              "
            >
              Every card offers your child a quick, clear view of a career
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:justify-evenly items-stretch mb-8 md:mb-14">
              <h6 className="border-solid border-[3.5px] border-[#001075] rounded-[8px] w-full max-w-[280px] min-h-[72px] md:h-[80px] flex items-center justify-center text-base md:text-[18px] font-medium px-2">Pay Range</h6>
              <h6 className="border-solid border-[3.5px] border-[#EFBF04] rounded-[8px] w-full max-w-[320px] min-h-[72px] md:h-[80px] flex items-center justify-center text-base md:text-[18px] font-medium px-2">What You Actually Do</h6>
            </div>

            <div className="mb-8 md:mb-14 flex justify-center">
              <h6 className="border-solid border-[3.5px] border-[#0033B5] w-full max-w-[280px] min-h-[72px] md:h-[80px] flex items-center justify-center rounded-[8px] text-base md:text-[18px] font-medium px-2">Personality + Interest Fit</h6>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:justify-evenly items-stretch">
              <h6 className="border-solid border-[3.5px] border-[#8500B5] rounded-[8px] w-full max-w-[300px] min-h-[72px] md:h-[80px] flex items-center justify-center text-base md:text-[18px] font-medium px-2">Education + Classes Needed</h6>
              <h6 className="border-solid border-[3.5px] border-[#00B5BE] rounded-[8px] w-full max-w-[340px] min-h-[80px] md:h-[80px] flex items-center justify-center pt-2 md:pt-[8px] text-base md:text-[18px] font-medium px-2">Job Outlook <span className="block">(growing, declining, emerging)</span></h6>
            </div>


            <div className="text-center mt-10 md:mt-[90px]">
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
