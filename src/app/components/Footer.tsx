"use client";

import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative py-12 px-8 border-t border-cyan-500/10">
      {/* Background */}
      <div className="absolute inset-0 bg-[#020617]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Cyan accent line */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <p className="text-slate-400 text-sm">
              Designed with AI. Verified by security protocol.
            </p>
          </motion.div>

          {/* Center - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-slate-500 text-sm">
              © 2026 CPC Cyber-Tech Startup Challenge. All rights reserved.
            </p>
          </motion.div>

          {/* Right side - Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-6"
          >
            <motion.a
              href="#"
              className="text-slate-500 hover:text-cyan-400 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-slate-500 hover:text-cyan-400 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Rules & Terms
            </motion.a>
            <motion.a
              href="#about"
              className="text-slate-500 hover:text-cyan-400 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Event Support
            </motion.a>
          </motion.div>
        </div>

        {/* Tech stack mention */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-600 text-xs tracking-wider uppercase font-mono">
            Deploy node: React 18, Tailwind CSS v4, Motion & Lucide Icons
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
