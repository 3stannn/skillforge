"use client";

import React, { useState } from "react";
import { ArrowRight, Globe, AlertCircle, Compass, Zap } from "lucide-react";

export interface UrlInputFormProps {
  onSubmit: (url: string, options?: { crawlDepth: number; maxPages: number }) => void;
  isLoading: boolean;
  onOpenConfig?: () => void;
  onOpenHistory?: () => void;
  onShowSplash?: () => void;
  historyCount?: number;
}

const SAMPLE_URLS = [
  {
    name: "Google Antigravity",
    url: "https://antigravity.google/",
    type: "Design & Logic",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    type: "Design System",
  },
  {
    name: "CoinGecko API",
    url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd",
    type: "REST State",
  },
  {
    name: "Cat Facts API",
    url: "https://catfact.ninja/fact",
    type: "API Endpoint",
  },
];

export function UrlInputForm({
  onSubmit,
  isLoading,
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
        setValidationError("Please provide a valid URL format (e.g. https://example.com)");
        return;
      }
    }

    onSubmit(finalUrl, {
      crawlDepth: crawlMode === "deep" ? 1 : 0,
      maxPages: crawlMode === "deep" ? 5 : 1,
    });
  };

  const selectSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setValidationError(null);
  };

  return (
    <div
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      className="w-full max-w-5xl mx-auto space-y-10 py-6 sm:py-12"
    >
      {/* Hero Section (Matching Google Antigravity Clean Aesthetics) */}
      <div className="text-center space-y-5">
        {/* Central Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-[#202124] bg-white border border-[#dadce0] shadow-xs transition-transform hover:scale-105">
          <span className="w-2 h-2 rounded-full bg-[#1a73e8] animate-pulse" />
          <span>SkillForge • Universal Skill Engine</span>
        </div>

        {/* Large Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-[68px] font-semibold text-[#111111] leading-[1.06] tracking-[-0.035em] max-w-4xl mx-auto">
          Extract design tokens & logic into <span className="text-[#1a73e8]">SKILL.md</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[#5f6368] font-normal max-w-2xl mx-auto leading-relaxed">
          Deep crawls documentation, visual styles, external stylesheets, state flows, and APIs from any URL into an authoritative agent skill.
        </p>
      </div>

      {/* Main Search & Mode Container */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        {/* Scraper Mode Pill Selector */}
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center p-1 bg-[#f1f3f4] border border-[#dadce0] rounded-full text-xs shadow-2xs">
            <button
              type="button"
              onClick={() => setCrawlMode("deep")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                crawlMode === "deep"
                  ? "bg-white text-[#1a73e8] shadow-xs font-semibold"
                  : "text-[#5f6368] hover:text-[#111111]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span>Deep Crawl (Multi-Page)</span>
            </button>
            <button
              type="button"
              onClick={() => setCrawlMode("single")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                crawlMode === "single"
                  ? "bg-white text-[#111111] shadow-xs font-semibold"
                  : "text-[#5f6368] hover:text-[#111111]"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Single Page (Fast)</span>
            </button>
          </div>
        </div>

        {/* Large Google Antigravity Search Pill Container */}
        <div className="flex items-center gap-3 p-2 pl-6 bg-white border border-[#dadce0] shadow-xs hover:shadow-md focus-within:border-[#1a73e8] focus-within:ring-4 focus-within:ring-[#1a73e8]/10 rounded-full transition-all">
          <Globe className="w-5 h-5 text-[#5f6368] shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder={
              crawlMode === "deep"
                ? "https://antigravity.google or docs site to deep crawl..."
                : "https://antigravity.google or single page URL..."
            }
            disabled={isLoading}
            className="w-full bg-transparent border-0 text-sm sm:text-base text-[#111111] placeholder-[#80868b] focus:outline-none focus:ring-0 font-mono py-1.5"
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-6 py-3 rounded-full bg-[#111111] hover:bg-black disabled:bg-[#dadce0] disabled:text-[#80868b] text-white text-sm font-medium flex items-center gap-2 shrink-0 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>{isLoading ? "Synthesizing..." : crawlMode === "deep" ? "Deep Crawl" : "Extract Skill"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Deep Crawl Hint */}
        {crawlMode === "deep" && (
          <p className="text-[11px] text-[#5f6368] text-center font-mono">
            Explores up to 5 subroutes (/docs, /api, /components), extracts external CSS & framework tokens
          </p>
        )}

        {/* Validation Error Banner */}
        {validationError && (
          <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl max-w-2xl mx-auto">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Sample Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-[#5f6368]">
          <span className="font-mono text-[11px]">Try samples:</span>
          {SAMPLE_URLS.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => selectSample(sample.url)}
              className="px-3.5 py-1.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] border border-[#dadce0] transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <span>{sample.name}</span>
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

export default UrlInputForm;
