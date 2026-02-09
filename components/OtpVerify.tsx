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

export default function otpverify() {


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-6">
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
                        OTP Verification
                    </h2>

                    <p className="text-[#7f7f7f] mb-8 text-[14px] text-medium">Please enter the one-time password (OTP) sent to your registered email or mobile number to securely verify your Future XP account.</p>
                    <form className="">
                        {/* Email */}

                        <div className="flex items-center gap-8 px-10">
                            <div className=" mb-6">
                                <input className="mt-1 block w-full px-[20px] py-[30px] mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                    placeholder=""
                                />
                            </div>

                            <div className=" mb-6">
                                <input className="mt-1 block w-full px-[20px] py-[30px] mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                    placeholder=""
                                />
                            </div>

                            <div className=" mb-6">
                                <input className="mt-1 block w-full px-[20px] py-[30px] mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                    placeholder=""
                                />
                            </div>

                            <div className=" mb-6">
                                <input className="mt-1 block w-full px-[20px] py-[30px] mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                    placeholder=""
                                />
                            </div>

                        </div>

                        <div className="flex items-center px-10 justify-between mb-14">
                            <h6 className="text-[#828282] text-center font-medium text-[14px]">Remaining Time: 00:59s</h6>
                            <h6 className="text-[#828282] text-center font-medium text-[14px]">Didn’t get the code? <a href="" className="text-[#084A85] font-semibold">Resend</a></h6>
                        </div>



                        {/* Submit */}
                        <a href="/newpassword"
                            type="submit"
                            className="w-full flex justify-center py-4 px-4 text-[15px] font-semibold rounded-lg text-white bg-[#084A85] focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50"
                        >
                            Verify
                        </a>

                    </form>
                </div>
            </div>
        </div>
    );
}
