"use client";

import Image from "next/image";

type SpeakCardProps = {
  title: string;
  icon: string;
  color: string;
};

export default function HowItWorks() {
  const features = [
    {
      title: ' Play + Discover',
      description: (
        <>
          <ul className="list-disc flex text-center items-center gap-[24px]">
            <li className="list-none">Read about jobs</li>
            <li className="list-none">Save what your child likes</li>
          </ul>

          <ul className="list-disc text-center mt-2">
            <li className="list-none">Play life-choice story scenarios</li>

          </ul>
        </>
      ),
      icon: '/frontend/img-4.png',
      color: 'bg-[#FFF3EC]'
    },
    {
      title: 'Build Momentum',
      description: (
        <ul className="list-disc grid md:grid-cols-2 text-center items-center gap-[10px]">
          <li className="list-none">Unlock badges</li>
          <li className="list-none">See what friends like</li>
          <li className="list-none">Earn Experience Points</li>
          <li className="list-none">Come back anytime</li>
        </ul>
      ),
      icon: '/frontend/img-5.png',
      color: 'bg-[#F5F7FF]'
    },
    {
      title: 'Clear Direction',
      description: (
        <ul className="list-disc ">
          <li className="list-none mb-2">Live dashboards for teens</li>
          <li className="list-none mb-2">Weekly highlights for parents</li>
          <li className="list-none mb-2">Track how interests and paths evolve to guide
            major and class descisions</li>
        </ul>
      ),
      icon: '/frontend/img-6.png',
      color: 'bg-[#FFEDF8]'
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pt-20">
      {/* Heading */}
      <div className="mb-[60px] text-center">
        <h2 className="md:leading-[1.15] mb-6 text-3xl md:text-5xl lg:text-[44px] font-bold text-gray-900 !leading-[1.6]">
          How it Works
        </h2>
      </div>

      {/* Learning Path */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, idx) => (
          <div key={idx} className={`${feature.color} flex justify-center flex-col items-center rounded-2xl p-4`}>
            <div className="text-[50px] py-4">
              <Image src={feature.icon} alt={feature.title} width={60} height={60} />
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-[#424242] h-[16vh] text-[14px] leading-relaxed text-center">{feature.description}</p>
          </div>
        ))}
      </div>

      <p className="text-[#7f7f7f] text-[18px] leading-relaxed text-center">No right or wrong answers Safe, guided exploration</p>
      <div className="text-center mt-[60px]">
        <button className="bg-[#084A85] hover:bg-[#FFAE41] text-white px-8 py-3 rounded-[10px] font-medium transition flex items-center gap-[10px] justify-center m-auto text-[18px]">
          Get Started <img src="/frontend/arrow.png" className="w-[20px]" />
        </button>
      </div>
    </section>
  );
}
