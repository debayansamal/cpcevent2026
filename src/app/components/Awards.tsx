"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const awardsData = [
  {
    title: "Best Innovation",
    description: "Awarded to the team accumulating the highest volume of Innovation Coins. Recognizes outstanding technical bounds and novel problem-solving concepts.",
    color: "bg-pink-500",
    highlight: "Technical Breakthrough"
  },
  {
    title: "Best UI/UX",
    description: "Awarded to the team showing superior interface layouts and user-centric flows. Recognizes detail-oriented prototypes and aesthetic excellence.",
    color: "bg-cyan-400",
    highlight: "Product Excellence"
  },
  {
    title: "Market Viability Award",
    description: "Awarded to the team displaying the highest product scalability and potential commercial fit. Focuses on realistic market launch strategies.",
    color: "bg-slate-200",
    highlight: "Business Strategy"
  },
  {
    title: "Social Impact Award",
    description: "Awarded to the team developing solutions for critical social challenges, accessibility hurdles, or community vulnerabilities.",
    color: "bg-emerald-400",
    highlight: "Global Impact"
  },
  {
    title: "People's Choice Award",
    description: "Awarded to the team capturing the highest volume of general visitor coin votes. Celebrates public engagement and outstanding pitch presentations.",
    color: "bg-amber-400",
    highlight: "Crowd Favorite"
  }
];

export function Awards() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with the middle card (Market Viability)
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    // Set initial width on mount
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay loop: changes the active card every 2 seconds and wraps around
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < awardsData.length - 1 ? prev + 1 : 0));
    }, 2000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < awardsData.length - 1 ? prev + 1 : prev));
  };

  const isMobile = windowWidth < 768;
  const gap = isMobile ? 0 : 340; // Side-by-side spacing on desktop, stacked on mobile

  return (
    <section id="awards" className="relative py-32 px-4 overflow-hidden bg-[#020617]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#020617] to-slate-950 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Header section matching style of screenshot */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Awards & <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">Recognition</span>
        </h2>
        <p className="text-slate-400 text-md md:text-lg max-w-2xl mx-auto">
          Outstanding accomplishments will be recognized across five categories based on accumulated Investment Coin counts.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative max-w-6xl mx-auto flex items-center justify-center h-[480px] z-10">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="absolute left-2 md:left-6 z-40 w-12 h-12 rounded-full border border-slate-800 bg-slate-950/80 hover:bg-slate-900 hover:border-slate-700 text-white flex items-center justify-center transition-all disabled:opacity-10 disabled:pointer-events-none shadow-lg cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          disabled={activeIndex === awardsData.length - 1}
          className="absolute right-2 md:right-6 z-40 w-12 h-12 rounded-full border border-slate-800 bg-slate-950/80 hover:bg-slate-900 hover:border-slate-700 text-white flex items-center justify-center transition-all disabled:opacity-10 disabled:pointer-events-none shadow-lg cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Card stack container */}
        <div className="relative w-full h-[420px] flex items-center justify-center overflow-visible">
          {awardsData.map((award, index) => {
            const distance = index - activeIndex;
            const isActive = distance === 0;
            
            // On mobile, only render the active card. On desktop, show all
            const shouldRender = isMobile ? isActive : Math.abs(distance) <= 2;

            if (!shouldRender) return null;

            return (
              <motion.div
                key={award.title}
                className={`absolute w-[310px] h-[390px] rounded-2xl bg-slate-950/90 border p-8 flex flex-col justify-between text-left transition-all duration-500 ${
                  isActive
                    ? "border-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.06)] bg-slate-900"
                    : "border-slate-900/60"
                }`}
                animate={{
                  x: distance * gap,
                  scale: isActive ? 1.04 : 0.86,
                  zIndex: 30 - Math.abs(distance),
                  opacity: isActive ? 1 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                {/* Accent Line & Number */}
                <div className="relative w-full">
                  <div className={`w-12 h-[3px] ${award.color} rounded-full mb-8`} />
                  
                  {/* Dotted thin circle with number tag */}
                  <div className="absolute top-0 right-0 w-10 h-10 rounded-full border border-dashed border-slate-800/80 flex items-center justify-center font-mono text-[10px] text-slate-500 select-none">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col justify-start">
                  <h3 className="text-2xl font-bold text-slate-100 mb-3 leading-snug">
                    {award.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans">
                    {award.description}
                  </p>
                </div>

                {/* Footer details tag & Square arrow button */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-900">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                    {award.highlight}
                  </span>
                  
                  <div className="w-10 h-10 rounded-lg border border-slate-800 hover:border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
