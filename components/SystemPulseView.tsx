"use client";

import React from "react";
import { Zap, Activity, Cpu, Globe, ArrowUpRight, Clock, Layers } from "lucide-react";
import { DesignSystemData } from "@/lib/types";

export interface SystemPulseViewProps {
  currentDesign: DesignSystemData;
  onSelectSystem: (systemKey: string) => void;
}

export const SystemPulseView = React.memo(function SystemPulseView({ currentDesign, onSelectSystem }: SystemPulseViewProps) {
  return (
    <div className="space-y-6 text-left">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-[#090b0e] border border-[#1e2229] rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8a8f98]">
            <span>Synthesis Latency</span>
            <Zap className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">2.4s</div>
          <div className="text-[10px] text-blue-400 font-mono">AST stylesheet extraction</div>
        </div>

        <div className="p-4 bg-[#090b0e] border border-[#1e2229] rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8a8f98]">
            <span>Tokens Synthesized</span>
            <Layers className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {currentDesign.semanticColors?.length || 13}
          </div>
          <div className="text-[10px] text-[#8a8f98] font-mono">Semantic color tokens</div>
        </div>

        <div className="p-4 bg-[#090b0e] border border-[#1e2229] rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8a8f98]">
            <span>Crawl Coverage</span>
            <Globe className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">5 Routes</div>
          <div className="text-[10px] text-[#8a8f98] font-mono">Deep stylesheet traversal</div>
        </div>

        <div className="p-4 bg-[#090b0e] border border-[#1e2229] rounded-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8a8f98]">
            <span>Agent Compatibility</span>
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">100%</div>
          <div className="text-[10px] text-[#8a8f98] font-mono">Cursor, Claude, Gemini</div>
        </div>
      </div>

      {/* Real-time Benchmark Timeline */}
      <div className="p-5 bg-[#090b0e] border border-[#1e2229] rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Extraction Benchmarks
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#585a5c]">Reference Systems</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-[#0e1116] border border-[#1e2229] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#5e6ad2]" />
              <span className="text-white font-semibold">linear.app</span>
              <span className="text-[#8a8f98] text-[11px]">Obsidian Canvas / 13 tokens</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectSystem("linear")}
              className="text-blue-400 hover:text-blue-300 text-[11px] flex items-center gap-1 cursor-pointer font-sans"
            >
              <span>View System</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3 bg-[#0e1116] border border-[#1e2229] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#635bff]" />
              <span className="text-white font-semibold">stripe.com</span>
              <span className="text-[#8a8f98] text-[11px]">Fintech Clean / 8 tokens</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectSystem("stripe")}
              className="text-blue-400 hover:text-blue-300 text-[11px] flex items-center gap-1 cursor-pointer font-sans"
            >
              <span>View System</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3 bg-[#0e1116] border border-[#1e2229] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
              <span className="text-white font-semibold">apple.com</span>
              <span className="text-[#8a8f98] text-[11px]">Minimalist Vitrine / 5 tokens</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectSystem("apple")}
              className="text-blue-400 hover:text-blue-300 text-[11px] flex items-center gap-1 cursor-pointer font-sans"
            >
              <span>View System</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SystemPulseView;
