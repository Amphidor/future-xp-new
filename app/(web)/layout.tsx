"use client";

import Header from "@/components/frontend/header";
import Footer from "@/components/frontend/footer";

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}
