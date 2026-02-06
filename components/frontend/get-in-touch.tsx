'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"


export default function GetInTouch() {
  const router = useRouter();
  const features = [

  ]

  return (
    <section className="bg-[#084A85] mt-[80px]">

      <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4 py-14 lg:pt-14">
        <h2 className="md:leading-[1.15] text-center text-[38px] lg:text-[38px] font-bold text-[#ffffff] font-semibold !leading-[1.6] mb-[20px]">
          Let’s Get in Touch
        </h2>

        <p className="text-[#ffffffc7] text-center !leading-[1.9]">Have an idea, a question, or a challenge you’d like to explore? We’d love to hear from you. At Future XP, we’re always open to <span className="block">collaborations, feedback, and new opportunities.</span></p>

        <div className="text-center mt-[60px] flex items-center justify-center gap-[100px]">

          <button className="bg-[#ffffff] hover:bg-[#ffffff] text-[#084A85] px-14 py-4 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center text-[18px]"
            onClick={() => router.push('/#waitlist')}>
            Start Here
          </button>

          <button className="bg-[#ffffff] hover:bg-[#ffffff] text-[#084A85] px-14 py-4 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center text-[18px]"
            onClick={() => router.push('/#waitlist')}>
            Contact Us
          </button>

        </div>
      </div>
    </section>
  )
}