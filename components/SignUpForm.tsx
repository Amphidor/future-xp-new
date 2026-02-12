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

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const { user, loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginRequest(formData));
    };

    useEffect(() => {
        if (user) {
            router.push("/admin/dashboard"); // Redirect after login
        }
    }, [user, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-6 mb-16 mt-2">
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
                        Create an Account
                    </h2>

                    <p className="text-[#7f7f7f] mb-8 text-[14px]">Create your Future XP account to get started. Sign up to access personalized tools,
                        track your progress, and explore powerful features designed to support your growth and success.</p>
                    <form className="" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="flex items-center justify-between mb-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                First Name
                            </label>
                            <input className="mt-1 block w-full pt-3 pb-3 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                placeholder="Enter First Name"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="last Name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Last Name
                            </label>
                            <input className="mt-1 block w-full pt-3 pb-3 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                placeholder="Enter Last Name"
                            />
                        </div>
                        </div>

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

                        {/* Password */}
                        <div className=" mb-6">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="block w-full px-4 py-3 mt-2 pr-10 border-[1px] border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                    placeholder="Enter Your Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="block w-full px-4 py-3 mt-2 pr-10 border-[1px] border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                    placeholder="Enter Your Confirm Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            
                        </div>

                        <p className="text-[#7f7f7f] text-[12px] mb-10">Use 8 or more characters with a mix of letters, numbers and symbols</p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-4 px-4 text-[15px] font-semibold rounded-lg text-white bg-[#084A85] focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50 mb-6"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                        <h6 className="text-[#828282] text-center font-medium">Don't you have an account? <a href="" className="text-[#084A85] font-semibold">Sign In</a></h6>
                    </form>
                </div>
            </div>
        </div>
    );
}
