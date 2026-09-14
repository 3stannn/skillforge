"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    };
  }, []);

  const handleDismissNow = useCallback(() => {
    setIsFadingOut(true);
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    dismissTimeoutRef.current = setTimeout(onDismiss, 250);
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
      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
      dismissTimeoutRef.current = setTimeout(onDismiss, 180);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-full min-h-[100dvh] overflow-hidden bg-[#090a0d] transition-opacity duration-300 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <PixelSwap
        firstContent={
          /* --- FULL SCREEN HERO LANDING WITH SHOWCASE --- */
          <div
            className="w-full min-h-[100dvh] flex flex-col justify-between bg-[#090a0d] text-[#f4f5f8] relative overflow-y-auto select-none grid-container"
          >
            {/* Top Navigation Bar: single line, <= 80px */}
            <header className="relative z-20 w-full h-14 px-4 sm:px-8 flex items-center justify-between bg-[#090a0d]/90 backdrop-blur-md border-b border-[#20242f] shrink-0 sticky top-0">
              {/* Brand Typography */}
              <div className="flex items-center gap-2.5">
                <Palette className="w-5 h-5 text-[#3b82f6]" />
                <span className="text-base sm:text-lg font-semibold tracking-tight text-white">
                  DesignMD
                </span>
              </div>

              {/* Top Right Action */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="px-4 py-1.5 rounded-full bg-white hover:bg-[#e4e7ec] text-[#090a0d] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>
            </header>

            {/* Central Hero Section */}
            <main className="relative z-20 flex-1 flex flex-col items-center justify-start px-4 sm:px-8 text-center max-w-5xl mx-auto py-10 sm:py-14 w-full">
              {/* Headline: max 2 lines */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[74px] font-semibold text-white leading-[1.08] tracking-tight max-w-4xl mx-auto">
                Turn any website into a spec-compliant DESIGN.md
              </h1>

              {/* Subtitle: strictly <= 20 words */}
              <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#9ba1b0] font-normal max-w-2xl mx-auto leading-relaxed">
                Crawl any website to synthesize spec-compliant DESIGN.md specifications, live interactive specimens, and code tokens for AI coding agents.
              </p>

              {/* Dual Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="px-7 py-3 rounded-full bg-white hover:bg-[#e4e7ec] text-[#090a0d] font-semibold text-sm sm:text-[15px] flex items-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-4 h-4 text-[#090a0d]/80" />
                </button>

                <button
                  type="button"
                  onClick={() => handleLaunchWithExample(LINEAR_EXAMPLE_DESIGN_SYSTEM)}
                  className="px-6 py-3 rounded-full bg-[#161820] hover:bg-[#1e212b] text-[#f4f5f8] font-medium text-sm sm:text-[15px] border border-[#20242f] hover:border-[#3b82f6]/40 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Preview Linear Reference</span>
                </button>
              </div>

              {/* Interactive Reference Showcase */}
              <div className="w-full mt-14 mb-6 space-y-3 text-left">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-400">
                      System Architecture Preview
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                    Interactive specimens and token architecture
                  </span>
                </div>

                <DesignMDProductShowcase
                  onExploreLinear={() => handleLaunchWithExample(LINEAR_EXAMPLE_DESIGN_SYSTEM)}
                />
              </div>
            </main>

            {/* Consistent Footer */}
            <footer className="relative z-20 w-full px-6 sm:px-12 py-5 border-t border-[#20242f] bg-[#090a0d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#9ba1b0] shrink-0">
              <div>DesignMD Specification Engine</div>
              <div>Tokens for Cursor, Claude Code, Gemini, and ChatGPT</div>
            </footer>
          </div>
        }
        secondContent={
          /* --- CLEAN DARK TRANSITION --- */
          <div className="w-full h-full bg-[#090a0d]" />
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
