"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Cpu } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function LoginGate({ onAuthSuccess }: { onAuthSuccess: (user: any) => void }) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track cursor position to update pupil offset and tilt positions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - window.innerWidth / 2;
      const dy = e.clientY - window.innerHeight / 2;
      const angle = Math.atan2(dy, dx);
      
      // Limit pupil motion to a maximum offset of 5 pixels
      const maxOffset = 5;
      const distance = Math.min(maxOffset, Math.sqrt(dx * dx + dy * dy) * 0.015);
      
      setPupilOffset({
        x: distance * Math.cos(angle),
        y: distance * Math.sin(angle)
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      validateUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      validateUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const validateUser = async (currentUser: any) => {
    if (!currentUser) {
      setIsSubmitting(false);
      return;
    }

    const email = currentUser.email ?? "";
    if (!email.toLowerCase().endsWith("@kiit.ac.in")) {
      setAuthError("Access Denied: Only @kiit.ac.in email domains are permitted to login.");
      setIsSubmitting(false);
      await supabase.auth.signOut();
    } else {
      setAuthError("");
      setIsSubmitting(false);
      onAuthSuccess(currentUser);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError("");
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setAuthError(`Sign-in error: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-[#020617] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.04)_0%,transparent_75%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.015)_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] z-0 pointer-events-none" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[940px] h-auto md:h-[520px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_80px_rgba(0,240,255,0.06)] grid md:grid-cols-2"
      >
        {/* LEFT COLUMN: Character Parallax Illustration (Dark Cyber Styling) */}
        <div className="relative w-full h-[280px] md:h-full bg-slate-900/40 border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-center overflow-hidden p-6 select-none">
          {/* Internal gradient light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-[80px]" />

          {/* Character Stack */}
          <div className="relative w-[340px] h-[250px] mt-8 overflow-visible">
            {/* 1. Tall Indigo Block (Positioned at Back) */}
            <motion.div
              style={{
                x: pupilOffset.x * 0.6,
                y: pupilOffset.y * 0.4,
              }}
              className="absolute left-[70px] bottom-0 w-24 h-48 bg-indigo-600 rounded-2xl flex flex-col justify-start items-center pt-8 shadow-lg z-0"
            >
              <div className="flex gap-4 mb-3">
                {/* Eye 1 */}
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-3 h-3 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
                {/* Eye 2 */}
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-3 h-3 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
              </div>
              {/* Mouth */}
              <div className="w-4 h-1.5 rounded-full bg-slate-950 opacity-80" />
            </motion.div>

            {/* 2. Slate/Black Security Mainframe Block (Middle) */}
            <motion.div
              style={{
                x: pupilOffset.x * -0.4,
                y: pupilOffset.y * -0.2,
              }}
              className="absolute left-[165px] bottom-0 w-20 h-36 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-start items-center pt-6 shadow-xl z-10"
            >
              <div className="flex gap-3 mb-2">
                {/* Eye 1 */}
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
                {/* Eye 2 */}
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 3. Orange Blob (Bottom Left Front) */}
            <motion.div
              style={{
                x: pupilOffset.x * 0.9,
                y: pupilOffset.y * 0.7,
              }}
              className="absolute left-0 bottom-0 w-44 h-24 bg-orange-500 rounded-t-[70px] flex flex-col justify-start items-center pt-6 shadow-2xl z-20"
            >
              <div className="flex gap-8 mb-2">
                {/* Eye 1 */}
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
                {/* Eye 2 */}
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
              </div>
              {/* Small Smile */}
              <div className="w-4.5 h-2 rounded-b-full bg-slate-950 opacity-80" />
            </motion.div>

            {/* 4. Yellow Shield-Blob Block (Bottom Right Front) */}
            <motion.div
              style={{
                x: pupilOffset.x * -0.6,
                y: pupilOffset.y * -0.5,
              }}
              className="absolute left-[215px] bottom-0 w-24 h-28 bg-yellow-500 rounded-tr-[45px] rounded-tl-md flex flex-col justify-start items-center pt-5 shadow-2xl z-30"
            >
              <div className="flex gap-4 mb-2">
                {/* Eye 1 */}
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
                {/* Eye 2 */}
                <div className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center relative">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-slate-950 absolute"
                    style={{ transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)` }}
                  />
                </div>
              </div>
              {/* Flat mouth */}
              <div className="w-6 h-0.75 bg-slate-950 opacity-80 mt-1 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: Google Sign-In Form (Theme Color scheme) */}
        <div className="relative w-full h-full flex flex-col justify-between p-10 md:p-12 text-left">
          {/* Logo icon */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              CPC CYBER-TECH 2026
            </span>
          </div>

          {/* Core Sign-In block */}
          <div className="space-y-6 my-auto">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Welcome back!
              </h1>
              <p className="text-slate-400 text-xs leading-relaxed">
                Sign in with your university Google credentials to access your dashboard and event registration details.
              </p>
            </div>

            {/* Access denied Error Banner */}
            <AnimatePresence>
              {authError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl border border-red-500/30 bg-red-950/20 text-red-300 text-xs flex gap-3 items-start text-left overflow-hidden"
                >
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{authError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign-In Action (Only Auth provider permitted) */}
            <div className="space-y-3 pt-2">
              <motion.button
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-3 px-6 py-4 w-full bg-white hover:bg-slate-100 text-slate-900 rounded-xl transition-all font-bold text-sm cursor-pointer shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.5a5.99 5.99 0 0 1 5.99-6c1.472 0 2.8.534 3.824 1.416l3.21-3.21C18.99 2.764 16.5 1.5 13.99 1.5A11 11 0 0 0 3 12.5a11 11 0 0 0 10.99 11c5.96 0 10.01-4.11 10.01-10.03 0-.64-.06-1.3-.17-1.89l-11.59-.295z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center gap-2 border-t border-white/5 pt-4 text-[10px] text-slate-500 font-mono">
            <Shield className="w-3.5 h-3.5 text-cyan-500/40" />
            <span>Identity verification restricted to @kiit.ac.in domains.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
