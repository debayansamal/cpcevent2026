"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { LoginGate } from "./components/LoginGate";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Awards } from "./components/Awards";
import { Day1 } from "./components/Day1";
import { Day2 } from "./components/Day2";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  const validateUser = async (currentUser: any) => {
    if (!currentUser || !currentUser.email?.toLowerCase().endsWith("@kiit.ac.in")) {
      setUser(null);
      if (currentUser) {
        setAuthError("Access Denied: Only @kiit.ac.in email domains are permitted to login.");
        await supabase.auth.signOut();
      }
    } else {
      setUser(currentUser);
      setAuthError("");
    }
    setCheckingAuth(false);
  };

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      validateUser(session?.user ?? null);
    });

    // Listen to changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      validateUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-[#020617] text-slate-100">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">
            Loading Secure Module...
          </p>
        </div>
      </div>
    );
  }

  // If user is not authenticated or does not match @kiit.ac.in, render the Google LoginGate
  if (!user) {
    return (
      <LoginGate
        authError={authError}
        setAuthError={setAuthError}
        onAuthSuccess={(authenticatedUser) => setUser(authenticatedUser)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Dark blue marble background texture with overlay blending */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay z-0" 
        style={{
          backgroundImage: "url('/src/assets/dark_blue_marble_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* Global glowing background lights (neon cyan & indigo) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px] animate-pulse delay-1000" />
      </div>

      {/* Floating Header Welcome Card */}
      <header className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
        {/* Left Logo */}
        <div className="pointer-events-auto bg-slate-950/40 border border-white/5 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-slate-300 uppercase font-semibold">
            CPC COLLAB 2026
          </span>
        </div>

        {/* Right Welcome User Card */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-950/50 border border-white/5 backdrop-blur-md p-1.5 pr-4 rounded-full shadow-lg">
          {user.user_metadata?.avatar_url ? (
            <img 
              src={user.user_metadata.avatar_url} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full border border-cyan-500/20"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center font-bold text-xs text-cyan-400">
              {user.email[0].toUpperCase()}
            </div>
          )}
          
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-white leading-tight">
              Welcome, {user.user_metadata?.full_name || user.email.split('@')[0]}
            </span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
                setAuthError("");
              }}
              className="text-[9px] font-mono text-slate-500 hover:text-red-400 transition-colors text-left font-bold uppercase mt-0.5 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Day1 />
        <Day2 />
        <Awards />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
