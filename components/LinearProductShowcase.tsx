"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Zap,
  Inbox,
  CheckSquare,
  GitPullRequest,
  FolderKanban,
  Layers,
  MoreHorizontal,
  Star,
  Link2,
  Copy,
  GitFork,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Play,
  RotateCcw,
  Maximize2,
  Minus,
  X,
  Compass,
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
      {/* Top Controls Toggle */}
      <div className="flex items-center justify-between px-2">
        <div className="inline-flex items-center gap-2 p-1 bg-[#101215] border border-[#1e2126] rounded-full text-xs">
          <button
            type="button"
            onClick={() => setViewMode("workspace")}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "workspace"
                ? "bg-[#1c1f24] text-white shadow-xs border border-[#2e333d]"
                : "text-[#8a8f98] hover:text-white"
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 text-[#5683da]" />
            <span>Product System Frame</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "cards"
                ? "bg-[#1c1f24] text-white shadow-xs border border-[#2e333d]"
                : "text-[#8a8f98] hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffe432]" />
            <span>Agent Cards View (Inspo 2)</span>
          </button>
        </div>

        {onExploreLinear && (
          <button
            type="button"
            onClick={onExploreLinear}
            className="text-xs text-[#5683da] hover:text-[#7ba2eb] flex items-center gap-1 font-mono cursor-pointer transition-colors"
          >
            <span>Preview Linear Style Reference (.agents/DESIGN.md)</span>
            <span>→</span>
          </button>
        )}
      </div>

      {viewMode === "cards" ? (
        <AgentCardsSpecimen />
      ) : (
        /* Image 1: Linear Full Product Workspace with Floating Agent Card */
        <div className="w-full bg-[#080808] border border-[#191d20] rounded-2xl overflow-hidden shadow-2xl relative text-left select-none">
          {/* Main Frame Split: Sidebar + Ticket Canvas */}
          <div className="flex flex-col md:flex-row min-h-[520px]">
            {/* Left Sidebar */}
            <div className="w-full md:w-56 bg-[#090a0c] border-b md:border-b-0 md:border-r border-[#191d20] p-3 space-y-4 shrink-0 text-xs text-[#8a8f98]">
              {/* Workspace Header */}
              <div className="flex items-center justify-between px-1.5 py-1 text-white">
                <div className="flex items-center gap-2 font-medium">
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
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer text-[#d1d1d1]">
                  <Zap className="w-3.5 h-3.5 text-[#ffe432]" />
                  <span>Pulse</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer">
                  <Compass className="w-3.5 h-3.5" />
                  <span>URL Extractor</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer">
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>My Systems</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Audits</span>
                </div>
              </div>

              {/* Workspace Section */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#585a5c] px-2">
                  Workspace
                </span>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-[#5683da]" />
                  <span>Specifications</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer">
                  <Layers className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  <span>Tokens (JSON)</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer text-[#585a5c]">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                  <span>AI Prompts</span>
                </div>
              </div>

              {/* Favorites Section */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#585a5c] px-2 flex items-center justify-between">
                  <span>Favorites</span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </span>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#16181d] text-white font-medium cursor-pointer border border-[#232730]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffe432] shadow-[0_0_6px_#ffe432]" />
                  <span className="truncate">linear.app DESIGN.md</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer text-[#8a8f98]">
                  <Sparkles className="w-3 h-3 text-[#5683da]" />
                  <span>stripe.com tokens</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer text-[#8a8f98]">
                  <Layers className="w-3 h-3 text-[#8b5cf6]" />
                  <span>apple.com vitrine</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer text-[#8a8f98]">
                  <span className="text-amber-500 font-bold">⚡</span>
                  <span>Tailwind v4 @theme</span>
                </div>
              </div>
            </div>

            {/* Main Ticket & Canvas Area */}
            <div className="flex-1 bg-[#080808] p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Ticket Top Breadcrumb & Tools */}
              <div className="flex items-center justify-between border-b border-[#191d20] pb-3 text-xs text-[#8a8f98]">
                <div className="flex items-center gap-2">
                  <span className="text-[#ffe432] font-mono font-semibold flex items-center gap-1">
                    ◐ DMD-2024
                  </span>
                  <span className="text-white font-medium">Extract linear.app design system</span>
                  <Star className="w-3 h-3 text-[#ffe432] fill-current" />
                  <MoreHorizontal className="w-3 h-3 text-[#585a5c]" />
                </div>
                <div className="flex items-center gap-3 text-[#585a5c]">
                  <span className="font-mono text-[11px]">1 / 84</span>
                  <div className="flex items-center gap-1">
                    <ChevronUp className="w-3 h-3 cursor-pointer hover:text-white" />
                    <ChevronDown className="w-3 h-3 cursor-pointer hover:text-white" />
                  </div>
                  <Link2 className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                  <Copy className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                  <GitFork className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                </div>
              </div>

              {/* Ticket Body */}
              <div className="py-4 space-y-4 max-w-2xl">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-[-0.02em]">
                    Extract linear.app design system
                  </h2>
                  <div className="text-[11px] text-[#8a8f98] flex items-center gap-1">
                    <span>Export</span>
                    <button
                      type="button"
                      className="text-[#5683da] hover:underline flex items-center gap-0.5 ml-1"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>.zip bundle</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-[#9aa0a6] leading-relaxed">
                  Deep crawl multi-route stylesheets, extract <code className="text-[#d1d1d1] bg-[#16181d] px-1.5 py-0.5 rounded border border-[#232730] font-mono text-[11px]">13 semantic color tokens</code>, compute 8-step typography scale, and synthesize spec-compliant <strong className="text-white">DESIGN.md</strong> with Tailwind v4 @theme and Cursor rules.
                </p>

                {/* Activity Feed */}
                <div className="space-y-3 pt-2 text-xs">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#585a5c]">
                    Activity
                  </div>
                  <div className="space-y-2 border-l border-[#191d20] pl-3">
                    <div className="flex items-center gap-2 text-[#8a8f98] text-[11px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#585a5c]" />
                      <span>Firecrawl crawler finished multi-route exploration of linear.app · 2min ago</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8a8f98] text-[11px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5683da]" />
                      <span>DesignMD Engine computed 13 semantic colors and 4–240px spacing scale · 1min ago</span>
                    </div>
                    <div className="bg-[#0f1013] border border-[#1a1d22] rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#8a8f98]">
                        <span className="font-semibold text-white">karri</span>
                        <span>· 4 min ago</span>
                      </div>
                      <p className="text-[12px] text-[#c0c4cc]">
                        Can we extract the full obsidian canvas palette, 9999px pill buttons, and agent prompt rules for Cursor?
                      </p>
                    </div>
                    <div className="bg-[#0f1013] border border-[#1a1d22] rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#8a8f98]">
                        <span className="font-semibold text-white">DesignMD Agent</span>
                        <span>· just now</span>
                      </div>
                      <p className="text-[12px] text-[#c0c4cc]">
                        <span className="text-[#5683da]">@karri</span> Synthesized full DESIGN.md (21KB) with 13 semantic tokens and Tailwind v4 theme. Ready to export.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Bottom-Right Autonomous Agent Window (from Image 1 & 2) */}
              <div className="w-full sm:w-96 md:absolute md:bottom-4 md:right-4 bg-[#0c0d10]/95 backdrop-blur-md border border-[#232730] rounded-2xl p-4 space-y-3 shadow-2xl mt-4 md:mt-0">
                <div className="flex items-center justify-between border-b border-[#191d20] pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-xs font-semibold">◐ DesignMD</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[#181a1e] border border-[#262a30] text-[#9aa0a6]">
                      v2.0 Synthesizer
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#585a5c]">
                    <Minus className="w-3 h-3 hover:text-white cursor-pointer" />
                    <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                    <X className="w-3 h-3 hover:text-white cursor-pointer" />
                  </div>
                </div>

                <div className="bg-[#14161a] border border-[#1e2229] rounded-xl p-2.5 space-y-1.5">
                  <p className="text-xs text-white/95 font-normal">
                    Explore https://linear.app, extract color palette and type scale into DESIGN.md
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#6b6c6d]">
                    <span className="text-[#ffe432]">◐</span>
                    <span className="font-mono text-white/80">DMD-2024</span>
                    <span>added to context</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1 text-[#6b6c6d] font-mono text-[10px]">
                    <span>Extracted in 2.4 sec</span>
                    <Play className="w-2 h-2 fill-current" />
                  </div>
                  <p className="text-[11px] text-[#d1d1d1] leading-relaxed">
                    Extracted 13 semantic color tokens, 8-level typography scale, and generated live React specimens.
                  </p>
                </div>

                <div className="bg-[#14161a] border border-[#1e2229] rounded-lg p-2 flex items-center justify-between text-[11px]">
                  <div className="text-[#9aa0a6] flex items-center gap-1">
                    <span>Generated 1 file</span>
                    <span className="font-mono text-[#34d399] font-medium">+450 lines</span>
                    <span className="font-mono text-[#585a5c] font-medium">0 err</span>
                  </div>
                  <button
                    type="button"
                    className="px-2 py-0.5 rounded-full text-[10px] text-[#d1d1d1] bg-[#1e2229] border border-[#2e333d] flex items-center gap-1"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Preview Spec</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const DesignMDProductShowcase = LinearProductShowcase;
export default LinearProductShowcase;