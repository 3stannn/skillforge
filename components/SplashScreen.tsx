"use client";

import React, { useState, useEffect, useCallback } from "react";
import PixelSwap from "./PixelSwap";
import { ArrowRight } from "lucide-react";

export interface SplashScreenProps {
  onDismiss: () => void;
}

export function SplashScreen({ onDismiss }: SplashScreenProps) {
  const [isActive, setIsActive] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleDismissNow = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(onDismiss, 250);
  }, [onDismiss]);

  const handleLaunch = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
    }
  }, [isActive]);

  // Keyboard shortcut support: ESC to dismiss, Space/Enter to launch
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismissNow();
      }
      if ((e.key === " " || e.key === "Enter") && !isActive) {
        e.preventDefault();
        handleLaunch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDismissNow, handleLaunch, isActive]);

  // When pixel swap completes, immediately dismiss to reveal workspace directly
  const handleComplete = (active: boolean) => {
    if (active) {
      setIsFadingOut(true);
      setTimeout(onDismiss, 180);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-white transition-opacity duration-300 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <PixelSwap
        firstContent={
          /* --- FULL SCREEN HERO LANDING (CLEAN UI, NO PARTICLES, CONSISTENT HEADER & FOOTER) --- */
          <div
            style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
            className="w-full h-full flex flex-col justify-between bg-white text-[#1f1f1f] relative overflow-hidden select-none"
          >
            {/* Consistent Top Navigation Bar */}
            <header className="relative z-20 w-full h-16 sm:h-20 px-6 sm:px-12 flex items-center justify-between border-b border-[#dadce0]/70 bg-white/95 backdrop-blur-md">
              {/* Brand Typography */}
              <div className="flex items-center gap-2.5">
                <span className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.035em] text-[#111111]">
                  SkillForge
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#111111]/5 text-[#5f6368] border border-[#dadce0] font-medium">
                  v1.0
                </span>
              </div>

              {/* Top Right Action */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-medium flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Launch SkillForge</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>
            </header>

            {/* Central Hero Section */}
            <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 text-center max-w-5xl mx-auto my-auto py-8">
              {/* Central Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-[#202124] bg-white/90 backdrop-blur-md border border-[#dadce0] shadow-xs mb-6 sm:mb-8 transition-transform hover:scale-105">
                <span className="w-2 h-2 rounded-full bg-[#1a73e8] animate-pulse" />
                <span>SkillForge • Universal Skill Engine</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-[#111111] leading-[1.06] tracking-[-0.035em] max-w-4xl mx-auto">
                Experience liftoff with the SkillForge agent platform
              </h1>

              {/* Subtitle */}
              <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#5f6368] font-normal max-w-2xl mx-auto leading-relaxed">
                Extract visual design tokens, interactive state machines, and behavioral contracts from any website into production <span className="font-mono font-medium text-[#111111]">SKILL.md</span> blueprints for Gemini, ChatGPT, Cursor, and Claude.
              </p>

              {/* Dual Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="group px-7 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white font-medium text-sm sm:text-[15px] flex items-center gap-2.5 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Launch SkillForge</span>
                  <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={handleLaunch}
                  className="px-6 py-3.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] font-medium text-sm sm:text-[15px] border border-[#dadce0] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Explore universal models
                </button>
              </div>
            </main>

            {/* Consistent Footer */}
            <footer className="relative z-20 w-full px-6 sm:px-12 py-5 border-t border-[#dadce0]/70 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#5f6368]">
              <div>SkillForge Engine • Google Sans Flex</div>
              <div>Universal SKILL.md (Gemini • ChatGPT • Cursor • Claude)</div>
            </footer>
          </div>
        }
        secondContent={
          /* --- CLEAN WHITE TRANSITION (NO BLACK FLASH) --- */
          <div className="w-full h-full bg-white" />
        }
        pixelSize={80}
        gap={0}
        pixelRadius={0}
        pixelScale={0.3}
        pixelSpin={0}
        duration={750}
        pixelDuration={240}
        pattern="diagonal"
        randomness={0.08}
        easing="cubic-bezier(0.16, 1, 0.3, 1)"
        fade={true}
        trigger="manual"
        active={isActive}
        onActiveChange={(newActive) => setIsActive(newActive)}
        onComplete={handleComplete}
        aspectRatio={null}
        className="w-full h-full bg-white"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
}

export default SplashScreen;
