"use client";

import { useEffect, useRef } from "react";
import Header from '@/components/frontend/header'
import Hero from '@/components/frontend/hero'
import Footer from '@/components/frontend/footer'
import ChooseCareer from "@/components/frontend/choose-career";
import ExploreFuture from "@/components/frontend/explore-future";
import HowItWorks from "@/components/frontend/howitworks";
import FavouriteInsight from "@/components/frontend/favourite-insight";
import ProgressReward from "@/components/frontend/progress-reward";
import FutureChild from "@/components/frontend/future-child";
import WhyItWorks from "@/components/frontend/why-it-works";
import GetInTouch from "@/components/frontend/get-in-touch";




export default function Home() {

  const pricingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // slight delay ensures layout is ready
    setTimeout(() => {
      pricingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  }, []);
  return (
    <main className="w-full overflow-hidden">
      {/* <Header /> */}
      <Hero />
      <ChooseCareer />
      <ExploreFuture />
      <HowItWorks />
      <FavouriteInsight />
      <ProgressReward />
      <FutureChild />
      <WhyItWorks />
      <GetInTouch />
      {/* <Footer /> */}
    </main>
  )
}
