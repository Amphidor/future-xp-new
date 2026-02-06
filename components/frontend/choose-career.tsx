'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ChooseCareer() {
  const router = useRouter();
  const features = [
    {
      title: 'The Problem',
      description: (
        <>
          <ul className="list-disc grid md:grid-cols-2 text-center items-center gap-[10px]">
            <li className="list-none">Too many options</li>
            <li className="list-none">Too much pressure</li>
          </ul>

          <ul>
            <li className="list-none mt-2">Not sure what fits career or majors fit my child</li>
          </ul>

        </>
      ),
      icon: '/frontend/img-1.png',
      color: 'bg-[#E4E8FF]'
    },
    {
      title: 'The Current Way',
      description: (
        <>
          <ul className="list-disc grid md:grid-cols-2 text-center items-center gap-[10px]">
            <li className="list-none">Long boring tests</li>
            <li className="list-none">Outdated job data
            </li>
          </ul>

          <ul>
            <li className="list-none mt-2 text-center">One-time result, no exploration</li>
          </ul>

        </>
      ),
      icon: '/frontend/img-2.png',
      color: 'bg-[#FFF1F1]'
    },
    {
      title: 'Built for Teens, Powered by Teens',
      description: (
        <ul className="list-disc text-center">
          <li className="list-none mb-2">It’s a game, not a test</li>
          <li className="list-none mb-2"> Discover your child’s strengths as they play
          </li>
          <li className="list-none mb-2">Explore real and future careers and majors
            that excite them</li>
        </ul>
      ),
      icon: '/frontend/img-3.png',
      color: 'bg-[#FFF8DE]'
    },

  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20">
      <h2 className="md:leading-[1.15] text-center text-[38px] lg:text-[38px] font-bold text-gray-700 font-semibold !leading-[1.6] mb-[60px]">
        Choosing a Career or Major Shouldn’t Be Confusing
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, idx) => (
          <div key={idx} className={`${feature.color} flex justify-center flex-col items-center rounded-2xl p-8`}>
            <div className="text-[50px] py-4">
              <Image src={feature.icon} alt={feature.title} width={60} height={60} />
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-[#424242] h-[14vh] text-[14px] leading-relaxed text-left">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-[90px]">
        <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-8 py-3 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center m-auto text-[18px]"
          onClick={() => router.push('/#waitlist')}>
          Get Started <img src="/frontend/arrow.png" className="w-[20px]" />
        </button>
      </div>
    </section>
  )
}
