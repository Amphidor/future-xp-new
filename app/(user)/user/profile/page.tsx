'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";



export default function ProfilePage() {

    const menu = [
        { label: "Dashboard", icon: "/frontend/side-1.png" },
        { label: "My Learning", icon: "/frontend/side-2.png" },
        { label: "Certificate", icon: "/frontend/side-3.png" },
        { label: "Subscription", icon: "/frontend/side-4.png" },
        { label: "Payment History", icon: "/frontend/side-5.png" },
        { label: "Notifications", icon: "/frontend/side-6.png" },
        { label: "Help & Support", icon: "/frontend/side-7.png" },
        { label: "Profile", icon: "/frontend/side-8-white.png" },
    ];

    const activeItem = "Profile";

    return (
        <div className='max-w-[1400px] mx-auto pt-[20px] pb-[40px]'>
            <div className='my-main-grid'>
                <div className='bg-white shadow-xl'>

                    <div className='flex items-center gap-4 px-3'>
                        <img src='/frontend/crcle.png' className='w-[70px]' />

                        <div className=''>
                            <h4 className="text-[16px] font-semibold text-gray-900">Gavano</h4>
                            <p className=" text-sm text-gray-700">Room Renter</p></div>

                    </div>

                    <aside className="w-100 bg-white pt-10 h-screen sticky top-0 overflow-y-auto">


                        <nav className="space-y-6">
                            {menu.map((item) => (
                                <div
                                    key={item.label}
                                    className={`flex items-center gap-3 px-4 py-4 rounded-lg cursor-pointer
                                    ${activeItem === item.label
                                            ? "bg-[#084a85] text-[white] font-semibold"
                                            : "text-gray-600 hover:bg-[#EAF5FF]"
                                        }`}
                                >
                                    <Image src={item.icon} alt={item.label} width={20} height={20} />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </nav>
                    </aside>
                </div>

                <div className=''>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                            <p className="mt-2 text-[13px] text-[#7f7f7f] !leading-[1.8]">
                                Manage your personal information, track your progress, and showcase your
                                learning achievements. Keep your profile updated to get personalized <span className='block'>course
                                    recommendations and a better learning experience
                                </span></p>

                            <div className="grid md:grid-cols-3 items-center gap-10 mb-6 mt-10">
                                <div className='w-full'>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Full Name
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Full Name"
                                    />
                                </div>

                                <div className='w-full'>
                                    <label
                                        htmlFor="last Name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email Address
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Your Email Address"
                                    />
                                </div>

                                <div className='w-full'>
                                    <label
                                        htmlFor="last Name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Mobile Number
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Mobile Number"
                                    />
                                </div>

                                <div className='w-full'>
                                    <label
                                        htmlFor="last Name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Date of Birth
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Date of Birth"
                                    />
                                </div>

                                <div className='w-full'>
                                    <label
                                        htmlFor="last Name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Gender
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Your Gender"
                                    />
                                </div>

                                <div className='w-full'>
                                    <label
                                        htmlFor="last Name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Address
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Your Address"
                                    />
                                </div>

                                <div className='w-full'>
                                    <label
                                        htmlFor="last Name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        City
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Your City"
                                    />
                                </div>

                                <div className='w-full'>
                                    <label
                                        htmlFor="last Name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        State
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Your State"
                                    />
                                </div>

                                <div className='w-full'>
                                    <label
                                        htmlFor="last Name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Country
                                    </label>
                                    <input className="mt-1 block w-full pt-4 pb-4 pl-4 pr-14 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                                        placeholder="Enter Your Country"
                                    />
                                </div>
                            </div>

                            <div className="text-left mt-[90px]">
                                <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-16 py-3 rounded-[10px] font-medium transition text-[18px]"
                                    >
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
