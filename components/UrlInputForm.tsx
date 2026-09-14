"use client";

import React, { useState } from "react";
import { ArrowRight, Globe, AlertCircle, Compass, Zap, Sparkles } from "lucide-react";
import { LINEAR_EXAMPLE_DESIGN_SYSTEM } from "@/lib/exampleDesignSystem";
import { DesignSystemData } from "@/lib/types";

export interface UrlInputFormProps {
  onSubmit: (url: string, options?: { crawlDepth: number; maxPages: number }) => void;
  isLoading: boolean;
  onLoadExample?: (example: DesignSystemData) => void;
  onOpenConfig?: () => void;
  onOpenHistory?: () => void;
  onShowSplash?: () => void;
  historyCount?: number;
}

const SAMPLE_URLS = [
  {
    name: "linear.app",
    url: "https://linear.app",
    type: "★ .agents/DESIGN.md",
    isExample: true,
  },
  {
    name: "stripe.com",
    url: "https://stripe.com",
    type: "Fintech Clean",
  },
  {
    name: "huly.io",
    url: "https://huly.io",
    type: "Cosmic Aurora",
  },
  {
    name: "apple.com",
    url: "https://apple.com",
    type: "Minimalist Vitrine",
  },
  {
    name: "github.com",
    url: "https://github.com",
    type: "Developer Monospace",
  },
  {
    name: "notion.so",
    url: "https://notion.so",
    type: "Warm Editorial",
  },
];

export const UrlInputForm = React.memo(function UrlInputForm({
  onSubmit,
  isLoading,
  onLoadExample,
}: UrlInputFormProps) {
  const [url, setUrl] = useState("");
  const [crawlMode, setCrawlMode] = useState<"deep" | "single">("deep");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError("Please enter a target URL.");
      return;
    }

    let finalUrl = trimmed;
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        setValidationError("URL must begin with http:// or https://");
        return;
      }
    } catch {
      if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
        finalUrl = `https://${trimmed}`;
        setUrl(finalUrl);
      } else {
        setValidationError("Please provide a valid URL format (e.g. stripe.com or https://linear.app)");
        return;
      }
    }

    onSubmit(finalUrl, {
      crawlDepth: crawlMode === "deep" ? 1 : 0,
      maxPages: crawlMode === "deep" ? 5 : 1,
    });
  };

  const selectSample = (sample: (typeof SAMPLE_URLS)[number]) => {
    if (sample.isExample && onLoadExample) {
      onLoadExample(LINEAR_EXAMPLE_DESIGN_SYSTEM);
      return;
    }
    setUrl(sample.url);
    setValidationError(null);
  };

  return (
    <div
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      className="w-full max-w-5xl mx-auto space-y-8 py-6 sm:py-10"
    >
      {/* Hero Top Bar & Navigation */}
      <div className="flex items-center justify-between px-2 text-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-[#e8eaed] bg-[#101215] border border-[#1e2126] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#585a5c] shadow-[0_0_8px_#585a5c]" />
          <span className="font-mono text-[11px] text-[#9aa0a6]">Design System Synthesizer</span>
        </div>

        <button
          type="button"
          onClick={() => onLoadExample && onLoadExample(LINEAR_EXAMPLE_DESIGN_SYSTEM)}
          className="text-xs text-[#9aa0a6] hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer group"
        >
          <span className="text-[#34d399] font-mono text-[10px] uppercase font-semibold">New</span>
          <span>Multi-Page Crawl & Token Synthesis</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#585a5c]" />
        </button>
      </div>

      {/* Hero Headline & Subtitle */}
      <div className="text-left space-y-4 px-2">
        <h1 className="text-4xl sm:text-6xl md:text-[68px] font-semibold text-[#ffffff] leading-[1.05] tracking-[-0.035em] max-w-4xl">
          The design system extractor for teams and agents
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#8a8f98] font-normal max-w-2xl leading-relaxed">
          Purpose-built for exploring and building products. Designed for the AI era: extract the design system behind <span className="text-white font-medium">any</span> website into a structured <code className="text-white font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/10">DESIGN.md</code>.
        </p>

        {/* Expected Output Reference Banner (.agents/DESIGN.md) */}
        {onLoadExample ? (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => onLoadExample(LINEAR_EXAMPLE_DESIGN_SYSTEM)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-[#1a1d22] text-[#d1d1d1] hover:text-white hover:bg-[#252830] border border-[#2a2e36] hover:border-[#3c4043] transition-all cursor-pointer shadow-sm group"
            >
              <span className="w-2 h-2 rounded-full bg-[#ffe432] shadow-[0_0_6px_#ffe432]" />
              <span>Preview Expected Output: <strong>Linear Style Reference</strong> (<code className="text-[#9aa0a6] font-mono">.agents/DESIGN.md</code>)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8a8f98] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ) : null}
      </div>

      {/* Main Search & Mode Container */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        {/* Scraper Mode Pill Selector */}
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center p-1 bg-[#121316] border border-[#262930] rounded-full text-xs shadow-2xs">
            <button
              type="button"
              onClick={() => setCrawlMode("deep")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                crawlMode === "deep"
                  ? "bg-[#1e2026] text-[#3186ff] border border-[#3186ff]/30 shadow-xs font-semibold"
                  : "text-[#9aa0a6] hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#3186ff]" />
              <span>Multi-Page Exploration</span>
            </button>
            <button
              type="button"
              onClick={() => setCrawlMode("single")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                crawlMode === "single"
                  ? "bg-[#1e2026] text-white border border-[#262930] shadow-xs font-semibold"
                  : "text-[#9aa0a6] hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#ffe432]" />
              <span>Single Page (Fast)</span>
            </button>
          </div>
        </div>

        {/* Search Pill Container */}
        <div className="flex items-center gap-3 p-2 pl-6 bg-[#0a0b0e] border border-[#262930] shadow-xl hover:border-[#3c4043] focus-within:border-[#3186ff] focus-within:ring-4 focus-within:ring-[#1a73e8]/20 rounded-full transition-all">
          <Globe className="w-5 h-5 text-[#9aa0a6] shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder={
              crawlMode === "deep"
                ? "linear.app or paste documentation URL..."
                : "stripe.com or paste any website URL..."
            }
            disabled={isLoading}
            className="w-full bg-transparent border-0 text-sm sm:text-base text-white placeholder-[#5f6368] focus:outline-none focus:ring-0 font-mono py-1.5"
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-6 py-3 rounded-full bg-[#ffffff] hover:bg-[#eff0f3] disabled:bg-[#1a1c22] disabled:text-[#5f6368] text-[#000000] text-sm font-semibold flex items-center gap-2 shrink-0 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{isLoading ? "Generating..." : "Generate DESIGN.md"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Hint */}
        {crawlMode === "deep" ? (
          <p className="text-[11px] text-[#5f6368] text-center font-mono">
            Explores key sub-routes (/docs, /components, /pricing) and external stylesheets for exact tokens.
          </p>
        ) : null}

        {/* Validation Error Banner */}
        {validationError ? (
          <div className="flex items-center gap-2 text-xs text-rose-200 bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl max-w-2xl mx-auto">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{validationError}</span>
          </div>
        ) : null}

        {/* Sample Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-[#9aa0a6]">
          <span className="font-mono text-[11px]">Try samples:</span>
          {SAMPLE_URLS.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => selectSample(sample)}
              className={`px-3.5 py-1.5 rounded-full transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer group ${
                sample.isExample
                  ? "bg-[#5683da]/15 hover:bg-[#5683da]/25 text-[#a8c7fa] border border-[#5683da]/40 hover:border-[#5683da]/70 shadow-xs"
                  : "bg-[#121316] hover:bg-[#1c1e24] text-[#9aa0a6] hover:text-white border border-[#262930] hover:border-[#3186ff]/40"
              }`}
            >
              <span>{sample.name}</span>
              <span className={`text-[10px] font-mono ${sample.isExample ? "text-[#ff8964]" : "text-[#5f6368] group-hover:text-[#3186ff]"}`}>
                · {sample.type}
              </span>
            </button>
          ))}
        </div>
      </form>
    </div>
  );
});

export default UrlInputForm;
