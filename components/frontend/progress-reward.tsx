'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"


export default function ProgressReward() {
  const router = useRouter();
  const features = [
    {
      title: 'XP Points',
      description: 'Earn XP for every swipe and flip',
      icon: '/frontend/img-7.png',
      color: 'bg-[#FFF6E8]'
    },
    {
      title: 'Levels',
      description: 'Move from beginner to explorer',
      icon: '/frontend/img-8.png',
      color: 'bg-[#FFEDED]'
    },
    {
      title: 'Badges',
      description:'Earn XP for every swipe and flip',
      icon: '/frontend/img-9.png',
      color: 'bg-[#FDF3FF]'
    },

  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20">
      <h2 className="md:leading-[1.15] text-center text-[38px] lg:text-[38px] font-bold text-gray-700 font-semibold !leading-[1.6] mb-[60px]">
        Progress That Feels Rewarding
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, idx) => (
          <div key={idx} className={`${feature.color} flex justify-left items-center gap-4 rounded-2xl px-4 py-2`}>
            <div className="text-[50px] py-4">
              <Image src={feature.icon} alt={feature.title} width={50} height={50} />
            </div>
            <div>
            <h3 className="text-[20px] font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-[#7f7f7f] text-[14px] leading-relaxed text-left">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-[90px]">
        <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-8 py-3 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center m-auto text-[18px]"
          onClick={() => router.push('/#waitlist')}>
          Let's Start <img src="/frontend/arrow.png" className="w-[20px]" />
        </button>
      </div>
    </section>
  )
}
