"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Zap,
  CheckSquare,
  FolderKanban,
  Layers,
  Star,
  Link2,
  Copy,
  GitFork,
  ChevronDown,
  Sparkles,
  Maximize2,
  Minus,
  X,
  Compass,
  Terminal as TerminalIcon,
  FileText,
  Palette,
  ShieldCheck,
  Check,
  Play,
  Eye,
} from "lucide-react";
import { AgentCardsSpecimen } from "./AgentCardsSpecimen";

export interface LinearProductShowcaseProps {
  onExploreLinear?: () => void;
  className?: string;
}

export function LinearProductShowcase({
  onExploreLinear,
  className = "",
}: LinearProductShowcaseProps) {
  const [viewMode, setViewMode] = useState<"workspace" | "cards">("workspace");

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Top Controls & Concentric Radius Indicator */}
      <div className="flex flex-wrap items-center justify-between px-2 gap-3">
        <div className="inline-flex items-center gap-1.5 p-1 bg-[#101215] border border-[#1e2126] rounded-full text-xs">
          <button
            type="button"
            onClick={() => setViewMode("workspace")}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
              viewMode === "workspace"
                ? "bg-[#1c1f24] text-white shadow-xs border-[#2e333d]"
                : "border-transparent text-[#8a8f98] hover:text-white"
            }`}
          >
            <TerminalIcon className={`w-3.5 h-3.5 ${viewMode === "workspace" ? "text-blue-400" : "text-[#8a8f98]"}`} />
            <span>Product Workspace Shell</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
              viewMode === "cards"
                ? "bg-[#1c1f24] text-white shadow-xs border-[#2e333d]"
                : "border-transparent text-[#8a8f98] hover:text-white"
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${viewMode === "cards" ? "text-blue-400" : "text-[#8a8f98]"}`} />
            <span>Agent Workspaces</span>
          </button>
        </div>

        {/* Concentric Border Radius Rule Badge (Outer R = Inner R + Padding) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono text-[11px]">
            <Check className="w-3 h-3 text-blue-400" />
            <span>Concentric Radius: Outer R (24px) = Inner R (16px) + Padding (8px)</span>
          </div>

          {onExploreLinear ? (
            <button
              type="button"
              onClick={onExploreLinear}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono cursor-pointer transition-colors"
            >
              <span>Preview Linear Style Reference (.agents/DESIGN.md)</span>
              <span>→</span>
            </button>
          ) : null}
        </div>
      </div>

      {viewMode === "cards" ? (
        <AgentCardsSpecimen />
      ) : (
        /* Outer Frame with Concentric Border Radius:
           Outer R (24px) = Inner R (16px) + Padding (8px, p-2) */
        <div className="w-full bg-[#090a0d] border border-[#20242f] rounded-[24px] p-2 shadow-2xl relative text-left select-none">
          {/* Inner Workspace Window:
             Inner R (16px) exactly fits inside 24px with 8px padding */}
          <div className="w-full bg-[#090a0d] border border-[#191d24] rounded-[16px] overflow-hidden flex flex-col md:flex-row min-h-[560px] relative">
            {/* ================================================================= */}
            {/* 1. LEFT SIDEBAR (Accurately mirrors current ProductWorkspaceShell) */}
            {/* ================================================================= */}
            <aside className="w-full md:w-56 lg:w-60 bg-[#090a0d] border-b md:border-b-0 md:border-r border-[#191d20] flex flex-col justify-between shrink-0 text-xs text-[#8a8f98] p-3 space-y-4">
              <div className="space-y-4">
                {/* Brand Header */}
                <div className="flex items-center justify-between px-1.5 py-1 text-white">
                  <div className="flex items-center gap-2 font-semibold">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center font-mono text-[10px] text-white">
                      ◐
                    </div>
                    <span>DesignMD</span>
                    <ChevronDown className="w-3 h-3 text-[#585a5c]" />
                  </div>
                  <div className="flex items-center gap-2 text-[#585a5c]">
                    <Search className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                    <Plus className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#161820] text-white font-medium border border-[#20242f] cursor-pointer">
                    <Compass className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>URL Extractor</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <FolderKanban className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>Activity & Notes</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <Zap className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>Pulse</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <CheckSquare className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>Audits</span>
                  </div>
                </div>

                {/* Workspace Section */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5e6473] px-2 block">
                    Workspace
                  </span>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>Specifications</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <Layers className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>Tokens (JSON)</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <Palette className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>Live Specimens</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <FileText className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span>AI Prompts</span>
                  </div>
                </div>

                {/* Favorites Section */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5e6473] px-2 flex items-center justify-between">
                    <span>Favorites</span>
                    <ChevronDown className="w-2.5 h-2.5" />
                  </span>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/5 text-white font-medium cursor-pointer border border-[#20242f]">
                    <Star className="w-3 h-3 text-blue-400 fill-current" />
                    <span className="truncate">linear.app</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <Star className="w-3 h-3 text-[#3b82f6]" />
                    <span className="truncate">stripe.com</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-[#8a8f98] hover:text-white cursor-pointer transition-colors">
                    <Star className="w-3 h-3 text-[#3b82f6]" />
                    <span className="truncate">apple.com</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Bottom Engine Info */}
              <div className="pt-2 border-t border-[#191d20] text-[10px] font-mono text-[#585a5c] px-2">
                DesignMD Engine
              </div>
            </aside>

            {/* ================================================================= */}
            {/* 2. MAIN CANVAS VIEW                                               */}
            {/* ================================================================= */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#090a0d] overflow-hidden relative">
              {/* Top Header Bar */}
              <header className="h-11 sm:h-12 border-b border-[#191d20] px-4 sm:px-6 flex items-center justify-between text-xs text-[#8a8f98] shrink-0 bg-[#090a0d]/90 backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <span className="text-blue-400 font-mono font-medium text-[11px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 shrink-0">
                    ACTIVE
                  </span>
                  <span className="text-white font-medium truncate">
                    Extract linear.app design system
                  </span>
                  <Star className="w-3.5 h-3.5 text-blue-400 fill-current shrink-0" />
                </div>

                <div className="flex items-center gap-3 shrink-0 text-[#585a5c]">
                  <Link2 className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                  <Copy className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                  <GitFork className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                </div>
              </header>

              {/* Navigation Tabs Bar */}
              <div className="p-4 sm:p-5 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between border-b border-[#191d20] pb-2 overflow-x-auto gap-2">
                  <div className="inline-flex items-center gap-1 p-1 bg-[#101215] border border-[#1e2126] rounded-full text-xs shrink-0">
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full font-medium bg-[#1c1f24] text-white shadow-xs border border-[#2e333d] flex items-center gap-1.5"
                    >
                      <TerminalIcon className="w-3 h-3 text-blue-400" />
                      <span>Terminal Console</span>
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full font-medium text-[#8a8f98] hover:text-white flex items-center gap-1.5"
                    >
                      <FolderKanban className="w-3 h-3 text-[#8a8f98]" />
                      <span>Activity & Notes</span>
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full font-medium text-[#8a8f98] hover:text-white flex items-center gap-1.5"
                    >
                      <FileText className="w-3 h-3 text-[#8a8f98]" />
                      <span>DESIGN.md Spec</span>
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full font-medium text-[#8a8f98] hover:text-white flex items-center gap-1.5"
                    >
                      <Layers className="w-3 h-3 text-[#8a8f98]" />
                      <span>Tokens & Colors</span>
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full font-medium text-[#8a8f98] hover:text-white flex items-center gap-1.5"
                    >
                      <Palette className="w-3 h-3 text-[#8a8f98]" />
                      <span>Live Specimens</span>
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full font-medium text-[#8a8f98] hover:text-white flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3 h-3 text-[#8a8f98]" />
                      <span>Audits</span>
                    </button>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#585a5c]">
                    <span>Target: https://linear.app</span>
                  </div>
                </div>

                {/* Terminal Console Mockup (Demonstrating Concentric Radii: Outer 14px -> Inner 10px) */}
                <div className="w-full bg-[#050608] border border-[#1e2229] rounded-[14px] overflow-hidden shadow-2xl font-mono text-xs p-1.5">
                  <div className="rounded-[10px] overflow-hidden border border-[#191d24]">
                    {/* Terminal Titlebar */}
                    <div className="flex items-center justify-between px-3.5 py-2 bg-[#090b0e] border-b border-[#1e2229] text-[#8a8f98]">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="text-[#d1d1d1] font-semibold text-[11px] ml-2 flex items-center gap-1.5">
                          <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
                          <span>designmd-cli</span>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#16191f] text-[#9aa0a6] border border-[#232731]">
                          engine
                        </span>
                      </div>

                      <div className="inline-flex items-center bg-[#050608] border border-[#1e2229] rounded-full p-0.5 text-[10px]">
                        <span className="px-2 py-0.5 rounded-full bg-[#191d24] text-blue-400 border border-blue-500/30 font-semibold flex items-center gap-1">
                          <Compass className="w-2.5 h-2.5 text-blue-400" />
                          <span>--deep (5 pages)</span>
                        </span>
                      </div>
                    </div>

                    {/* Interactive Prompt Line */}
                    <div className="px-3.5 py-2.5 bg-[#0a0c10] border-b border-[#1e2229] flex items-center gap-2">
                      <span className="text-blue-400 font-bold select-none text-sm">❯</span>
                      <span className="text-[#8a8f98] select-none text-xs">designmd extract</span>
                      <span className="text-white font-mono text-xs flex-1">
                        https://linear.app --mode=deep --synthesize=DESIGN.md
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-white text-black text-xs font-semibold flex items-center gap-1 shadow-xs">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Run [↵]</span>
                      </span>
                    </div>

                    {/* Terminal Stdout Logs */}
                    <div className="p-3.5 space-y-1.5 bg-[#050608] text-[#9aa0a6] font-mono text-[11px] leading-relaxed">
                      <div className="flex items-center gap-2">
                        <span className="text-[#43474e]">[21:05:12]</span>
                        <span className="text-white font-semibold">❯ Initializing multi-route crawler for https://linear.app...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#43474e]">[21:05:13]</span>
                        <span className="text-[#34d399]">[Step 1/4] Crawled 5 routes on linear.app · completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#43474e]">[21:05:13]</span>
                        <span className="text-[#34d399]">[Step 2/4] Extracted 13 semantic color tokens, 8-level typography scale</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#43474e]">[21:05:14]</span>
                        <span className="text-blue-400 font-semibold">[Step 3/4] Applied Concentric Radius Formula: Outer R (24px) = Inner R (16px) + Padding (8px)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#43474e]">[21:05:14]</span>
                        <span className="text-[#34d399]">[Step 4/4] Synthesized spec-compliant DESIGN.md with Tailwind v4 @theme</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================================= */}
              {/* 3. DOCKED FLOATING AGENT CARD (Concentric: Outer 20px -> Inner 8px) */}
              {/* ================================================================= */}
              <div className="w-full sm:w-[380px] md:absolute md:bottom-4 md:right-4 bg-[#090a0d] border border-[#1e222a] rounded-[20px] p-3 shadow-2xl space-y-2.5 z-30">
                {/* Top Window Bar */}
                <div className="flex items-center justify-between border-b border-[#1e222a] pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center font-mono text-[10px] text-white">
                      ◐
                    </div>
                    <span className="text-xs font-semibold text-white">DesignMD</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#16191f] text-[#8a8f98] border border-[#232731]">
                      Synthesizer
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#585a5c]">
                    <Minus className="w-3 h-3 hover:text-white cursor-pointer" />
                    <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                    <X className="w-3 h-3 hover:text-white cursor-pointer" />
                  </div>
                </div>

                {/* Prompt Bubble Container (Inner R = 20px - 12px = 8px) */}
                <div className="bg-[#0e1014] border border-[#1e2229] rounded-[8px] p-2.5 space-y-1.5">
                  <p className="text-xs text-white leading-relaxed">
                    Extracted tokens and computed type scale for https://linear.app
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 border-t border-[#1e2229]/60">
                    <span className="w-3.5 h-3.5 rounded-full border border-blue-500/60 bg-blue-500/20 flex items-center justify-center text-[9px] text-blue-400 font-mono">
                      ◐
                    </span>
                    <span className="text-[10px] font-mono text-white/80 font-medium">linear-tokens</span>
                    <span className="text-[10px] text-[#6b6c6d]">active context</span>
                  </div>
                </div>

                {/* Execution Details */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1 text-[#6b6c6d] font-mono text-[11px]">
                    <span className="text-blue-400">Extraction completed</span>
                  </div>
                  <p className="text-[11px] text-[#8a8f98] leading-relaxed">
                    Extracted 13 semantic color tokens, 8-level typography scale.
                  </p>
                </div>

                {/* Footer Bar */}
                <div className="pt-2 border-t border-[#1e222a] flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-[#6b6c6d]">
                    DESIGN.md <span className="text-[#34d399]">450 lines</span>
                  </span>

                  <button
                    type="button"
                    className="px-2.5 py-1 rounded-md bg-[#16191f] text-white hover:bg-[#20242c] border border-[#232731] hover:border-blue-500/40 transition-all flex items-center gap-1 cursor-pointer text-[11px]"
                  >
                    <Eye className="w-3 h-3 text-blue-400" />
                    <span>Preview Spec</span>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export const DesignMDProductShowcase = LinearProductShowcase;
export default LinearProductShowcase;