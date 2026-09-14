"use client";

import React, { useState, useMemo } from "react";
import {
  Copy,
  Check,
  Download,
  Sparkles,
  ArrowRight,
  Code2,
  FileCode,
  Sliders,
  Layers,
} from "lucide-react";
import { DesignSystemData } from "@/lib/types";
import { AgentCardsSpecimen } from "./AgentCardsSpecimen";

export interface LiveSpecimenViewerProps {
  design: DesignSystemData;
}

export function LiveSpecimenViewer({ design }: LiveSpecimenViewerProps) {
  const [activeTab, setActiveTab] = useState<"specimens" | "tailwind" | "css" | "json" | "tsx">("specimens");
  const [copied, setCopied] = useState(false);
  const [inputText, setInputText] = useState("");

  const colorsByRole = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of design.semanticColors) {
      map.set(c.role, c.hex);
    }
    return map;
  }, [design.semanticColors]);

  const primaryColor = colorsByRole.get("primary") || "#3b82f6";
  const bg = colorsByRole.get("background") || "#08090a";
  const surface = colorsByRole.get("surface") || "#0f1011";
  const text = colorsByRole.get("text") || "#ffffff";
  const muted = colorsByRole.get("muted") || "#8a8f98";
  const border = colorsByRole.get("border") || "#23252a";
  const accent = colorsByRole.get("accent") || "#8b5cf6";

  const getCodeContent = () => {
    switch (activeTab) {
      case "tailwind":
        return design.tailwindConfigFormatted;
      case "css":
        return design.cssVariablesFormatted;
      case "json":
        return design.tokensJsonFormatted;
      case "tsx":
        return design.componentCode;
      default:
        return "";
    }
  };

  const handleCopy = () => {
    const code = getCodeContent();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDownload = () => {
    const code = getCodeContent();
    if (!code) return;

    let filename = "";
    let mime = "text/plain";

    if (activeTab === "tailwind") {
      filename = "tailwind.config.js";
      mime = "application/javascript";
    } else if (activeTab === "css") {
      filename = "tokens.css";
      mime = "text/css";
    } else if (activeTab === "json") {
      filename = "tokens.json";
      mime = "application/json";
    } else if (activeTab === "tsx") {
      filename = "Specimens.tsx";
      mime = "text/typescript";
    }

    const blob = new Blob([code], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0b0e] border border-[#262930] rounded-2xl overflow-hidden shadow-xl">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#121316] border-b border-[#262930] gap-2 shrink-0">
        <div className="flex items-center gap-1 bg-[#0a0b0e] p-1 rounded-xl border border-[#262930] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("specimens")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
              activeTab === "specimens"
                ? "bg-[#1e2026] text-white shadow-xs border-blue-500/40 font-semibold"
                : "border-transparent text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${activeTab === "specimens" ? "text-blue-400" : "text-[#9aa0a6]"}`} />
            <span>Specimens</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tailwind")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
              activeTab === "tailwind"
                ? "bg-[#1e2026] text-white shadow-xs border-blue-500/40 font-semibold"
                : "border-transparent text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Code2 className={`w-3.5 h-3.5 ${activeTab === "tailwind" ? "text-blue-400" : "text-[#9aa0a6]"}`} />
            <span>Tailwind</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("css")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
              activeTab === "css"
                ? "bg-[#1e2026] text-white shadow-xs border-blue-500/40 font-semibold"
                : "border-transparent text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <FileCode className={`w-3.5 h-3.5 ${activeTab === "css" ? "text-blue-400" : "text-[#9aa0a6]"}`} />
            <span>CSS Variables</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("json")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
              activeTab === "json"
                ? "bg-[#1e2026] text-white shadow-xs border-blue-500/40 font-semibold"
                : "border-transparent text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className={`w-3.5 h-3.5 ${activeTab === "json" ? "text-blue-400" : "text-[#9aa0a6]"}`} />
            <span>Tokens JSON</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tsx")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
              activeTab === "tsx"
                ? "bg-[#1e2026] text-white shadow-xs border-blue-500/40 font-semibold"
                : "border-transparent text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Sliders className={`w-3.5 h-3.5 ${activeTab === "tsx" ? "text-blue-400" : "text-[#9aa0a6]"}`} />
            <span>TSX Component</span>
          </button>
        </div>

        {/* Action Controls for Code Tabs */}
        {activeTab !== "specimens" && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleDownload}
              title="Download Code File"
              className="p-1.5 rounded-lg text-[#9aa0a6] hover:text-white hover:bg-[#1e2026] border border-transparent hover:border-[#262930] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#1e2026] hover:bg-[#262930] border border-[#262930] shadow-xs transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#34A853]" />
                  <span className="text-[#34A853] text-xs font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#9aa0a6]" />
                  <span className="text-xs">Copy Code</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-y-auto bg-[#0a0b0e] p-5 sm:p-6">
        {/* Live Visual Specimens */}
        {activeTab === "specimens" && (
          <div className="space-y-6">
            {/* Section: Interactive Buttons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Interactive Button Specimens
                </span>
                <span className="text-[11px] font-mono text-[#5f6368]">Extracted styling tokens</span>
              </div>
              <div className="p-4 rounded-xl bg-[#121316] border border-[#262930] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  style={{ backgroundColor: primaryColor }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-98 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Primary Button</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  style={{ backgroundColor: surface, borderColor: border, color: text }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold border transition-all hover:brightness-125 active:scale-98 cursor-pointer"
                >
                  Secondary Variant
                </button>

                <button
                  type="button"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold border transition-all hover:bg-white/5 active:scale-98 cursor-pointer"
                >
                  Outline Button
                </button>

                <button
                  type="button"
                  style={{ color: muted }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold hover:text-white transition-all cursor-pointer hover:bg-white/5"
                >
                  Ghost Button
                </button>
              </div>
            </div>

            {/* Section: Inputs & Search Form */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
                Form Input & Focus Ring Specimen
              </span>
              <div className="p-4 rounded-xl bg-[#121316] border border-[#262930] space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white block">Email Address</label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter email to test focus ring..."
                    style={{
                      backgroundColor: surface,
                      borderColor: border,
                      color: text,
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg border text-xs placeholder-[#5f6368] focus:outline-none focus:ring-2 focus:ring-[#3186ff]/50"
                  />
                  <p className="text-[11px] text-[#9aa0a6]">
                    Derived from 8px border radius and hairline structural border token.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Cards & Surface Panels (Inspo Image 2) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Surfaces & Autonomous Agent Cards
                </span>
                <span className="text-[11px] font-mono text-[#5f6368]">Live styled with extracted tokens</span>
              </div>
              <AgentCardsSpecimen
                primaryColor={primaryColor}
                canvasBg={bg}
                cardBg={surface}
                borderColor={border}
              />
            </div>

            {/* Section: Elevation Shadows */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9aa0a6]">
                Elevation & Shadow Tokens
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-[#121316] border border-[#262930] shadow-sm">
                  <span className="text-xs font-mono text-white block">elevation-sm</span>
                  <span className="text-[10px] text-[#9aa0a6] mt-1 block">Subtle card edge</span>
                </div>
                <div className="p-4 rounded-xl bg-[#121316] border border-[#262930] shadow-md">
                  <span className="text-xs font-mono text-white block">elevation-md</span>
                  <span className="text-[10px] text-[#9aa0a6] mt-1 block">Popovers & menus</span>
                </div>
                <div className="p-4 rounded-xl bg-[#121316] border border-[#262930] shadow-xl">
                  <span className="text-xs font-mono text-white block">elevation-lg</span>
                  <span className="text-[10px] text-[#9aa0a6] mt-1 block">Floating dialogs</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Tabs */}
        {activeTab !== "specimens" && (
          <div className="relative">
            <pre className="font-mono text-xs text-[#e8eaed] leading-relaxed overflow-x-auto p-4 bg-[#121316] rounded-xl border border-[#262930] whitespace-pre">
              {getCodeContent()}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveSpecimenViewer;
