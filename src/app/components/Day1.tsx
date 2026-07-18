"use client";

import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Video, Mic, Share2, HelpCircle, RefreshCw, Cpu, Layers, UserCheck, AlertTriangle } from "lucide-react";
import { useState } from "react";

// Mock database of simulation cards
const userCards = [
  { name: "Healthcare Providers", detail: "Hospitals managing real-time critical patient tracking devices." },
  { name: "Industrial Control Grids", detail: "Automated water purification and power distribution plants." },
  { name: "Autonomous Logistics Fleets", detail: "Self-driving delivery vans operating in dense urban centers." },
  { name: "Decentralized Finance Vaults", detail: "High-volume smart-contract based lending protocols." }
];

const problemCards = [
  { name: "Ransomware Lockout", detail: "Malware targeting operational telemetry systems, demanding millions." },
  { name: "Firmware Supply-Chain Hack", detail: "Malicious code injected during third-party sensor manufacturing." },
  { name: "GPS Spoofing & Redirection", detail: "Rival signals causing vehicles to veer off-course or stop." },
  { name: "Data Leak via API Leakage", detail: "Flawed authentication token validation exposing raw account records." }
];

const techCards = [
  { name: "Homomorphic Encryption", detail: "Analyze encrypted telemetry data without decrypting it at the edge." },
  { name: "Zero-Knowledge Proofs", detail: "Validate device identity and transaction validity without revealing keys." },
  { name: "Edge AI Threat Detectors", detail: "Neural network packet scanners running locally on low-power chips." },
  { name: "Consensus-Driven Ledger", detail: "Blockchain-backed immutability for system log audit trails." }
];

const crisisCards = [
  { name: "Regulatory Injunction", detail: "GDPR audit halts database sync. Remove all PII from logs immediately." },
  { name: "Budget Deletion (-50%)", detail: "Sudden funding loss. Restructure infrastructure to cut server costs in half." },
  { name: "Rival Free-Tier Launch", detail: "Competitor releases a free basic clone. You must add a unique edge instantly." },
  { name: "Hardware Constraint", detail: "Server cluster goes offline. MVP must run completely locally on a battery." }
];

export function Day1() {
  const [combo, setCombo] = useState({
    user: userCards[0],
    problem: problemCards[0],
    tech: techCards[0],
    crisis: crisisCards[0],
    isRevealed: false
  });

  const [isSpinning, setIsSpinning] = useState(false);

  const drawCombo = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const u = userCards[Math.floor(Math.random() * userCards.length)];
      const p = problemCards[Math.floor(Math.random() * problemCards.length)];
      const t = techCards[Math.floor(Math.random() * techCards.length)];
      const c = crisisCards[Math.floor(Math.random() * crisisCards.length)];
      setCombo({
        user: u,
        problem: p,
        tech: t,
        crisis: c,
        isRevealed: true
      });
      setIsSpinning(false);
    }, 800);
  };

  return (
    <section id="rounds" className="relative py-32 px-8 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-slate-900/40 to-[#020617]" />
      
      {/* Decorative cyber grid lights */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tight text-white" style={{ fontWeight: 700 }}>
            Day 1: The Crucible
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Day 1 divides the competition into a high-octane elimination investigation and a strategic business simulation.
          </p>
        </motion.div>

        {/* ROUND 1: THE INVESTIGATION */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
          <motion.div
            className="lg:col-span-6 space-y-6 text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
              ROUND 01 • ELIMINATION
            </div>
            
            <h3 className="text-4xl font-bold text-white tracking-tight">
              Round 1: The Investigation
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Teams participate simultaneously in a race against time. Clues are released across multiple formats. After decoding each clue, teams answer five Mentimeter questions, scored on both <span className="text-cyan-400 font-semibold">accuracy</span> and <span className="text-cyan-400 font-semibold">response speed</span>. 
            </p>

            <p className="text-slate-400 text-sm">
              Only the highest-ranking teams survive cumulative scoring across all phases. The remaining teams are immediately eliminated.
            </p>

            {/* Phases list */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-cyan-500/10">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-semibold text-sm">Phase I: Video Clue</h4>
                  <p className="text-xs text-slate-400 mt-1">Screened live at the venue. Live leaderboard updates trigger after each answer.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-cyan-500/10">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-semibold text-sm">Phase II: Audio Clue</h4>
                  <p className="text-xs text-slate-400 mt-1">Delivered via podcast clips, analyst calls, or customer voicemails. Combined scoring.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-cyan-500/10">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-semibold text-sm">Phase III: Social Media Clue</h4>
                  <p className="text-xs text-slate-400 mt-1">Teams hunt through fictional brand accounts, stories, and posts to extract hidden security data.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive leaderboard visualization */}
          <motion.div
            className="lg:col-span-6 p-8 rounded-3xl bg-slate-900/40 border border-cyan-500/10 backdrop-blur-md relative h-[440px] flex flex-col justify-between overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Holographic matrix background lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] bg-[size:16px_16px] opacity-5 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-center pb-4 border-b border-cyan-500/10">
              <span className="font-mono text-xs text-cyan-400">[MONITOR_ROUND1_LEADERBOARD]</span>
              <span className="text-xs text-emerald-400 font-semibold animate-pulse">• SCORING ON</span>
            </div>

            {/* List of teams */}
            <div className="space-y-4 py-6 flex-grow overflow-y-auto">
              {[
                { rank: "01", name: "Team KernelPanic", points: "4,821 pts", status: "QUALIFIED" },
                { rank: "02", name: "Team CyberFortress", points: "4,792 pts", status: "QUALIFIED" },
                { rank: "03", name: "Team ZeroTrust", points: "4,640 pts", status: "QUALIFIED" },
                { rank: "04", name: "Team PhishHunters", points: "3,810 pts", status: "ELIMINATED" },
                { rank: "05", name: "Team CryptHex", points: "3,250 pts", status: "ELIMINATED" },
              ].map((team, idx) => (
                <motion.div
                  key={team.name}
                  className={`flex items-center justify-between p-3.5 rounded-xl border ${
                    team.status === "QUALIFIED" 
                    ? "bg-cyan-950/20 border-cyan-500/20" 
                    : "bg-slate-950/40 border-red-500/10 opacity-60"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-cyan-400/70 font-semibold">{team.rank}</span>
                    <span className="text-sm font-semibold text-slate-200">{team.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-slate-400">{team.points}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      team.status === "QUALIFIED" 
                      ? "text-cyan-400 border-cyan-400/20 bg-cyan-400/5" 
                      : "text-red-400 border-red-400/20 bg-red-400/5"
                    }`}>
                      {team.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center text-[10px] text-slate-500 font-mono">
              [SYSTEM NOTE: TOP SURVIVING TEAMS PROGRESS TO SIMULATION PROTOCOL]
            </div>
          </motion.div>
        </div>


        {/* ROUND 2: STARTUP SIMULATION */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Card Game Simulator */}
          <motion.div
            className="lg:col-span-7 space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-cyan-500/10 backdrop-blur-md text-center space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/10">
                <span className="font-mono text-xs text-cyan-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> [PROTOCOL: CARD_ALLOCATION_SIM]
                </span>
                <motion.button
                  onClick={drawCombo}
                  disabled={isSpinning}
                  className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 hover:bg-cyan-950/60 transition-colors flex items-center gap-1.5 text-xs text-cyan-300 disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? "animate-spin" : ""}`} />
                  Draw Combo
                </motion.button>
              </div>

              {/* Simulation cards grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* User Card */}
                <motion.div
                  className="relative h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-cyan-500/10 p-4 flex flex-col justify-between text-left overflow-hidden cursor-pointer"
                  whileHover={{ y: -5, borderColor: "rgba(0, 240, 255, 0.3)" }}
                >
                  <UserCheck className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">User Card</p>
                    <p className="font-bold text-sm text-slate-200 mt-1 truncate">
                      {combo.isRevealed ? combo.user.name : "???"}
                    </p>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-tight">
                      {combo.isRevealed ? combo.user.detail : "Deploy simulator to draw target audience."}
                    </p>
                  </div>
                </motion.div>

                {/* Problem Card */}
                <motion.div
                  className="relative h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-cyan-500/10 p-4 flex flex-col justify-between text-left overflow-hidden cursor-pointer"
                  whileHover={{ y: -5, borderColor: "rgba(0, 240, 255, 0.3)" }}
                >
                  <ShieldAlert className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Problem Card</p>
                    <p className="font-bold text-sm text-slate-200 mt-1 truncate">
                      {combo.isRevealed ? combo.problem.name : "???"}
                    </p>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-tight">
                      {combo.isRevealed ? combo.problem.detail : "Deploy simulator to draw cybersecurity challenge."}
                    </p>
                  </div>
                </motion.div>

                {/* Tech Card */}
                <motion.div
                  className="relative h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-cyan-500/10 p-4 flex flex-col justify-between text-left overflow-hidden cursor-pointer"
                  whileHover={{ y: -5, borderColor: "rgba(0, 240, 255, 0.3)" }}
                >
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Tech Card</p>
                    <p className="font-bold text-sm text-slate-200 mt-1 truncate">
                      {combo.isRevealed ? combo.tech.name : "???"}
                    </p>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-tight">
                      {combo.isRevealed ? combo.tech.detail : "Deploy simulator to draw tech solution architecture."}
                    </p>
                  </div>
                </motion.div>

                {/* Crisis Card */}
                <motion.div
                  className="relative h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-red-500/20 p-4 flex flex-col justify-between text-left overflow-hidden cursor-pointer"
                  whileHover={{ y: -5, borderColor: "rgba(239, 68, 68, 0.3)" }}
                >
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-[10px] font-mono text-red-500/70 uppercase tracking-widest">Crisis Card</p>
                    <p className="font-bold text-sm text-slate-200 mt-1 truncate">
                      {combo.isRevealed ? combo.crisis.name : "???"}
                    </p>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-tight">
                      {combo.isRevealed ? combo.crisis.detail : "Deploy simulator to draw unexpected crisis pivot."}
                    </p>
                  </div>
                </motion.div>
              </div>

              {!combo.isRevealed && (
                <motion.button
                  onClick={drawCombo}
                  disabled={isSpinning}
                  className="w-full py-4 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  whileHover={{ scale: 1.02 }}
                >
                  {isSpinning ? "Loading Parameters..." : "Generate Startup Parameters Combo"}
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Explanation Text */}
          <motion.div
            className="lg:col-span-5 space-y-6 text-left order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
              ROUND 02 • THE SIMULATION
            </div>
            
            <h3 className="text-4xl font-bold text-white tracking-tight">
              Round 2: Startup Simulation
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Teams surviving Round 1 draw card combinations defining their startup challenge. These combinations serve as the mandatory foundation for their concepts and MVPs, urging unconventional ideation.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-200">Phase I - Card Allocation:</strong> Drawing a random set of User, Problem, and Tech cards to form a business baseline.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-200">Phase II - Trading & Negotiation:</strong> An interactive trading window to negotiate, swap, or buy cards with other groups to fit their ideal startup concepts.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-200">Phase III - Crisis Intervention:</strong> Sudden injection of a random <span className="text-red-400">Crisis Card</span> (budget cuts, regulation issues, hardware blocks) forcing a strategy pivot.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-200">Phase IV - MVP Submission:</strong> Finalizing concepts incorporating all changes, and submitting the MVP before deadline. Surviving entries advance to Day 2.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
