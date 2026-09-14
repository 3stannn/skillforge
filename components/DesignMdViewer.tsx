"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Palette,
  Download,
  Eye,
  Code,
  Compass,
  ExternalLink,
  Type,
  Layers,
  Sparkles,
} from "lucide-react";
import { DesignSystemData } from "@/lib/types";
import { MarkdownView } from "./MarkdownView";

export interface DesignMdViewerProps {
  design: DesignSystemData;
}

export function DesignMdViewer({ design }: DesignMdViewerProps) {
  const [activeTab, setActiveTab] = useState<"formatted" | "raw" | "palette" | "typography" | "pages">("formatted");
  const [copied, setCopied] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const designMdContent = design.designMd || design.skillMd || "";

  const handleCopyDesignMd = () => {
    navigator.clipboard.writeText(designMdContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownloadDesignMd = () => {
    const blob = new Blob([designMdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DESIGN-${design.name.replace(/_/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0b0e] border border-[#262930] rounded-2xl overflow-hidden shadow-xl">
      {/* Header Tabs Bar */}
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
            <span>DESIGN.md</span>
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
            onClick={() => setActiveTab("palette")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "palette"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3186ff]/40 font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#ffe432]" />
            <span>Palette ({design.semanticColors?.length || 0})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("typography")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "typography"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3186ff]/40 font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-white/5"
            }`}
          >
            <Type className="w-3.5 h-3.5 text-[#34A853]" />
            <span>Type Scale</span>
          </button>
          {design.crawledPages && design.crawledPages.length > 1 && (
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
              <span>Explored ({design.crawledPages.length})</span>
            </button>
          )}
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleDownloadDesignMd}
            title="Download DESIGN.md"
            className="p-1.5 rounded-lg text-[#9aa0a6] hover:text-white hover:bg-[#1e2026] border border-transparent hover:border-[#262930] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopyDesignMd}
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
                <span className="text-xs">Copy DESIGN.md</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative flex-1 overflow-y-auto bg-[#0a0b0e] p-5 sm:p-6">
        {/* Formatted View */}
        {activeTab === "formatted" && (
          <div className="space-y-4">
            {design.aestheticSummary && (
              <div className="p-3.5 rounded-xl bg-[#121316] border border-[#262930] text-xs text-[#9aa0a6] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#ffe432] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Aesthetic Profile: </span>
                  <span>{design.aestheticSummary}</span>
                </div>
              </div>
            )}
            <MarkdownView content={designMdContent} />
          </div>
        )}

        {/* Raw View */}
        {activeTab === "raw" && (
          <div className="relative">
            <pre className="font-mono text-xs text-[#e8eaed] leading-relaxed overflow-x-auto p-4 bg-[#121316] rounded-xl border border-[#262930] whitespace-pre-wrap">
              {designMdContent}
            </pre>
          </div>
        )}

        {/* Palette Tab */}
        {activeTab === "palette" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Semantic Color Palette</h3>
              <p className="text-xs text-[#9aa0a6] mt-0.5">
                Click any swatch to copy its hex token directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {design.semanticColors?.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => copyColor(c.hex)}
                  className="p-3 rounded-xl bg-[#121316] border border-[#262930] hover:border-[#3c4043] transition-all text-left flex items-center gap-3 group cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-lg shrink-0 border border-white/10 shadow-sm"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white capitalize">
                        {c.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1e2026] text-[#9aa0a6]">
                        {c.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9aa0a6] truncate mt-0.5">
                      {c.usage}
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#3186ff] mt-1">
                      <span>{c.hex.toUpperCase()}</span>
                      {copiedHex === c.hex ? (
                        <Check className="w-3 h-3 text-[#34A853]" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#5f6368] group-hover:text-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Typography Scale Tab */}
        {activeTab === "typography" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Typography Hierarchy & Scale</h3>
              <p className="text-xs text-[#9aa0a6] mt-0.5">
                Primary: <span className="text-white font-mono">{design.primaryFont}</span> • Code:{" "}
                <span className="text-white font-mono">{design.monoFont}</span>
              </p>
            </div>

            <div className="rounded-xl border border-[#262930] overflow-hidden bg-[#121316]">
              {design.typographyScale?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 border-b border-[#262930] last:border-b-0 space-y-1.5 hover:bg-[#16181d] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#9aa0a6]">
                    <span className="uppercase text-[#3186ff] font-semibold">{item.level}</span>
                    <span>
                      {item.size} · Line: {item.lineHeight} · Weight: {item.weight}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: item.size,
                      lineHeight: item.lineHeight,
                      fontWeight: item.weight,
                      letterSpacing: item.letterSpacing || "normal",
                    }}
                    className="text-white truncate max-w-full"
                  >
                    {item.sample || "The quick brown fox jumps over the lazy dog"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explored Pages Tab */}
        {activeTab === "pages" && design.crawledPages && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Discovered Site Architecture</h3>
              <p className="text-xs text-[#9aa0a6] mt-0.5">
                Multi-page crawl explored {design.crawledPages.length} routes to extract global tokens.
              </p>
            </div>

            <div className="space-y-2">
              {design.crawledPages.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#121316] border border-[#262930] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="text-white font-medium truncate">{p.title || "Untitled Route"}</div>
                    <div className="text-[#9aa0a6] font-mono text-[11px] truncate mt-0.5">
                      {p.url}
                    </div>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-[#9aa0a6] hover:text-white hover:bg-[#1e2026] shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DesignMdViewer;
