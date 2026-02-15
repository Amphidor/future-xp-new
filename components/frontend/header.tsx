"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import LoginForm from "../LoginForm";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  // Close login modal when user is set (successful login)
  useEffect(() => {
    if (user) setIsLoginOpen(false);
  }, [user]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    setIsLoggingOut(true);
    dispatch(logout());
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

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
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="bg-[#F2F2F2] hover:bg-[#E5E5E5] border border-[#D4D7E3] px-4 py-2.5 rounded-[10px] flex items-center gap-2 font-medium text-gray-700"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#084A85] flex items-center justify-center text-white text-sm font-semibold">
                      {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden sm:inline max-w-[120px] truncate">
                      {user?.name || user?.email || "Account"}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                        aria-hidden="true"
                      />
                      <div className="absolute right-0 top-full mt-2 z-50 min-w-[200px] bg-white rounded-xl shadow-lg border border-gray-200 py-2 overflow-hidden">
                        <Link
                          href="/user/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-[#F2F2F2] text-[15px] font-medium"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#084A85]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6h6v6" />
                          </svg>
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full flex items-center gap-2 px-4 py-3 text-left text-[#DC143C] hover:bg-red-50 text-[15px] font-medium border-t border-gray-100 disabled:opacity-70"
                        >
                          {isLoggingOut ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#DC143C] border-t-transparent" />
                              Logging out...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Logout
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsLoginOpen(true)}
                    className="bg-[#ffffff] border-[#7f7f7f] border-[1.5px] px-6 py-3 text-[#7f7f7f] font-medium rounded-[10px] flex items-center gap-[10px] cursor-pointer hover:bg-gray-50 transition-colors"
                    aria-label="Open login"
                  >
                    <span>Login</span>
                    <Image src="/frontend/log-ico.png" width={20} height={20} alt="" className="pointer-events-none" />
                  </button>
                  <a href="" className="bg-[#DC143C] px-6 py-3 text-[#ffffff] font-medium rounded-[10px] flex items-center gap-[10px]">Get Started <img src="/frontend/arrow.png" className="w-[20px]" alt="" /></a>
                </>
              )}
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

      {/* Login Modal */}
      {isLoginOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setIsLoginOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Login form"
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl max-w-[580px] w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 z-10 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Close login"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6 pt-12 overflow-y-auto flex-1 min-h-0">
              <LoginForm inModal onCloseModal={() => setIsLoginOpen(false)} />
            </div>
          </div>
        </div>
      )}

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
          {user ? (
            <>
              <Link
                href="/user/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-gray-300 text-[16px] font-medium block"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                disabled={isLoggingOut}
                className="text-left text-[#ff6b6b] hover:text-red-300 text-[16px] font-medium disabled:opacity-70 flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#ff6b6b] border-t-transparent" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => { setIsMenuOpen(false); setIsLoginOpen(true); }}
              className="text-left text-white hover:text-gray-300 text-[16px] font-medium"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
