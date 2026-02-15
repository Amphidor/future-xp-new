'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function FutureChild() {
  const router = useRouter();


  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20">
      <h2 className="md:leading-[1.15] text-center text-2xl sm:text-3xl lg:text-[38px] font-bold text-gray-700 font-semibold !leading-[1.6]">
        Your Child’s Future Starts With One Swipe
      </h2>

      <p
        className="
                text-sm sm:text-base md:text-lg 
                text-[#7f7f7f]
                leading-relaxed
                 mb-8 md:mb-[60px]
                 text-center
              "
      >
        No exams. No pressure. Just explore.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-[180px] justify-center">
        <div className="text-center w-full sm:w-auto">
          <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-8 sm:px-16 py-4 sm:py-5 rounded-[10px] font-medium transition m-auto text-base sm:text-[18px] w-full max-w-[280px] sm:max-w-none"
            onClick={() => router.push('/#waitlist')}>
            Scan the QR Code
          </button>
        </div>

        <div className="text-center w-full sm:w-auto">
          <button className="bg-[#FFAE41] hover:bg-[#084A85] text-white px-8 sm:px-20 py-4 sm:py-5 rounded-[10px] font-medium transition m-auto text-base sm:text-[18px] w-full max-w-[280px] sm:max-w-none"
            onClick={() => router.push('/#waitlist')}>
            Sign Up Free
          </button>
        </div>

      </div>


    </section>
  )
}
