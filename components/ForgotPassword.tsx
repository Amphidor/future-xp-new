"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { loginRequest } from "../store/slices/authSlice";
import Image from "next/image";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

export default function ForgotPassword() {


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-6 mt-4">
            <div className="max-w-[580px] w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Right Side - Login Form */}
                <div className="p-8 flex flex-col justify-center">
                    {/* <div className="flex justify-center">
            <Image
              src="/frontend/logo-future.png"
              alt="Logo"
              width={150}
              height={50}
              className="mb-6 drop-shadow-lg"
            />
          </div> */}

                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-left">
                        Forgot Password
                    </h2>

                    <p className="text-[#7f7f7f] mb-8 text-[14px]">Forgot your password? No worries. Enter your registered email address and we’ll send you a secure link to reset your Future XP password and get you back on track.</p>
                    <form className="">
                        {/* Email */}

                        <div className=" mb-6">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <input className="mt-1 block w-full pt-3 pb-3 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                placeholder="Enter Your Email Address"
                            />
                        </div>


                        {/* Submit */}
                        <a href="/otpverify"
                            type="submit"
                            className="w-full flex justify-center py-4 px-4 text-[15px] font-semibold rounded-lg text-white bg-[#084A85] focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50"
                        >
                            Continue
                        </a>

                    </form>
                </div>
            </div>
        </div>
    );
}
