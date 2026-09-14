"use client";

import React, { useState } from "react";
import {
  Minus,
  Maximize2,
  X,
  Play,
  GitPullRequest,
  Plus,
} from "lucide-react";

export interface AgentCardsSpecimenProps {
  primaryColor?: string;
  canvasBg?: string;
  cardBg?: string;
  borderColor?: string;
  className?: string;
}

export function AgentCardsSpecimen({
  primaryColor = "#585a5c",
  canvasBg = "#080808",
  cardBg = "#08090a",
  borderColor = "#191d20",
  className = "",
}: AgentCardsSpecimenProps) {
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [linearExpanded, setLinearExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"agent" | "triage" | "coding">("agent");

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Card: Cursor Cloud Agent */}
        <div
          style={{ backgroundColor: cardBg, borderColor: borderColor }}
          className="rounded-2xl border p-4.5 sm:p-5 flex flex-col justify-between space-y-4 text-left shadow-2xl relative overflow-hidden group hover:border-[#2b3038] transition-all"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-[#191d20]/80 pb-3">
            <div className="flex items-center gap-2">
              {/* Cursor Prism Icon */}
              <div className="w-4 h-4 text-white flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                >
                  <polygon points="12 2 2 22 22 22" />
                </svg>
              </div>
              <span className="text-[13px] font-medium text-white tracking-[-0.01em]">Cursor</span>
            </div>
            {/* Window Controls */}
            <div className="flex items-center gap-2.5 text-[#585a5c]">
              <Minus className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
              <Maximize2
                onClick={() => setCursorExpanded(!cursorExpanded)}
                className="w-3 h-3 hover:text-white cursor-pointer transition-colors"
              />
              <X className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Prompt Bubble Container */}
          <div className="bg-[#121417] border border-[#1e2126] rounded-xl p-3.5 space-y-2.5 shadow-inner">
            <p className="text-[13px] text-white/95 leading-relaxed font-normal">
              Read .agents/DESIGN.md and implement the obsidian canvas layout with pill-shaped controls
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-[#1e2126]/60">
              <span className="w-3.5 h-3.5 rounded-full border border-[#ffe432]/60 bg-[#ffe432]/20 flex items-center justify-center text-[9px] text-[#ffe432] font-mono">
                ◐
              </span>
              <span className="text-[11px] font-mono text-white/80 font-medium">DMD-2024</span>
              <span className="text-[11px] text-[#6b6c6d]">added to context</span>
            </div>
          </div>

          {/* Activity & Reasoning Row */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#6b6c6d] font-mono text-[11px]">
              <span>Thinking...</span>
              <Play className="w-2.5 h-2.5 fill-current text-[#6b6c6d]" />
            </div>
            <p className="text-[12px] text-[#d1d1d1] leading-relaxed">
              Started working on{" "}
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#191d22] border border-[#2a2e36] text-[11px] font-mono text-white">
                <span className="text-[#ffe432]">◐</span> DMD-2024 Linear Obsidian Canvas
              </span>{" "}
              and launched coding agent.
            </p>
          </div>

          {/* Subtask / Environment Setup Pill */}
          <div className="bg-[#101215] border border-[#1b1e23] rounded-lg px-3 py-2 flex items-center justify-between text-xs text-[#8a8f98]">
            <div className="flex items-center gap-2">
              <span className="text-[#585a5c] tracking-widest text-[11px]">⠿</span>
              <span className="text-[12px] text-[#c0c4cc]">Loading tokens from designmd/linear_design.json...</span>
            </div>
            <span className="font-mono text-[11px] text-[#585a5c]">00:02</span>
          </div>
        </div>

        {/* Right Card: DesignMD v2.0 Agent */}
        <div
          style={{ backgroundColor: cardBg, borderColor: borderColor }}
          className="rounded-2xl border p-4.5 sm:p-5 flex flex-col justify-between space-y-4 text-left shadow-2xl relative overflow-hidden group hover:border-[#2b3038] transition-all"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-[#191d20]/80 pb-3">
            <div className="flex items-center gap-2">
              {/* DesignMD Circular Monogram */}
              <div className="w-4 h-4 text-white flex items-center justify-center font-bold text-xs">
                ◐
              </div>
              <span className="text-[13px] font-medium text-white tracking-[-0.01em]">DesignMD</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181a1e] border border-[#262a30] text-[#9aa0a6] font-medium">
                v2.0 Synthesizer
              </span>
            </div>
            {/* Window Controls */}
            <div className="flex items-center gap-2.5 text-[#585a5c]">
              <Minus className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
              <Maximize2
                onClick={() => setLinearExpanded(!linearExpanded)}
                className="w-3 h-3 hover:text-white cursor-pointer transition-colors"
              />
              <X className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Prompt Bubble Container */}
          <div className="bg-[#121417] border border-[#1e2126] rounded-xl p-3.5 space-y-2.5 shadow-inner">
            <p className="text-[13px] text-white/95 leading-relaxed font-normal">
              Explore https://linear.app, extract color palette and type scale into DESIGN.md
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-[#1e2126]/60">
              <span className="w-3.5 h-3.5 rounded-full border border-[#ffe432]/60 bg-[#ffe432]/20 flex items-center justify-center text-[9px] text-[#ffe432] font-mono">
                ◐
              </span>
              <span className="text-[11px] font-mono text-white/80 font-medium">DMD-2024</span>
              <span className="text-[11px] text-[#6b6c6d]">added to context</span>
            </div>
          </div>

          {/* Execution Status Row */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-[#6b6c6d] font-mono text-[11px]">
              <span>Worked for 2.4 sec</span>
              <Play className="w-2.5 h-2.5 fill-current text-[#6b6c6d]" />
            </div>
            <p className="text-[12px] text-[#d1d1d1] leading-relaxed">
              Extracted 13 semantic color tokens, 8-level typography scale, and generated live React specimens.
            </p>
          </div>

          {/* Git Diff & Pull Request Footer */}
          <div className="bg-[#121417] border border-[#1e2126] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#9aa0a6] flex items-center gap-1.5">
                <span>Generated 1 file</span>
                <span className="font-mono text-[11px] text-[#34d399] font-medium">+450 lines</span>
                <span className="font-mono text-[11px] text-[#585a5c] font-medium">0 err</span>
              </div>
              <button
                type="button"
                className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#d1d1d1] bg-[#1a1d22] hover:bg-[#252830] border border-[#2a2e36] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-2.5 h-2.5" />
                <span>Preview Spec</span>
              </button>
            </div>
            <div className="pt-1 border-t border-[#1e2126]/60">
              <div className="flex items-center gap-1.5 text-xs font-medium text-white/95">
                <GitPullRequest className="w-3.5 h-3.5 text-[#9aa0a6]" />
                <span>Exported .agents/DESIGN.md</span>
              </div>
              <p className="font-mono text-[10px] text-[#585a5c] mt-0.5">
                main ← extract/linear-design-system
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inspo Bottom Sub-Bar Links */}
      <div className="flex flex-wrap items-center justify-between pt-1 text-xs text-[#585a5c] border-t border-[#191d20]/50 px-1">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("agent")}
            className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === "agent" ? "text-[#5683da] font-medium" : "text-[#9aa0a6]"
            }`}
          >
            <span>DesignMD Agent</span>
            <Plus className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("triage")}
            className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === "triage" ? "text-[#5683da] font-medium" : "text-[#9aa0a6]"
            }`}
          >
            <span>Token Triage</span>
            <Plus className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("coding")}
            className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === "coding" ? "text-[#5683da] font-medium" : "text-[#9aa0a6]"
            }`}
          >
            <span>Coding Agent</span>
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <span className="font-mono text-[10px] text-[#585a5c]">
          DesignMD Autonomous Design System Synthesizer
        </span>
      </div>
    </div>
  );
}

export default AgentCardsSpecimen;