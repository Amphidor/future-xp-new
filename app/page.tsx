"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
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
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  // Redirect logged-in users to career page (handles client-side navigation)
  useEffect(() => {
    if (token) {
      router.replace("/careers");
      return;
    }
  }, [token, router]);

  useEffect(() => {
    if (token) return;
    const t = setTimeout(() => {
      pricingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
    return () => clearTimeout(t);
  }, [token]);
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
