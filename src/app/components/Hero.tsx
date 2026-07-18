"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// Decrypting Text Animation Component
export function DecryptText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+=[]{}|;:,.<>?";

  useEffect(() => {
    let isMounted = true;
    const startTimeout = setTimeout(() => {
      let iterations = 0;
      const interval = setInterval(() => {
        if (!isMounted) return;
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        if (iterations >= text.length) {
          clearInterval(interval);
        }
        iterations += 1 / 2; // Speed of decryption
      }, 25);
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}

// Side floating glassmorphism card styled like the voxelo.ai dashboard card
function CyberMetricsCard() {
  return (
    <div className="w-full max-w-[340px] rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.03)] font-sans text-left z-20">
      {/* 3 columns of stats */}
      <div className="grid grid-cols-3 gap-2 pb-6 border-b border-white/5 text-center">
        <div>
          <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight">2 Days</div>
          <div className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-1">Duration</div>
        </div>
        <div>
          <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight">2-5</div>
          <div className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-1">Team Size</div>
        </div>
        <div>
          <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight">Weighted</div>
          <div className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-1">Voting</div>
        </div>
      </div>

      {/* List items with bullet points */}
      <ul className="space-y-4 pt-6 text-[11px] text-slate-400 font-medium">
        <li className="flex gap-3 items-start">
          <div className="w-4 h-4 rounded-md border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 bg-cyan-950/30 flex-shrink-0 mt-0.5">
            ➔
          </div>
          <span>Weighted coin investment system for interactive peer voting.</span>
        </li>
        <li className="flex gap-3 items-start">
          <div className="w-4 h-4 rounded-md border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 bg-cyan-950/30 flex-shrink-0 mt-0.5">
            ➔
          </div>
          <span>Day 1 Round 1 Investigation & Round 2 Combo Card Simulation.</span>
        </li>
        <li className="flex gap-3 items-start">
          <div className="w-4 h-4 rounded-md border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 bg-cyan-950/30 flex-shrink-0 mt-0.5">
            ➔
          </div>
          <span>Day 2 Innovation Carnival exhibition & live pitching arena.</span>
        </li>
      </ul>
    </div>
  );
}

export function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Group container for the 3D model
    const padlockGroup = new THREE.Group();
    scene.add(padlockGroup);

    // 1. Padlock Body
    const bodyGeometry = new THREE.BoxGeometry(2.3, 1.9, 0.9);
    const bodyWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const bodySolidMaterial = new THREE.MeshPhongMaterial({
      color: 0x0f172a,
      emissive: 0x001d2d,
      transparent: true,
      opacity: 0.5,
      shininess: 90,
    });
    const padlockBodySolid = new THREE.Mesh(bodyGeometry, bodySolidMaterial);
    const padlockBodyWire = new THREE.Mesh(bodyGeometry, bodyWireMaterial);
    padlockGroup.add(padlockBodySolid);
    padlockGroup.add(padlockBodyWire);

    // 2. Padlock Shackle
    const shackleGeometry = new THREE.TorusGeometry(0.8, 0.16, 16, 48, Math.PI);
    const shackleWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const shackleSolidMaterial = new THREE.MeshPhongMaterial({
      color: 0x0f172a,
      emissive: 0x001d2d,
      transparent: true,
      opacity: 0.5,
    });
    const shackleSolid = new THREE.Mesh(shackleGeometry, shackleSolidMaterial);
    const shackleWire = new THREE.Mesh(shackleGeometry, shackleWireMaterial);
    shackleSolid.position.y = 0.95;
    shackleWire.position.y = 0.95;
    padlockGroup.add(shackleSolid);
    padlockGroup.add(shackleWire);

    // 3. Shackle straight bars
    const barGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.5, 16);
    const leftBar = new THREE.Mesh(barGeom, shackleSolidMaterial);
    leftBar.position.set(-0.8, 0.85, 0);
    const rightBar = new THREE.Mesh(barGeom, shackleSolidMaterial);
    rightBar.position.set(0.8, 0.85, 0);
    padlockGroup.add(leftBar);
    padlockGroup.add(rightBar);

    // 4. Central Keyhole
    const keyholeGeom = new THREE.CylinderGeometry(0.18, 0.18, 1.0, 16);
    keyholeGeom.rotateX(Math.PI / 2);
    const keyholeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.8,
    });
    const keyhole = new THREE.Mesh(keyholeGeom, keyholeMaterial);
    keyhole.position.set(0, -0.1, 0.05);
    padlockGroup.add(keyhole);

    // 5. Orbiting Rings
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const ringGeometry = new THREE.RingGeometry(3.1, 3.14, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRing = new THREE.Mesh(ringGeometry, ringMaterial);
    orbitGroup.add(orbitRing);

    // Secondary smaller tilted ring
    const ringGeometry2 = new THREE.RingGeometry(2.6, 2.63, 64);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    const orbitRing2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    orbitRing2.rotation.x = Math.PI / 3;
    orbitGroup.add(orbitRing2);

    // 6. Particles system
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.8 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      colors[i * 3] = 0.0;
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // Cyan green hues
      colors[i * 3 + 2] = 1.0;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.5, "rgba(0,240,255,0.7)");
      grad.addColorStop(1, "rgba(0,240,255,0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    orbitGroup.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 1.2);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // Mouse Parallax calculation
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resizing
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Constant rotations
      padlockGroup.rotation.y = time * 0.08;
      orbitGroup.rotation.y = -time * 0.04;
      orbitGroup.rotation.z = time * 0.02;

      // Parallax rotation adjustments based on cursor position
      const targetRotX = mouseRef.current.y * 0.4;
      const targetRotY = mouseRef.current.x * 0.4;

      padlockGroup.rotation.x += (targetRotX - padlockGroup.rotation.x) * 0.07;
      padlockGroup.rotation.y += (targetRotY - (padlockGroup.rotation.y % (Math.PI * 2))) * 0.07;
      orbitGroup.rotation.x += (targetRotX - orbitGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeometry.dispose();
      bodyWireMaterial.dispose();
      bodySolidMaterial.dispose();
      shackleGeometry.dispose();
      shackleWireMaterial.dispose();
      shackleSolidMaterial.dispose();
      barGeom.dispose();
      keyholeGeom.dispose();
      keyholeMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      particleGeometry.dispose();
      particleTexture.dispose();
      particleMaterial.dispose();
    };
  }, []);

  const synonyms = [
    "STARTUP CHALLENGE",
    "INNOVATION ARENA",
    "SECURITY SHOWDOWN",
    "VENTURE CRUCIBLE",
    "FOUNDERS SPRINT"
  ];
  
  const [synonymIndex, setSynonymIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSynonymIndex((prev) => (prev + 1) % synonyms.length);
    }, 2500); // Cycles every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 bg-[#020617]">
      {/* Background neon lights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Code grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.025)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,black_80%,transparent)] z-0 pointer-events-none" />

      {/* 3D Holographic Padlock Canvas sitting directly BEHIND the text */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70" />

      {/* Centered Headline Content Layer sitting ON TOP of the 3D model */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2.5 mb-8 rounded-full bg-cyan-950/40 border border-cyan-500/25 backdrop-blur-md">
            <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-[10px] tracking-widest font-extrabold text-cyan-300 uppercase">
              CPC Big Event • Day 1 & Day 2
            </span>
          </div>

          {/* Centered Large Headline - Styled like the Coffee Roasting title (slightly smaller) */}
          <h1 className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 uppercase leading-[1.1] drop-shadow-[0_0_40px_rgba(0,240,255,0.12)]">
            <DecryptText text="CPC CYBER-TECH" delay={100} className="block text-white animate-fade-in" />
            <span className="block h-[1.25em] relative overflow-hidden w-full max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.span
                  key={synonyms[synonymIndex]}
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -22, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-x-0 bg-gradient-to-r from-cyan-400 via-cyan-100 to-blue-500 bg-clip-text text-transparent block"
                >
                  <DecryptText text={synonyms[synonymIndex]} delay={50} />
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed mb-10 font-sans px-4">
            An elite multi-stage simulation designed to test your entrepreneurial mindset, tactical adaptability, and crisis resolution under cybersecurity incident constraints.
          </p>

          {/* Action CTAs - pointer-events-auto so they are clickable on top of the pointer-events-none background */}
          <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
            <motion.button
              onClick={() => scrollToSection("rounds")}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:shadow-[0_0_55px_rgba(0,240,255,0.45)] transition-all duration-300 font-extrabold tracking-wider text-sm cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex items-center justify-center gap-2">
                Explore the Rounds
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("register")}
              className="group px-8 py-4 rounded-xl border-2 border-cyan-500/30 bg-cyan-950/15 backdrop-blur-md hover:bg-cyan-950/30 hover:border-cyan-500/50 transition-all duration-300 font-bold text-cyan-300 tracking-wider text-sm cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                Register Team
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Glassmorphic Metric Panel - Floating in the bottom-right corner for desktop (exactly like voxelo.ai's panel layout) */}
      <div className="absolute bottom-10 right-10 hidden xl:block z-30 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <CyberMetricsCard />
        </motion.div>
      </div>

      {/* Inline Metric Panel - Shown underneath for smaller screen widths where absolute floating isn't viable */}
      <div className="absolute bottom-6 left-6 right-6 block xl:hidden z-20 max-w-sm mx-auto opacity-0 md:opacity-100">
        {/* On smaller tablets, render a small inline stats summary instead of the full card */}
        <div className="flex justify-between items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-slate-950/50 backdrop-blur-md text-[10px] text-slate-400 font-mono">
          <span>📅 DURATION: 2 DAYS</span>
          <span>👥 TEAM: 2 - 5 MEMBERS</span>
          <span>🪙 VOTES: WEIGHTED COINS</span>
        </div>
      </div>

      {/* Centered Scroll indicator at the bottom */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-20 hidden md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollToSection("about")}
      >
        <div className="w-6 h-9 rounded-full border-2 border-cyan-500/25 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
