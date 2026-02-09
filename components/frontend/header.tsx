"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-[80px] shadow-[0px_3px_15px_#084a857d]">
        <div className="max-w-full h-full px-4 sm:px-6 lg:px-[60px]">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href=""><Image
                src="/frontend/logo-future.png"
                alt="Logo"
                width={80}
                height={50}
                className="h-auto w-[80px] sm:w-[80px]"
              /></a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-[40px] bg-[#F2F2F2] rounded-full pr-[40px] ml-[100px]">
              <Link href="#" className="hover:text-gray-900 text-[16px] font-medium pl-[40px]">
                Student
              </Link>
              <Link href="#" className="text-gray-700 hover:text-[#ffffff] text-[16px] font-medium bg-[#084A85] w-[130px] h-[50px] text-center flex items-center justify-center rounded-full text-white">
                Parent
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 text-[16px] font-medium">
                School
              </Link>
              {/* <Link href="#" className="text-gray-700 hover:text-gray-900 text-[16px] font-medium">
                Teacher
              </Link> */}
              {/* <Link href="#" className="text-gray-700 hover:text-gray-900 text-[16px] font-medium">
                Exam
              </Link> */}
            </nav>

            <div className="flex items-center gap-[20px]">

              <a href="/login" className="bg-[#ffffff] border-[#7f7f7f] border-[1.5px] px-6 py-3 text-[#7f7f7f] font-medium rounded-[10px] flex items-center gap-[10px]">Login <img src="/frontend/log-ico.png" className="w-[20px]" /></a>

              <a href="" className="bg-[#DC143C] px-6 py-3 text-[#ffffff] font-medium rounded-[10px] flex items-center gap-[10px]">Get Started <img src="/frontend/arrow.png" className="w-[20px]" /></a>

            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  // Close Icon (X)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Hamburger Menu Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - slide in from right */}
      <div
        className={`
          md:hidden fixed inset-0 bg-black text-center shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}
        `}
      >
        <div className="flex flex-col pt-24 px-4 space-y-4">
          {["Home", "About us", "Lessons", "Blog", "Profile"].map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-gray-300 text-[16px] font-medium block"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
