
"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HeroStudent() {



    return (
        <main className="bg-gray-50">
            {/* Hero / Header Section */}
            <section className="md:py-10">
                <div className="w-full mx-auto text-center px-4 max-w-[1400px] mx-auto ">
                    <h2 className="md:leading-[1.15] mb-4 text-3xl md:text-5xl lg:text-[44px] font-bold text-gray-900 !leading-[1.6] ">
                        Every <span className="text-[#EFBF04]">AI Study</span> Tool You Need
                    </h2>

                    <div className="flex-shrink-0 relative">
                        <img src='/frontend/student-back.png' className="w-[900px] m-auto" />

                        <div className="bg-[#ffffff] px-4 py-[12px] absolute top-[10%] left-[5%] rounded-xl shadow-[0px_3px_6px_#084a857d]">

                            <span className="span">
                                <span className="span-1">Your future isn’t one path - Try them all</span>
                                <span className="span-1">Level up your future</span>
                                <span className="span-1">Figure out what you’re actually good at</span>
                                <span className="span-1">Not sure what you want?</span>
                            </span>

                        </div>

                        <div className="bg-[#ffffff] px-4 py-[12px] absolute top-[10%] right-[-2%] rounded-xl shadow-[0px_3px_6px_#084a857d]">

                            <span className="span">
                                <span className="span-1">Find careers and majors that fit your vibe</span>
                                <span className="span-1">See jobs that pay - and what it takes to get there</span>
                                <span className="span-1">Real path. Real pay. No boring stuff</span>
                                <span className="span-1">Find paths that don’t require “perfect grades”</span>
                            </span>

                        </div>

                        <div className="bg-[#ffffff] px-4 py-[12px] absolute top-[47%] left-[-4%] rounded-xl shadow-[0px_3px_6px_#084a857d]">

                            <span className="span">
                                <span className="span-1">No tests. No pressure. Just exploring.</span>
                                <span className="span-1">Built for middle + high school</span>
                                <span className="span-1">Try paths you’ve never heard of</span>
                                <span className="span-1">STEM, arts, business, trades - your call</span>
                            </span>

                        </div>

                        <div className="bg-[#ffffff] px-4 py-[12px] absolute top-[47%] right-[-2%] rounded-xl shadow-[0px_3px_6px_#084a857d]">

                            <span className="span">
                                <span className="span-1">Designed for real life, not textbooks</span>
                                <span className="span-1">Your future, make it fun</span>
                                <span className="span-1">It’s okay to not know yet</span>
                                <span className="span-1">Explore Your Future Like a Game</span>
                            </span>

                        </div>

                        <div className="bg-[#ffffff] px-4 py-[12px] absolute bottom-[10%] left-[8%] rounded-xl shadow-[0px_3px_6px_#084a857d]">

                            <span className="span">
                                <span className="span-1">Find paths that actually fit you</span>
                                <span className="span-1">Find what you’re actually good at</span>
                                <span className="span-1">Find your lane. No pressure. Just fun</span>
                                <span className="span-1">Unlock your strengths</span>
                            </span>

                        </div>

                        <div className="bg-[#ffffff] px-4 py-[12px] absolute bottom-[10%] right-[19%] rounded-xl shadow-[0px_3px_6px_#084a857d]">

                            <span className="span">
                                <span className="span-1">Discover your thing</span>
                                <span className="span-1">Find what fits you</span>
                                <span className="span-1">Find where you fit.</span>
                                <span className="span-1">Tap. Swipe. Discover.</span>
                            </span>

                        </div>
                    </div>


                </div>
            </section>

            <div className="text-center mb-[50px]">
                <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-8 py-3 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center m-auto text-[18px]"
                   >
                    QR Code For Mobile<img src="/frontend/QR.png" className="w-[20px]" />
                </button>
            </div>
        </main>
    );
}
