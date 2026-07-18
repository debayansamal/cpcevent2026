"use client";

import { motion } from "motion/react";
import { Compass, Coins, Award, Users, ShieldAlert, Cpu } from "lucide-react";

const carnivalPhases = [
  {
    stage: "01",
    title: "Carnival Setup & Exhibition",
    subtitle: "Exhibitor Pitches",
    description: "Each qualified team is assigned a display stand. Instead of classic slides, teams demonstrate their prototypes, wireframes, or proofs of concept directly to visitors.",
    icon: Compass
  },
  {
    stage: "02",
    title: "Judgment & Peer Interaction",
    subtitle: "Open Pitches & Q&A",
    description: "Participating teams engage in conversations with visitors. Visitors can query the teams, test their demos, and analyze their problem-solving depth.",
    icon: Users
  },
  {
    stage: "03",
    title: "Investment Coin Mechanism",
    subtitle: "Crowdsourced Validation",
    description: "Visitors are provided with themed Investment Coins. To ensure fairness, coins must be distributed across multiple teams. Faculty votes carry higher weight than general visitors.",
    icon: Coins
  },
  {
    stage: "04",
    title: "Awards & Conclusion",
    subtitle: "Leaderboard Reconciliation",
    description: "Winners are decided based on the volume and category-wise distribution of Investment Coins accumulated by each team during the exhibition.",
    icon: Award
  }
];

const coinCategories = [
  { name: "Best UI/UX Coin", color: "from-cyan-400 to-blue-500", desc: "Given for outstanding visual design, usability, and smooth user flow." },
  { name: "Best Innovation Coin", color: "from-purple-400 to-indigo-500", desc: "Given for pushing technical bounds and out-of-the-box conceptualization." },
  { name: "Market Viability Coin", color: "from-emerald-400 to-teal-500", desc: "Given for strong business potential, target fit, and scalability." },
  { name: "Social Impact Coin", color: "from-amber-400 to-orange-500", desc: "Given for addressing critical social challenges and user inclusivity." }
];

export function Day2() {
  return (
    <section className="relative py-32 px-8 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tight text-white" style={{ fontWeight: 700 }}>
            Day 2: The Carnival
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Day 2 shifts the arena into an open startup expo, driven by interactive peer demos and crowdsourced validation.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-28">
          {/* Vertical central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent -translate-x-1/2 pointer-events-none" />

          {/* Glowing node traveling the timeline */}
          <motion.div
            className="absolute left-1/2 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 shadow-[0_0_20px_rgba(0,240,255,0.8)] pointer-events-none"
            animate={{
              y: [0, 150, 300, 450, 600, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="space-y-16">
            {carnivalPhases.map((phase, index) => (
              <motion.div
                key={phase.stage}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Text card */}
                <div className="flex-grow md:w-1/2">
                  <motion.div
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-950/80 border border-cyan-500/10 backdrop-blur-xl text-left"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: "rgba(0, 240, 255, 0.3)",
                      boxShadow: "0 15px 40px rgba(6,182,212,0.15)",
                    }}
                  >
                    <div className="relative z-10">
                      {/* Stage indicator */}
                      <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase">
                        PHASE {phase.stage}
                      </span>
                      
                      <h3 className="text-xl font-bold text-slate-100 mt-1 mb-2">
                        {phase.title}
                      </h3>
                      
                      <p className="text-xs text-cyan-300/80 mb-3 font-semibold">
                        {phase.subtitle}
                      </p>

                      <p className="text-slate-400 text-sm leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Central Circle Node */}
                <motion.div
                  className="relative flex-shrink-0 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-cyan-500/35 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 10,
                      borderColor: "rgba(0, 240, 255, 0.5)",
                    }}
                  >
                    <phase.icon className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                </motion.div>

                {/* Empty space filler for desktop alignment */}
                <div className="hidden md:block flex-grow md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investment Coins Detail Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 border-t border-cyan-500/10 pt-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-4">
            The Investment Coin Mechanism
          </h3>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto text-center mb-12">
            Every attendee receives a pouch of themed Investment Coins. Attendees distribute these coins strategically based on different criteria.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coinCategories.map((coin, index) => (
              <motion.div
                key={coin.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Floating 3D Coin Object simulation */}
                <motion.div
                  className="relative p-6 rounded-2xl bg-slate-900/50 border border-cyan-500/15 backdrop-blur-sm flex flex-col items-center text-center overflow-hidden h-full"
                  whileHover={{ 
                    y: -8,
                    borderColor: "rgba(0, 240, 255, 0.3)",
                    boxShadow: "0 20px 40px rgba(6,182,212,0.1)"
                  }}
                >
                  {/* Rotating 3D style coin circle */}
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-tr ${coin.color} shadow-[0_0_15px_rgba(6,182,212,0.3)] mb-4 flex items-center justify-center border border-white/20`}
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 6 + index, repeat: Infinity, ease: "linear" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {/* Inner gold rim details */}
                    <div className="w-13 h-13 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center font-bold font-mono text-white text-xs select-none">
                      $
                    </div>
                  </motion.div>

                  <h4 className="text-md font-bold text-slate-100 mb-2">
                    {coin.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    {coin.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
