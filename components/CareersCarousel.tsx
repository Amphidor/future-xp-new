"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const cardData = [
  { id: 0, title: "Doctor", img: "/frontend/img-11.jpg", color: "#00f2ff", desc: "Explains medical conditions and treatments clearly to patients and families, and listens actively.", points: ["Strong clinical assessment and diagnostic abilities", "Excellent communication and patient counseling skills", "Ability to work in a fast-paced environment", "Team collaboration with nurses and healthcare staff"] },
  { id: 1, title: "Police", img: "/frontend/img-12.jpg", color: "#ff0055", desc: "Able to make clear decisions in emergencies or dangerous situations.", points: ["Ability to read, write, and speak the country's official language", "English proficiency is often mandatory for international roles", "Knowledge of law enforcement procedures", "Report writing and documentation"] },
  { id: 2, title: "Teacher", img: "/frontend/img-14.jpg", color: "#00ff88", desc: "Supports students with different learning speeds and backgrounds.", points: ["Bachelor's degree in Education or relevant subject", "Teaching qualification / license", "Master's degree preferred for higher grades or specialized roles", "2–5 years of classroom teaching experience (varies)"] },
  { id: 3, title: "Army", img: "/frontend/img-13.jpg", color: "#ffaa00", desc: "Defends national security and operates in high-pressure environments.", points: ["Citizenship or permanent residency is often mandatory", "Technical or university degree required for specialized positions", "Ability to read, write, and speak the national language", "Adaptability in challenging environments"] },
  { id: 4, title: "Developer", img: "/frontend/img-15.jpg", color: "#bc13fe", desc: "Enjoys solving complex problems using logic and structured approaches.", points: ["Bachelor's degree in Computer Science, IT, or related field", "Equivalent practical experience may be accepted", "2–5+ years of professional development experience", "Experience working in agile/team environments is a plus"] },
];

export default function CareersCarousel() {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextStep = () => {
    setIndex((prev) => (prev + 1) % cardData.length);
    setIsFlipped(false);
  };

  const prevStep = () => {
    setIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
    setIsFlipped(false);
  };

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 80) prevStep();
    else if (info.offset.x < -80) nextStep();
  };

  return (
    <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center overflow-hidden font-sans select-none px-6">
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] blur-[100px] md:blur-[180px] rounded-full opacity-20 transition-all duration-1000"
          style={{ backgroundColor: cardData[index].color }}
        />
      </div>

      <div className="relative w-full max-w-[1200px] h-[350px] md:h-[480px] flex items-center justify-center [perspective:2000px]">
        {cardData.map((card, i) => {
          const total = cardData.length;
          let distance = i - index;
          if (distance > total / 2) distance -= total;
          if (distance < -total / 2) distance += total;

          const isCenter = distance === 0;
          const absDistance = Math.abs(distance);
          const xOffset = typeof window !== "undefined" && window.innerWidth < 768 ? 160 : 320;

          return (
            <motion.div
              key={card.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={{
                x: distance * xOffset,
                z: -absDistance * 200,
                rotateY: distance * -25,
                opacity: 1 - absDistance * 0.4,
                scale: 1 - absDistance * 0.2,
                zIndex: 50 - absDistance * 10,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="absolute w-[260px] md:w-[320px] h-[380px] md:h-[480px] cursor-pointer"
              onClick={() => isCenter && setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped && isCenter ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[1.5rem] md:rounded-[2rem] border-2 overflow-hidden shadow-2xl bg-black"
                  style={{
                    borderColor: isCenter ? card.color : "rgba(255,255,255,0.1)",
                    boxShadow: isCenter ? `0 0 30px ${card.color}33` : "none",
                  }}
                >
                  <img src={card.img} className="w-full h-full object-cover pointer-events-none" alt={card.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 right-4 flex flex-col gap-3 z-20">
                    <div className="w-13 h-13 flex items-center justify-center border border-white/10">
                      <img src="/frontend/dislike.png" className="w-12 h-12 object-contain" alt="dislike" />
                    </div>
                    <div className="w-13 h-13 flex items-center justify-center border border-white/10">
                      <img src="/frontend/star-1.png" className="w-12 h-12 object-contain" alt="star" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                    <h2 className="text-[30px] md:text-[30px] font-black text-white italic uppercase">{card.title}</h2>
                    <div className="h-1 w-10 mt-2" style={{ backgroundColor: card.color }} />
                  </div>
                </div>

                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[1.5rem] md:rounded-[2rem] border-2 p-5 md:p-5 flex flex-col justify-between bg-[#050508]"
                  style={{ borderColor: card.color }}
                >
                  <div>
                    <h3 className="text-[24px] font-black text-white italic mb-2">{card.title}</h3>
                    <p className="text-[11px] text-gray-400 font-mono italic mb-4 md:mb-6">{card.desc}</p>
                    <div className="space-y-3">
                      {card.points.map((p, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="h-1 w-3 rounded-full" style={{ backgroundColor: card.color }} />
                          <span className="text-white text-[9px] md:text-[10px] uppercase font-black tracking-widest !leading-[2.3] mb-2">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 md:mt-12 flex flex-col items-center gap-6 z-50">
        <div className="flex gap-2">
          {cardData.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setIndex(i);
                setIsFlipped(false);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === i ? "w-8" : "w-2 bg-white/20"}`}
              style={{ backgroundColor: index === i ? cardData[i].color : "" }}
            />
          ))}
        </div>
        <div className="flex gap-4 mb-10">
          <button onClick={prevStep} className="p-3 md:p-4 rounded-xl border border-white/10 bg-white/5 text-white active:bg-white/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextStep} className="p-3 md:p-4 rounded-xl border border-white/10 bg-white/5 text-white active:bg-white/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
