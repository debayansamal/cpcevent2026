"use client";

import { motion } from "motion/react";
import { Shield, Brain, Zap, Target, Users, Calendar } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative py-32 px-8 overflow-hidden">
      {/* Background effects (indigo/cyan blur) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Rotating cyber rings behind contents */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border border-cyan-500/5" />
        <div className="absolute inset-20 rounded-full border border-blue-500/10" />
        <div className="absolute inset-40 rounded-full border border-cyan-500/5" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tight text-white" style={{ fontWeight: 700 }}>
            About The Challenge
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive trial of intelligence, technology integration, and business acumen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-left"
          >
            <h3 className="text-3xl font-bold text-white leading-tight">
              Test Your <span className="text-cyan-400">Entrepreneurial Limits</span> Under Pressure
            </h3>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              The event is a multi-stage simulation split into two distinct days. It is engineered to challenge your core abilities in 
              <span className="text-cyan-300 font-semibold"> business strategy</span>, 
              <span className="text-cyan-300 font-semibold"> quick adaptation</span>, 
              <span className="text-cyan-300 font-semibold"> negotiation tactics</span>, and 
              <span className="text-cyan-300 font-semibold"> cybersecurity investigation</span>.
            </p>

            <p className="text-slate-400 leading-relaxed">
              Teams are thrown into an fast-paced sandbox environment starting with clues, moving into resource allocation and trade negotiations, and resolving with a high-stakes MVP submission. Day 2 shifts the dynamic into an open exhibition where visitors hold the currency of investment.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3">
                <Brain className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-slate-200">Ideation & Pivot</p>
                  <p className="text-xs text-slate-400">Pivoting concepts instantly based on new crises.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Target className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-slate-200">Strategic Trading</p>
                  <p className="text-xs text-slate-400">Negotiate and exchange tech stacks to succeed.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-slate-200">Cyber Adaptation</p>
                  <p className="text-xs text-slate-400">Analyze clues and decrypt security issues.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-slate-200">MVP Pitching</p>
                  <p className="text-xs text-slate-400">Expose solutions to crowdsourced peer investors.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3D Glass card showcasing Simulation Parameters */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-950/80 border border-cyan-500/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(6,182,212,0.1)]"
              whileHover={{ y: -5, rotateX: 2, rotateY: 2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Floating micro cyber pad */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 border border-cyan-500/30 rounded-2xl hidden sm:block z-20"
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent backdrop-blur-sm rounded-2xl" />
              </motion.div>

              {/* Inner glowing layer */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />

              <div className="relative space-y-6">
                <div className="text-center pb-6 border-b border-cyan-500/10">
                  <h3 className="text-3xl mb-2 text-white font-bold">
                    Challenge Parameters
                  </h3>
                  <p className="text-cyan-400 tracking-wider text-sm font-semibold uppercase">Simulation Protocol</p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs uppercase font-semibold">Requirement</p>
                      <p className="text-slate-200 text-sm">Teams of 2 to 5 members per group</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs uppercase font-semibold">Scope</p>
                      <p className="text-slate-200 text-sm">Open to tech developers, business strategists, and designers</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs uppercase font-semibold">Day 1 Focus</p>
                      <p className="text-slate-200 text-sm">Elimination clues + Crisis simulation MVP submission</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs uppercase font-semibold">Day 2 Focus</p>
                      <p className="text-slate-200 text-sm">Carnival Exhibition, Peer pitching & Coin accumulation</p>
                    </div>
                  </div>
                </div>

                {/* Tech grid stats */}
                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-cyan-500/10">
                  <div className="px-4 py-3 rounded-xl bg-cyan-950/20 border border-cyan-500/10 text-center">
                    <p className="text-2xl text-cyan-400 mb-1 font-bold">2 Days</p>
                    <p className="text-slate-500 text-xs uppercase">Event Duration</p>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-cyan-950/20 border border-cyan-500/10 text-center">
                    <p className="text-2xl text-cyan-400 mb-1 font-bold">5 Categories</p>
                    <p className="text-slate-500 text-xs uppercase">Awards Distribution</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Holographic glowing orbits */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-64 pointer-events-none z-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border border-cyan-500/10" />
              <div className="absolute inset-8 rounded-full border border-blue-500/10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
