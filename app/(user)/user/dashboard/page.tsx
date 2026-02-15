'use client';

import { SlidersHorizontal } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardPage() {
    const data1 = [
        { month: "Jan", value: 50 },
        { month: "Feb", value: 60 },
        { month: "Mar", value: 68 },
        { month: "Apr", value: 57 },
        { month: "May", value: 43 },
        { month: "Jun", value: 56 },
        { month: "Jul", value: 62 },
        { month: "Aug", value: 70 }, // highlighted
        { month: "Sep", value: 65 },
        { month: "Oct", value: 56 },
        { month: "Nov", value: 49 },
        { month: "Dec", value: 70 },
    ];

    const MAX = 100;

    const data = [
        {
            name: "Frontend Development",
            instructor: "Sarah Johnson",
            level: "Beginner",
            progress: "65%",
            duration: "8 Weeks",
            status: "In Progress",
        },

        {
            name: "Python Programming Mastery",
            instructor: "David Miller",
            level: "Beginner",
            progress: "40%",
            duration: "10 Weeks",
            status: "In Progress",
        },

        {
            name: "UI / UX Design Basics",
            instructor: "Emma Wilson",
            level: "Intermediate",
            progress: "80%",
            duration: "6 Weeks",
            status: "In Progress",
        },

    ];

    return (
        <div className='max-w-[1400px] mx-auto pt-[20px] pb-[40px]'>
            <div className='my-main-grid'>
                <DashboardSidebar />

                <div className=''>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                Overview of your German learning app content and user engagement.
                            </p>

                            <div className='grid md:grid-cols-4 items-center mt-8 gap-6'>
                                <div className='shadow-[0px_4px_6px_#084a8557] pt-[6px] pr-[10px] pb-[38px] pl-[10px] rounded relative'>
                                    <div>
                                        <h2 className='text-[18px] font-medium'>12 Courses</h2>
                                        <p className='pt-[10px] text-[13px] text-[#7f7f7f]'>Courses you are currently learning across different domains.</p></div>

                                    <img src='/frontend/online.png' className='w-[50px] h-[50px] absolute top-[70px] right-[6px]' />


                                </div>

                                <div className='shadow-[0px_4px_6px_#084a8557] pt-[6px] pr-[10px] pb-[38px] pl-[10px] rounded relative'>
                                    <div>
                                        <h2 className='text-[18px] font-medium'>6 Active</h2>
                                        <p className='pt-[10px] text-[13px] text-[#7f7f7f]'>Courses you are currently learning across different domains.</p></div>

                                    <img src='/frontend/active.png' className='w-[50px] h-[50px] absolute top-[70px] right-[6px]' />

                                </div>

                                <div className='shadow-[0px_4px_6px_#084a8557] pt-[6px] pr-[10px] pb-[38px] pl-[10px] rounded relative'>
                                    <div>
                                        <h2 className='text-[18px] font-medium'>4 Completed</h2>
                                        <p className='pt-[10px] text-[13px] text-[#7f7f7f]'>Courses you are currently learning across different domains.</p></div>

                                    <img src='/frontend/check.png' className='w-[50px] h-[50px] absolute top-[70px] right-[6px]' />



                                </div>

                                <div className='shadow-[0px_4px_6px_#084a8557] pt-[6px] pr-[10px] pb-[38px] pl-[10px] rounded relative'>
                                    <div>
                                        <h2 className='text-[18px] font-medium'>3 Certificates</h2>
                                        <p className='pt-[10px] text-[13px] text-[#7f7f7f]'>Courses you are currently learning across different domains.</p></div>

                                    <img src='/frontend/quality.png' className='w-[50px] h-[50px] absolute top-[70px] right-[6px]' />

                                </div>

                            </div>

                            {/* <img src='/frontend/class.png' className='mt-10 mb-10' /> */}

                            <div className="bg-[#ffffff] rounded-2xl p-6 w-full mt-10 mb-10 border">
                                <h2 className="text-2xl font-bold mb-8">Total Progress</h2>

                                <div className="flex items-end justify-between gap-4 h-[260px]">
                                    {data1.map((item) => {
                                        const isActive = item.month === "Aug";

                                        return (
                                            <div
                                                key={item.month}
                                                className="flex flex-col items-center justify-end h-full flex-1"
                                            >
                                                {/* Bar */}
                                                <div className="relative w-12 h-full flex items-end">
                                                    {/* Remaining */}
                                                    <div className="absolute bottom-0 w-full h-full bg-blue-100 rounded-xl" />

                                                    {/* Achieved */}
                                                    <div
                                                        className="absolute bottom-0 w-full bg-blue-900 rounded-xl transition-all duration-500"
                                                        style={{ height: `${item.value}%` }}
                                                    />

                                                    {/* Tooltip */}
                                                    {isActive && (
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-sm px-3 py-1 rounded-md shadow">
                                                            {item.value}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Month */}
                                                <span
                                                    className={`mt-3 text-sm ${isActive ? "font-bold text-black" : "text-gray-500"
                                                        }`}
                                                >
                                                    {item.month}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="border rounded-xl p-6 bg-white shadow-sm">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">My Courses</h2>

                                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50">
                                        <SlidersHorizontal size={16} />
                                        Filter & Sort
                                    </button>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-left text-gray-500 border-b">
                                                <th className="pb-3 font-medium">Course Name</th>
                                                <th className="pb-3 font-medium">Instructor</th>
                                                <th className="pb-3 font-medium">Level</th>
                                                <th className="pb-3 font-medium">Progress</th>
                                                <th className="pb-3 font-medium">Duration</th>
                                                <th className="pb-3 font-medium">Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data.map((item) => (
                                                    <tr key={item.name} className="border-b last:border-none text-left">
                                                    <td className="py-4">{item.name}</td>
                                                    <td className="py-4">{item.instructor}</td>
                                                    <td className="py-4">{item.level}</td>
                                                    <td className="py-4">{item.progress}</td>
                                                    <td className="py-4">{item.duration}</td>
                                                    <td className="py-4">{item.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
