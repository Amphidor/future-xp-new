'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"


export default function WhyItWorks() {
  const router = useRouter();
  const features = [

  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20">
      <h2 className="md:leading-[1.15] text-center text-[38px] lg:text-[38px] font-bold text-gray-700 font-semibold !leading-[1.6] mb-[60px]">
        Why it Works
      </h2>

      <div className="grid md:grid-cols-2 gap-40 mt-20">
        <div className="">
          <img src='/frontend/why-img.png' />
        </div>
        <div className="">

          <div className="flex items-center gap-[14px] mb-18">
            <img src='/frontend/one.png' className="w-[90px]" />
            <h6 className="text-[#7f7f7f] text-[16px]">Encourages curiosity, not stress or labeling</h6>
          </div>

          <div className="flex items-center gap-[14px] mb-18">
            <img src='/frontend/two.png' className="w-[100px]" />
            <h6 className="text-[#7f7f7f] text-[16px]">Backed by trusted, nationally recognized job market data</h6>
          </div>

          <div className="flex items-center gap-[14px] mb-18">
            <img src='/frontend/three.png' className="w-[100px]" />
            <h6 className="text-[#7f7f7f] text-[16px]">Built to speak teen language</h6>
          </div>

          <div className="flex items-center gap-[14px] mb-18">
            <img src='/frontend/four.png' className="w-[100px]" />
            <h6 className="text-[#7f7f7f] text-[16px]">Personal interest trends tracked over time + weekly dashboard highlights</h6>
          </div>

        </div>

      </div>

      <div className="text-center mt-[90px]">
        <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-8 py-3 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center m-auto text-[18px]"
          onClick={() => router.push('/#waitlist')}>
          Let's Get Started <img src="/frontend/arrow.png" className="w-[20px]" />
        </button>
      </div>
    </section>
  )
}
