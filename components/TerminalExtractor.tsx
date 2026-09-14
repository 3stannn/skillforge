"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon,
  Play,
  Copy,
  Check,
  Zap,
  Compass,
} from "lucide-react";
import { GenerationStepUpdate, ApiKeysConfig } from "@/lib/types";

export interface TerminalExtractorProps {
  onExtract: (url: string, options: { crawlDepth: number; maxPages: number }) => void;
  isLoading: boolean;
  currentStep?: number;
  stepsLog?: GenerationStepUpdate[];
  activeUrl?: string;
  onSelectSample?: (sampleKey: string) => void;
  initialUrl?: string;
  config?: ApiKeysConfig;
  className?: string;
}

export function TerminalExtractor({
  onExtract,
  isLoading,
  currentStep = 0,
  stepsLog = [],
  activeUrl = "",
  initialUrl = "",
  config,
  className = "",
}: TerminalExtractorProps) {
  const maxPages = config?.maxCrawlPages ?? 5;
  const deepDepth = config?.defaultCrawlDepth ?? 1;

  const [inputUrl, setInputUrl] = useState(initialUrl || "");
  const [crawlMode, setCrawlMode] = useState<"deep" | "fast">(
    (config?.defaultCrawlDepth ?? 1) > 0 ? "deep" : "fast"
  );

  // Sync crawlMode if user changes defaultCrawlDepth in settings
  useEffect(() => {
    if (config?.defaultCrawlDepth !== undefined) {
      setCrawlMode(config.defaultCrawlDepth > 0 ? "deep" : "fast");
    }
  }, [config?.defaultCrawlDepth]);
  const [logs, setLogs] = useState<Array<{ text: string; type: "info" | "success" | "warn" | "error" | "cmd"; time: string }>>([
    {
      text: "DesignMD CLI v2.0 initialized. Ready for multi-page extraction.",
      type: "info",
      time: new Date().toLocaleTimeString(),
    },
    {
      text: "Enter any website URL below and press Enter to extract tokens into DESIGN.md.",
      type: "cmd",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialUrl && initialUrl !== inputUrl) {
      setInputUrl(initialUrl);
    }
  }, [initialUrl]);

  // Sync real stepsLog from live generation
  useEffect(() => {
    if (stepsLog.length > 0) {
      const latest = stepsLog[stepsLog.length - 1];
      const now = new Date().toLocaleTimeString();
      setLogs((prev) => [
        ...prev,
        {
          text: `[Step ${latest.step}/4] ${latest.message}${latest.details ? ` · ${latest.details}` : ""}`,
          type: latest.status === "error" ? "error" : latest.status === "completed" ? "success" : "info",
          time: now,
        },
      ]);
    }
  }, [stepsLog]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) return;

    let finalUrl = trimmed;
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        finalUrl = `https://${trimmed}`;
      }
    } catch {
      finalUrl = `https://${trimmed}`;
    }

    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      {
        text: `❯ designmd extract ${finalUrl} --mode=${crawlMode} --synthesize=DESIGN.md`,
        type: "cmd",
        time: now,
      },
      {
        text: `⚡ Initializing crawler for ${finalUrl}...`,
        type: "info",
        time: now,
      },
    ]);

    onExtract(finalUrl, {
      crawlDepth: crawlMode === "deep" ? deepDepth : 0,
      maxPages: crawlMode === "deep" ? maxPages : 1,
    });
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(`designmd extract ${inputUrl || "<url>"} --mode=${crawlMode}`);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 1500);
  };

  return (
    <div className={`w-full bg-[#050608] border border-[#1e2229] rounded-2xl overflow-hidden shadow-2xl font-mono text-xs ${className}`}>
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#090b0e] border-b border-[#1e2229] text-[#8a8f98]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[#d1d1d1] font-semibold text-[11px] ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-[#3186ff]" />
            <span>designmd-cli</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#16191f] text-[#9aa0a6] border border-[#232731]">
            v2.0-engine
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Pill Toggle */}
          <div className="inline-flex items-center bg-[#050608] border border-[#1e2229] rounded-full p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setCrawlMode("deep")}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all flex items-center gap-1 cursor-pointer ${
                crawlMode === "deep"
                  ? "bg-[#191d24] text-[#3186ff] border border-[#3186ff]/30 font-semibold"
                  : "text-[#8a8f98] hover:text-white"
              }`}
            >
              <Compass className="w-2.5 h-2.5 text-[#3186ff]" />
              <span>--deep ({maxPages} pages)</span>
            </button>
            <button
              type="button"
              onClick={() => setCrawlMode("fast")}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all flex items-center gap-1 cursor-pointer ${
                crawlMode === "fast"
                  ? "bg-[#191d24] text-[#ffe432] border border-[#ffe432]/30 font-semibold"
                  : "text-[#8a8f98] hover:text-white"
              }`}
            >
              <Zap className="w-2.5 h-2.5 text-[#ffe432]" />
              <span>--fast (single)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyCommand}
            title="Copy CLI command"
            className="text-[#8a8f98] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            {copiedCmd ? <Check className="w-3 h-3 text-[#34A853]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Interactive Command Prompt Line */}
      <form onSubmit={handleSubmit} className="px-4 py-3 bg-[#0a0c10] border-b border-[#1e2229] flex items-center gap-2">
        <span className="text-[#3186ff] font-bold select-none text-sm">❯</span>
        <span className="text-[#8a8f98] select-none text-xs">designmd extract</span>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter website URL (e.g. stripe.com or https://...)"
          disabled={isLoading}
          className="flex-1 bg-transparent border-0 text-white placeholder-[#585a5c] focus:outline-none focus:ring-0 font-mono text-xs py-1"
        />

        <button
          type="submit"
          disabled={isLoading || !inputUrl.trim()}
          className="px-3.5 py-1.5 rounded-lg bg-[#ffffff] hover:bg-[#eff0f3] disabled:bg-[#191c22] disabled:text-[#585a5c] text-[#000000] text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer shrink-0"
        >
          {isLoading ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#3186ff] animate-ping" />
              <span>Synthesizing...</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>Run [↵]</span>
            </>
          )}
        </button>
      </form>

      {/* Terminal Output Stdout Console */}
      <div className="p-4 space-y-1.5 max-h-60 overflow-y-auto bg-[#050608] text-[#9aa0a6] font-mono text-[11px] leading-relaxed select-text">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <span className="text-[#43474e] select-none shrink-0">[{log.time}]</span>
            <span
              className={`break-all ${
                log.type === "cmd"
                  ? "text-[#ffffff] font-semibold"
                  : log.type === "success"
                  ? "text-[#34d399]"
                  : log.type === "error"
                  ? "text-[#f87171]"
                  : log.type === "warn"
                  ? "text-[#fbbf24]"
                  : "text-[#9aa0a6]"
              }`}
            >
              {log.text}
            </span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}

export default TerminalExtractor;
