'use client'

import Image from 'next/image'
import { Facebook, Youtube, X, CircleUser } from 'lucide-react'

export default function FooterLanding() {
  return (
    <footer className="relative bg-white w-full px-4 sm:px-6 lg:px-[60px] border-primary-200 shadow-[0px_-3px_15px_#efbf0470]">

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <div className="flex flex-col items-left justify-left pt-8 mb-6">
            <Image src="/frontend/logo-future.png" alt="Logo" width={100} height={100} />
          </div>

          <div className="text-left text-gray-400 max-w-2xl w-[550px] text-[15px] font-normal pl-2 mb-6">
            FutureXP introduces teens to real-world roles, essential skills, and growth opportunities. We turn real teen exploration data into meaningful insights, helping families make confident, data-informed decisions about college majors and future careers.
          </div>

          <div className="flex justify-left gap-4 pt-2">
            <a href="#" className="bg-white shadow-[0px_2px_6px_#084a857d] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#d5f5e4] transition">
              <img src="/frontend/icon-1.png" className='w-[20px]' />
            </a>
            <a href="#" className="bg-white shadow-[0px_2px_6px_#084a857d] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#d5f5e4] transition">
              <img src="/frontend/icon-2.png" className='w-[20px]' />
            </a>
            <a href="#" className="bg-white shadow-[0px_2px_6px_#084a857d] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#d5f5e4] transition">
              <img src="/frontend/icon-3.png" className='w-[20px]' />
            </a>
            <a href="#" className="bg-white shadow-[0px_2px_6px_#084a857d] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#d5f5e4] transition">
              <img src="/frontend/icon-3.png" className='w-[20px]' />
            </a>
          </div>

        </div>

        <div className='flex items-center gap-[200px]'>
          <nav className="px-10 lg:px-0">
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition block mb-6">Student</a>
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition block mb-6">Parent</a>
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition">School</a>
          </nav>

          <nav className="px-10 lg:px-0">
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition block mb-6">About</a>
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition block mb-6">FAQ</a>
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition">Help</a>
          </nav>

          <nav className="px-10 lg:px-0">
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition block mb-6">Data Sources</a>
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition block mb-6">Terms</a>
            <a href="#" className="text-black font-medium text-[17px] hover:text-[#084A85] transition">Privacy Policy</a>
          </nav>
        </div>
      </div>

      <div className='border-[1.5px] w-full mt-8'></div>
      <p className='text-center pt-4 text-[#7f7f7f] text-[14px] pb-4'>FutureXP is built to support smart career and major decisions. It’s designed for exploration, not formal assessment.</p>



    </footer>
  )
}
