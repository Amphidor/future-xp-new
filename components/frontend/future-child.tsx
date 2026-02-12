'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function FutureChild() {
  const router = useRouter();


  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20">
      <h2 className="md:leading-[1.15] text-center text-[38px] lg:text-[38px] font-bold text-gray-700 font-semibold !leading-[1.6]">
        Your Child’s Future Starts With One Swipe
      </h2>

      <p
        className="
                text-sm sm:text-base md:text-lg 
                text-[#7f7f7f]
                leading-relaxed
                 mb-[60px]
                 text-center
              "
      >
        No exams. No pressure. Just explore.
      </p>

      <div className="flex items-center gap-[180px] justify-center">
        <div className="text-center">
          <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-16 py-5 rounded-[10px] font-medium transition m-auto text-[18px]"
            onClick={() => router.push('/#waitlist')}>
            Scan the QR Code
          </button>
        </div>

        <div className="text-center">
          <button className="bg-[#FFAE41] hover:bg-[#084A85] text-white px-20 py-5 rounded-[10px] font-medium transition m-auto text-[18px]"
            onClick={() => router.push('/#waitlist')}>
            Sign Up Free
          </button>
        </div>

      </div>


    </section>
  )
}
