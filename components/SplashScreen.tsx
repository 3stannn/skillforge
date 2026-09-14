"use client";

import React, { useState, useEffect, useCallback } from "react";
import PixelSwap from "./PixelSwap";
import { ArrowRight, Palette } from "lucide-react";
import { DesignMDProductShowcase } from "./LinearProductShowcase";
import { LINEAR_EXAMPLE_DESIGN_SYSTEM } from "@/lib/exampleDesignSystem";

export interface SplashScreenProps {
  onDismiss: () => void;
  onLoadExample?: (example: any) => void;
}

export function SplashScreen({ onDismiss, onLoadExample }: SplashScreenProps) {
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

  const handleLaunchWithExample = useCallback((example: any) => {
    if (onLoadExample) {
      onLoadExample(example);
    }
    handleLaunch();
  }, [onLoadExample, handleLaunch]);

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
      className={`fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-[#000000] transition-opacity duration-300 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <PixelSwap
        firstContent={
          /* --- FULL SCREEN HERO LANDING WITH SHOWCASE --- */
          <div
            style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
            className="w-full h-full flex flex-col justify-between bg-[#000000] text-[#ffffff] relative overflow-y-auto select-none grid-container"
          >
            {/* Consistent Top Navigation Bar */}
            <header className="relative z-20 w-full h-12 sm:h-14 px-4 sm:px-8 flex items-center justify-between bg-[#000000]/85 backdrop-blur-md border-b border-[#262930] shrink-0 sticky top-0">
              {/* Brand Typography */}
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#3186ff]" />
                <span className="text-base sm:text-lg font-semibold tracking-[-0.035em] text-[#ffffff]">
                  DesignMD
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121316] text-[#9aa0a6] border border-[#262930] font-medium">
                  v2.0
                </span>
              </div>

              {/* Top Right Action */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="px-4 py-1.5 rounded-full bg-[#ffffff] hover:bg-[#eff0f3] text-[#000000] text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <span>Launch DesignMD</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>
            </header>

            {/* Central Hero Section */}
            <main className="relative z-20 flex-1 flex flex-col items-center justify-start px-4 sm:px-8 text-center max-w-5xl mx-auto py-8 sm:py-12 w-full">
              {/* Central Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-[#e8eaed] bg-[#121316]/90 backdrop-blur-md border border-[#262930] shadow-md mb-6 sm:mb-8 transition-transform hover:scale-105 hover:border-[#3186ff]/50">
                <span className="w-2 h-2 rounded-full bg-[#3186ff] animate-pulse shadow-[0_0_8px_#3186ff]" />
                <span>Website → Design System</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-[#ffffff] leading-[1.06] tracking-[-0.035em] max-w-4xl mx-auto">
                Turn any website into a spec-compliant DESIGN.md
              </h1>

              {/* Subtitle */}
              <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#9aa0a6] font-normal max-w-2xl mx-auto leading-relaxed">
                Paste any URL. Explore its pages, computed styles, and typography. Get a complete <span className="font-mono font-medium text-white">DESIGN.md</span>, live specimens, and code tokens for Cursor, Claude Code, and AI coding agents.
              </p>

              {/* Dual Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="group px-7 py-3.5 rounded-full bg-[#ffffff] hover:bg-[#eff0f3] text-[#000000] font-semibold text-sm sm:text-[15px] flex items-center gap-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Launch DesignMD</span>
                  <ArrowRight className="w-4 h-4 text-[#000000]/70 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLaunchWithExample(LINEAR_EXAMPLE_DESIGN_SYSTEM)}
                  className="px-6 py-3.5 rounded-full bg-[#121316] hover:bg-[#1c1e24] text-[#e8eaed] font-medium text-sm sm:text-[15px] border border-[#262930] hover:border-[#3186ff]/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#ffe432] shadow-[0_0_6px_#ffe432]" />
                  <span>Preview Linear Reference</span>
                </button>
              </div>

              {/* Interactive Reference Showcase (Inspo 1 & 2 - DesignMD System) */}
              <div className="w-full mt-12 mb-6 space-y-3 text-left">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#585a5c]">
                      Interactive Reference Showcase
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#191d22] text-[#9aa0a6] border border-[#2a2e36]">
                      DesignMD Architecture
                    </span>
                  </div>
                  <span className="text-xs text-[#585a5c] font-mono hidden sm:inline">
                    Toggle between product workspace & autonomous agent cards
                  </span>
                </div>

                <DesignMDProductShowcase
                  onExploreLinear={() => handleLaunchWithExample(LINEAR_EXAMPLE_DESIGN_SYSTEM)}
                />
              </div>
            </main>

            {/* Consistent Footer */}
            <footer className="relative z-20 w-full px-6 sm:px-12 py-5 border-t border-[#262930] bg-[#000000] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#9aa0a6] shrink-0">
              <div>DesignMD Engine • Google Stitch Specification</div>
              <div>Universal DESIGN.md (Cursor • Claude Code • Gemini • ChatGPT)</div>
            </footer>
          </div>
        }
        secondContent={
          /* --- CLEAN DARK TRANSITION --- */
          <div className="w-full h-full bg-[#000000]" />
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
        className="w-full h-full bg-black"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
}

export default SplashScreen;
