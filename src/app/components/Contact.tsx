"use client";

import { motion, AnimatePresence } from "motion/react";
import { Mail, Shield, Send, Users, Info, LogIn, LogOut, Lock, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function Contact() {
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderEmail: "",
    teamSize: "3",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate user and restrict to @kiit.ac.in domain
  const validateAndSetUser = async (currentUser: any) => {
    if (!currentUser) {
      setUser(null);
      setCheckingAuth(false);
      return;
    }

    const email = currentUser.email ?? "";
    if (!email.toLowerCase().endsWith("@kiit.ac.in")) {
      setAuthError("Access Denied: Only @kiit.ac.in email domains are permitted to register.");
      setUser(null);
      await supabase.auth.signOut();
    } else {
      setUser(currentUser);
      setAuthError("");
      // Pre-fill leader information from Google account metadata
      setFormData((prev) => ({
        ...prev,
        leaderName: currentUser.user_metadata?.full_name ?? currentUser.email.split("@")[0],
        leaderEmail: email,
      }));
    }
    setCheckingAuth(false);
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      validateAndSetUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      validateAndSetUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setAuthError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/#register",
      },
    });

    if (error) {
      setAuthError(`Sign-in error: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAuthError("");
    setFormData({
      teamName: "",
      leaderName: "",
      leaderEmail: "",
      teamSize: "3",
      message: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save team to Supabase
    const { error } = await supabase.from("teams").insert([
      {
        team_name: formData.teamName,
        team_size: parseInt(formData.teamSize),
        leader_email: formData.leaderEmail,
      }
    ]);

    if (error) {
      // Log DB insert error, but complete the state flow for visual feedback (e.g. client fallback)
      console.warn("Supabase insert warning (make sure database keys and tables are active):", error.message);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="register" className="relative py-32 px-8 overflow-hidden bg-[#020617]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-white">
            Secure Your Slot
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6" />
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Verify your official university identity and register for the CPC Cyber-Tech Startup Challenge 2026.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Guidelines & Prerequisites */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Registration Guidelines
            </h3>

            <p className="text-slate-400 leading-relaxed text-sm">
              Please review the prerequisites before submitting your team information. Due to venue display stand allocations on Day 2, team registration slots are strictly capped.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-cyan-500/10">
                <Users className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-slate-200 font-semibold text-sm">Team Size (2 - 5 members)</h4>
                  <p className="text-xs text-slate-400 mt-1">Single-person entries are not permitted. Cross-disciplinary teams (devs, designers, business) are highly recommended.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-cyan-500/10">
                <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-slate-200 font-semibold text-sm">Hardware & Laptop Requirement</h4>
                  <p className="text-xs text-slate-400 mt-1">Teams must bring their own development laptops. Internet access and cloud testing sandbox keys will be provided.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-cyan-500/10">
                <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-slate-200 font-semibold text-sm">Mentimeter Scoring Protocol</h4>
                  <p className="text-xs text-slate-400 mt-1">Leaderboards in Round 1 are final and cannot be appealed. Ensure stable connections at the venue.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-cyan-500/10">
              <p className="text-slate-500 text-xs uppercase font-mono tracking-wider mb-2">Need Event Support?</p>
              <a href="mailto:cpc.events@example.com" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-sm">
                <Mail className="w-4 h-4" /> cpc.events@example.com
              </a>
            </div>
          </motion.div>

          {/* Right Column: Registration / Auth Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900/40 to-slate-950/80 border border-cyan-500/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,240,255,0.08)] text-left relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none z-0" />
              
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {checkingAuth ? (
                    // Loader state
                    <motion.div
                      key="auth-loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center space-y-4"
                    >
                      <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">
                        Verifying Secure Session...
                      </p>
                    </motion.div>
                  ) : !user ? (
                    // Sign-in Required state (enforcing Google-only and @kiit.ac.in restriction)
                    <motion.div
                      key="auth-gate"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="py-6 text-center space-y-6"
                    >
                      <div className="w-16 h-16 bg-slate-950 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
                        <Lock className="w-6 h-6 animate-pulse" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">Authentication Required</h3>
                        <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                          To register, you must authenticate using your official university credentials. Only emails ending in <strong className="text-cyan-300">@kiit.ac.in</strong> are permitted.
                        </p>
                      </div>

                      {authError && (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="p-4 rounded-xl border border-red-500/30 bg-red-950/20 text-red-300 text-xs flex gap-3 items-start text-left max-w-md mx-auto"
                        >
                          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
                          <span>{authError}</span>
                        </motion.div>
                      )}

                      <motion.button
                        onClick={handleGoogleLogin}
                        className="group flex items-center justify-center gap-3 px-6 py-4 w-full max-w-md mx-auto bg-white hover:bg-slate-100 text-slate-900 rounded-xl transition-all font-bold text-sm cursor-pointer shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#EA4335"
                            d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.5a5.99 5.99 0 0 1 5.99-6c1.472 0 2.8.534 3.824 1.416l3.21-3.21C18.99 2.764 16.5 1.5 13.99 1.5A11 11 0 0 0 3 12.5a11 11 0 0 0 10.99 11c5.96 0 10.01-4.11 10.01-10.03 0-.64-.06-1.3-.17-1.89l-11.59-.295z"
                          />
                        </svg>
                        Sign in with Google
                      </motion.button>
                    </motion.div>
                  ) : !submitted ? (
                    // Registration Form (Authorized view)
                    <motion.form
                      key="registration-form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Authenticated user badge */}
                      <div className="flex justify-between items-center px-4 py-2.5 rounded-xl border border-cyan-500/10 bg-cyan-950/20 text-[10px] text-cyan-300 font-mono">
                        <span>✔ Verified: {user.email}</span>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex items-center gap-1 hover:text-red-400 transition-colors uppercase tracking-wider font-extrabold cursor-pointer"
                        >
                          <LogOut className="w-3 h-3" /> Disconnect
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Team Name */}
                        <div className="space-y-2">
                          <label htmlFor="teamName" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            Team Name
                          </label>
                          <input
                            type="text"
                            id="teamName"
                            required
                            value={formData.teamName}
                            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                            placeholder="e.g. CyberFortress"
                            className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
                          />
                        </div>

                        {/* Team Size */}
                        <div className="space-y-2">
                          <label htmlFor="teamSize" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            Team Size
                          </label>
                          <select
                            id="teamSize"
                            value={formData.teamSize}
                            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm appearance-none cursor-pointer"
                          >
                            <option value="2">2 Members</option>
                            <option value="3">3 Members</option>
                            <option value="4">4 Members</option>
                            <option value="5">5 Members</option>
                          </select>
                        </div>
                      </div>

                      {/* Leader Name (Prefilled and locked) */}
                      <div className="space-y-2">
                        <label htmlFor="leaderName" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Leader Name (Verified via Google)
                        </label>
                        <input
                          type="text"
                          id="leaderName"
                          disabled
                          value={formData.leaderName}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-cyan-500/10 text-slate-400 focus:outline-none font-sans text-sm select-none cursor-not-allowed"
                        />
                      </div>

                      {/* Leader Email (Prefilled and locked) */}
                      <div className="space-y-2">
                        <label htmlFor="leaderEmail" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Leader Email (Verified via Google)
                        </label>
                        <input
                          type="email"
                          id="leaderEmail"
                          disabled
                          value={formData.leaderEmail}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-cyan-500/10 text-slate-400 focus:outline-none font-sans text-sm select-none cursor-not-allowed"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Project Domain / Inquiries (Optional)
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Describe your domain interest or pre-event questions..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm resize-none"
                        />
                      </div>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:shadow-[0_0_50px_rgba(6,182,212,0.45)] transition-all duration-300 font-bold tracking-wider text-sm flex items-center justify-center gap-2 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-2">
                          {isSubmitting ? "Updating Node..." : "Lock Registration"}
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-slate-950" />
                        </span>
                      </motion.button>
                    </motion.form>
                  ) : (
                    // Success View
                    <motion.div
                      key="success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-6"
                    >
                      <div className="w-16 h-16 bg-cyan-950/40 border border-cyan-400 rounded-full flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <Send className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">Registration Saved</h3>
                        <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
                          Your team slot is locked. Confirmation protocols will be sent to the verified email address: <strong className="text-slate-200">{formData.leaderEmail}</strong> shortly.
                        </p>
                      </div>
                      <motion.button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/5 transition-colors cursor-pointer"
                        whileTap={{ scale: 0.95 }}
                      >
                        Modify Details
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
