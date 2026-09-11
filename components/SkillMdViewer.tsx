"use client";

import React, { useState } from "react";
import { Copy, Check, Palette, Cpu, Download, Eye, Code } from "lucide-react";
import { UniversalSkill } from "@/lib/types";
import { MarkdownView } from "./MarkdownView";

export interface SkillMdViewerProps {
  skill: UniversalSkill;
}

export function SkillMdViewer({ skill }: SkillMdViewerProps) {
  const [activeTab, setActiveTab] = useState<"formatted" | "raw" | "styles" | "logic">("formatted");
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopySkillMd = () => {
    navigator.clipboard.writeText(skill.skillMd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownloadSkillMd = () => {
    const blob = new Blob([skill.skillMd], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${skill.name}.skill.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-[#dadce0] rounded-2xl overflow-hidden shadow-xs">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#f8f9fa] border-b border-[#dadce0] gap-2 shrink-0">
        <div className="flex items-center gap-1 bg-[#ebeef2] p-1 rounded-xl border border-[#dadce0] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("formatted")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "formatted"
                ? "bg-white text-[#111111] shadow-xs border border-[#dadce0] font-semibold"
                : "text-[#5f6368] hover:text-[#111111] hover:bg-white/60"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span>SKILL.md</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("raw")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "raw"
                ? "bg-white text-[#111111] shadow-xs border border-[#dadce0] font-semibold"
                : "text-[#5f6368] hover:text-[#111111] hover:bg-white/60"
            }`}
          >
            <Code className="w-3.5 h-3.5 text-[#5f6368]" />
            <span>Raw</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("styles")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "styles"
                ? "bg-white text-[#111111] shadow-xs border border-[#dadce0] font-semibold"
                : "text-[#5f6368] hover:text-[#111111] hover:bg-white/60"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#b06000]" />
            <span>Styles ({skill.styles.colors.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("logic")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "logic"
                ? "bg-white text-[#111111] shadow-xs border border-[#dadce0] font-semibold"
                : "text-[#5f6368] hover:text-[#111111] hover:bg-white/60"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#188038]" />
            <span>Logic ({skill.logic.stateVariables.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleDownloadSkillMd}
            title="Download SKILL.md"
            className="p-1.5 rounded-lg text-[#5f6368] hover:text-[#111111] hover:bg-white border border-transparent hover:border-[#dadce0] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopySkillMd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#202124] bg-white hover:bg-[#f1f3f4] border border-[#dadce0] shadow-xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#34A853]" />
                <span className="text-[#34A853] text-xs font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#5f6368]" />
                <span className="text-xs">Copy SKILL.md</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-1 overflow-y-auto bg-white p-5 sm:p-6">
        {/* Formatted Markdown View */}
        {activeTab === "formatted" && (
          <div className="max-w-none">
            <MarkdownView content={skill.skillMd} />
          </div>
        )}

        {/* Raw Markdown */}
        {activeTab === "raw" && (
          <div className="rounded-xl overflow-hidden border border-[#2b2c31] bg-[#121316] p-4 font-mono text-xs text-[#dcdfe4] leading-relaxed select-text">
            <pre className="whitespace-pre-wrap">{skill.skillMd}</pre>
          </div>
        )}

        {/* Extracted Styles */}
        {activeTab === "styles" && (
          <div className="space-y-6">
            {/* Color Palette */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368] flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#1a73e8]" />
                  Color Palette ({skill.styles.colors.length} tokens)
                </h4>
                <span className="text-[11px] text-[#80868b] font-mono">
                  Click swatch to copy hex
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {skill.styles.colors.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => copyColor(color)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f8f9fa] border border-[#dadce0] hover:border-[#1a73e8] hover:bg-[#f1f3f4] transition-all text-left cursor-pointer group shadow-2xs"
                  >
                    <span
                      className="w-7 h-7 rounded-lg border border-[#dadce0] shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono font-semibold text-[#202124] truncate group-hover:text-[#1a73e8]">
                        {color}
                      </div>
                      <div className="text-[10px] text-[#5f6368] font-mono">
                        {copiedColor === color ? (
                          <span className="text-[#34A853] font-semibold">Copied!</span>
                        ) : (
                          `Token ${idx + 1}`
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detected Fonts */}
            {skill.styles.fonts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368]">
                  Detected Fonts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.styles.fonts.map((f, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#f8f9fa] border border-[#dadce0] rounded-lg text-xs font-mono text-[#202124] shadow-2xs"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Layout Patterns */}
            {skill.styles.layoutPatterns.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368]">
                  Layout Architecture Patterns
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.styles.layoutPatterns.map((p, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#e8f0fe] border border-[#1a73e8]/20 rounded-lg text-xs text-[#1a73e8] font-mono font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Tailwind Utility Classes */}
            {skill.styles.tailwindClasses.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368]">
                  Key Tailwind Utility Classes ({skill.styles.tailwindClasses.length})
                </h4>
                <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-3 bg-[#f8f9fa] rounded-xl border border-[#dadce0]">
                  {skill.styles.tailwindClasses.map((cls, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white text-[#3c4043] font-mono text-[11px] border border-[#dadce0] shadow-2xs"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Extracted Logic */}
        {activeTab === "logic" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#188038]" />
                Interactive State Variables ({skill.logic.stateVariables.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skill.logic.stateVariables.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#f8f9fa] rounded-xl border border-[#dadce0] font-mono text-xs text-[#202124] shadow-2xs"
                  >
                    <span className="text-[#1a73e8] font-semibold">state:</span> {s}
                  </div>
                ))}
              </div>
            </div>

            {skill.logic.eventHandlers.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368]">
                  Event Handlers & Interactivity Flows
                </h4>
                <div className="space-y-1.5">
                  {skill.logic.eventHandlers.map((e, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#f8f9fa] rounded-xl border border-[#dadce0] font-mono text-xs text-[#3c4043]"
                    >
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skill.logic.apiEndpoints.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368]">
                  Connected API Endpoints ({skill.logic.apiEndpoints.length})
                </h4>
                <div className="space-y-1.5">
                  {skill.logic.apiEndpoints.map((ep, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#f8f9fa] rounded-xl border border-[#dadce0] text-xs font-mono text-[#1a73e8] truncate"
                    >
                      {ep}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-[#f8f9fa] border-t border-[#dadce0] text-[11px] text-[#5f6368] font-mono flex items-center justify-between shrink-0">
        <span>Format: Universal Agent SKILL.md</span>
        <span>Models: Gemini • ChatGPT • Cursor • Claude</span>
      </div>
    </div>
  );
}
