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

  const validateUser = async (currentUser: any) => {
    if (!currentUser || !currentUser.email?.toLowerCase().endsWith("@kiit.ac.in")) {
      setUser(null);
      if (currentUser) {
        await supabase.auth.signOut();
      }
    } else {
      setUser(currentUser);
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
    return <LoginGate onAuthSuccess={(authenticatedUser) => setUser(authenticatedUser)} />;
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
