"use client";

import React, { useState } from "react";
import { Copy, Check, Palette, Cpu, Download, Eye, Code, Compass, ExternalLink, Code2 } from "lucide-react";
import { UniversalSkill } from "@/lib/types";
import { MarkdownView } from "./MarkdownView";

export interface SkillMdViewerProps {
  skill: UniversalSkill;
}

export function SkillMdViewer({ skill }: SkillMdViewerProps) {
  const [activeTab, setActiveTab] = useState<"formatted" | "raw" | "styles" | "logic" | "pages">("formatted");
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
    <div className="flex flex-col h-full bg-[#0a0b0e] border border-[#262930] rounded-2xl overflow-hidden shadow-xl">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#121316] border-b border-[#262930] gap-2 shrink-0">
        <div className="flex items-center gap-1 bg-[#0a0b0e] p-1 rounded-xl border border-[#262930] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("formatted")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "formatted"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3186ff]/40 font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#3186ff]" />
            <span>SKILL.md</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("raw")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "raw"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3186ff]/40 font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Code className="w-3.5 h-3.5 text-[#9aa0a6]" />
            <span>Raw</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("styles")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "styles"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3186ff]/40 font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#ffe432]" />
            <span>Styles ({skill.styles.colors.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("logic")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "logic"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3186ff]/40 font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#34A853]" />
            <span>Logic ({skill.logic.stateVariables.length})</span>
          </button>
          {skill.crawledPages && skill.crawledPages.length > 1 && (
            <button
              type="button"
              onClick={() => setActiveTab("pages")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "pages"
                  ? "bg-[#1e2026] text-white shadow-xs border border-[#3186ff]/40 font-semibold"
                  : "text-[#9aa0a6] hover:text-white hover:bg-white/5"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#3186ff]" />
              <span>Pages ({skill.crawledPages.length})</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleDownloadSkillMd}
            title="Download SKILL.md"
            className="p-1.5 rounded-lg text-[#9aa0a6] hover:text-white hover:bg-[#1e2026] border border-transparent hover:border-[#262930] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopySkillMd}
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
                <span className="text-xs">Copy SKILL.md</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-1 overflow-y-auto bg-[#0a0b0e] p-5 sm:p-6">
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
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6] flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#3186ff]" />
                  Color Palette ({skill.styles.colors.length} tokens)
                </h4>
                <span className="text-[11px] text-[#5f6368] font-mono">
                  Click swatch to copy hex
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {skill.styles.colors.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => copyColor(color)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121316] border border-[#262930] hover:border-[#3186ff]/50 hover:bg-[#16181d] transition-all text-left cursor-pointer group shadow-2xs"
                  >
                    <span
                      className="w-7 h-7 rounded-lg border border-[#262930] shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono font-semibold text-white truncate group-hover:text-[#3186ff]">
                        {color}
                      </div>
                      <div className="text-[10px] text-[#9aa0a6] font-mono">
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
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Detected Fonts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.styles.fonts.map((f, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#121316] border border-[#262930] rounded-lg text-xs font-mono text-white shadow-2xs"
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
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Layout Architecture Patterns
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.styles.layoutPatterns.map((p, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#1a73e8]/15 border border-[#1a73e8]/30 rounded-lg text-xs text-[#3186ff] font-mono font-medium"
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
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Key Tailwind Utility Classes ({skill.styles.tailwindClasses.length})
                </h4>
                <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-3 bg-[#121316] rounded-xl border border-[#262930]">
                  {skill.styles.tailwindClasses.map((cls, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#1a1c22] text-[#dcdfe4] font-mono text-[11px] border border-[#262930] shadow-2xs"
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
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#34A853]" />
                Interactive State Variables ({skill.logic.stateVariables.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skill.logic.stateVariables.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#121316] rounded-xl border border-[#262930] font-mono text-xs text-[#e8eaed] shadow-2xs"
                  >
                    <span className="text-[#3186ff] font-semibold">state:</span> {s}
                  </div>
                ))}
              </div>
            </div>

            {skill.logic.eventHandlers.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Event Handlers & Interactivity Flows
                </h4>
                <div className="space-y-1.5">
                  {skill.logic.eventHandlers.map((e, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#121316] rounded-xl border border-[#262930] font-mono text-xs text-[#dcdfe4]"
                    >
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skill.logic.apiEndpoints.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Connected API Endpoints ({skill.logic.apiEndpoints.length})
                </h4>
                <div className="space-y-1.5">
                  {skill.logic.apiEndpoints.map((ep, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#121316] rounded-xl border border-[#262930] text-xs font-mono text-[#3186ff] truncate"
                    >
                      {ep}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skill.languages && skill.languages.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#ffe432]" />
                  Detected Programming Languages & Code Stacks ({skill.languages.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-[#ffe432]/10 border border-[#ffe432]/30 text-xs font-mono text-[#ffe432] font-medium shadow-2xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pages & Architecture Tab */}
        {activeTab === "pages" && skill.crawledPages && (
          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#3186ff]" />
                Crawled Site Architecture ({skill.crawledPages.length} pages)
              </h3>
              <p className="text-xs text-[#9aa0a6]">
                Pages discovered and explored by the deep scraper to assemble this universal skill.
              </p>
            </div>

            <div className="space-y-3">
              {skill.crawledPages.map((page, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#121316] rounded-xl border border-[#262930] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:border-[#3186ff]/40 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#1a73e8]/20 text-[#3186ff] text-[10px] font-mono font-semibold">
                        Depth {page.depth}
                      </span>
                      <span className="text-xs font-semibold text-white truncate">
                        {page.title}
                      </span>
                    </div>
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-[#9aa0a6] hover:text-[#3186ff] flex items-center gap-1 truncate"
                    >
                      {page.url} <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[#9aa0a6]">
                    <span>{page.wordCount.toLocaleString()} words</span>
                    {page.statusCode && (
                      <span className="px-2 py-0.5 rounded bg-[#16181d] border border-[#262930] text-[10px] text-emerald-400">
                        HTTP {page.statusCode}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {skill.frameworks && skill.frameworks.length > 0 && (
              <div className="pt-4 border-t border-[#262930] space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
                  Detected Frameworks & Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.frameworks.map((fw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#16181d] border border-[#262930] text-xs font-mono text-white shadow-2xs"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-[#121316] border-t border-[#262930] text-[11px] text-[#5f6368] font-mono flex items-center justify-between shrink-0">
        <span>Format: Universal Agent SKILL.md</span>
        <span>Models: Gemini • ChatGPT • Cursor • Claude</span>
      </div>
    </div>
  );
}
