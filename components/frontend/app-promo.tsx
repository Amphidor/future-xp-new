'use client'

export default function AppPromo() {
  return (
    <section className="max-w-full  px-4 sm:px-6 lg:px-8 py-20 lg:py-0 lg:pb-24 relative" id="app-promo">
      {/* Headings */}
      <h2 className="tmd:leading-[1.15] text-center text-3xl md:text-5xl lg:text-[44px] font-bold text-gray-900 !leading-[1.6] mb-6">
        Learn German Your Way
      </h2>
      <p className="text-gray-500 text-center text-[16px] mb-2">
        With structure, authentic, dialogues, real-life topics, and a personal touch.
      </p>
      <p className="text-gray-500 text-center text-[16px] mb-10">
        Created by certified German teachers and digital learning experts. Based on the CEFR framework (A1–B2).
      </p>

      <div className="flex flex-wrap justify-center gap-4 md:gap-7 mb-12">
        <img src="/frontend/iPhonefirst.png" alt="App screen 1" className="h-auto w-[250px] rounded-[38px] shadow-2xl border-[6px] border-white bg-white" />
        <img src="/frontend/iphoneSecond.png" alt="App screen 2" className="h-auto w-[250px] rounded-[38px] shadow-2xl border-[6px] border-white bg-white" />
        <img src="/frontend/iPhone3.png" alt="App screen 3" className="h-auto w-[250px] rounded-[38px] shadow-2xl border-[6px] border-white bg-white" />
        <img src="/frontend/iPhone2.png" alt="App screen 4" className="h-auto w-[250px] rounded-[38px] shadow-2xl border-[6px] border-white bg-white" />
        <img src="/frontend/iPhone1.png" alt="App screen 5" className="h-auto w-[250px] rounded-[38px] shadow-2xl border-[6px] border-white bg-white" />
      </div>
    
      {/* Store Buttons */}
      <div className="flex flex-wrap justify-center gap-8">
        <img src="/frontend/appstore.png" alt="App Store" className="h-14 w-auto" />
        <img src="/frontend/googleplay.png" alt="Google Play" className="h-14 w-auto" />
      </div>
      {/* <div className="absolute w-40  inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div> */}
    </section>
  )
}
