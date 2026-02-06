// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ReduxProvider from "./redux-provider";
import Header from '@/components/frontend/header'
import Footer from '@/components/frontend/footer'


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Future XP",
  description: "Future XP App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
