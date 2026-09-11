"use client";

import React, { useState } from "react";
import { Drawer } from "./ui/drawer";
import { ApiKeysConfig } from "@/lib/types";
import { Key, Eye, EyeOff, Sparkles, Cpu, ExternalLink, Check } from "lucide-react";

export interface ConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: ApiKeysConfig;
  onSaveConfig: (updated: ApiKeysConfig) => void;
}

export function ConfigDrawer({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}: ConfigDrawerProps) {
  const [localConfig, setLocalConfig] = useState<ApiKeysConfig>(config);
  const [showGroq, setShowGroq] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [showFirecrawl, setShowFirecrawl] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSaveConfig(localConfig);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleClearAll = () => {
    const cleared: ApiKeysConfig = {
      groqApiKey: "",
      geminiApiKey: "",
      firecrawlApiKey: "",
      preferredLlm: "auto",
    };
    setLocalConfig(cleared);
    onSaveConfig(cleared);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Engine Settings & Inference Keys"
      description="Configure optional API keys or use the built-in zero-cost engine."
      width="md"
    >
      <div className="space-y-6 text-sm text-[#202124]">
        {/* Zero Cost Notice */}
        <div className="p-4 rounded-xl bg-[#f1f3f4] border border-[#dadce0] text-xs leading-relaxed text-[#5f6368] flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1a73e8] mt-1 shrink-0 animate-pulse" />
          <div>
            <span className="font-semibold text-[#111111]">Zero-Cost Mode Active:</span>{" "}
            No API keys required. SkillForge extracts DOM styles and interactive logic out of the box. Add your free Gemini or Groq key for multi-step reasoning.
          </div>
        </div>

        {/* LLM Provider Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368]">
            LLM Provider Preference
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "auto", label: "Auto" },
              { id: "gemini", label: "Gemini" },
              { id: "groq", label: "Groq Llama 3" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  setLocalConfig((prev) => ({
                    ...prev,
                    preferredLlm: p.id as any,
                  }))
                }
                className={`px-3 py-2 rounded-lg border text-xs font-mono font-medium text-center transition-colors cursor-pointer ${
                  localConfig.preferredLlm === p.id
                    ? "bg-[#111111] border-[#111111] text-white"
                    : "bg-[#f1f3f4] border-[#dadce0] text-[#202124] hover:bg-[#e8eaed]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deep Crawl & Exploration Settings */}
        <div className="border-t border-[#dadce0] pt-4 space-y-3">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368]">
            Scraper Depth & Exploration
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#202124] font-medium">Default Crawl Mode</span>
              <span className="text-[#5f6368] font-mono text-[11px]">
                {localConfig.defaultCrawlDepth === 0 ? "Single Page" : "Deep Multi-Page (Depth 1)"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setLocalConfig((prev) => ({
                    ...prev,
                    defaultCrawlDepth: 1,
                  }))
                }
                className={`px-3 py-2 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer ${
                  (localConfig.defaultCrawlDepth ?? 1) > 0
                    ? "bg-[#111111] border-[#111111] text-white font-semibold"
                    : "bg-[#f1f3f4] border-[#dadce0] text-[#202124] hover:bg-[#e8eaed]"
                }`}
              >
                Deep Multi-Page
              </button>
              <button
                type="button"
                onClick={() =>
                  setLocalConfig((prev) => ({
                    ...prev,
                    defaultCrawlDepth: 0,
                  }))
                }
                className={`px-3 py-2 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer ${
                  localConfig.defaultCrawlDepth === 0
                    ? "bg-[#111111] border-[#111111] text-white font-semibold"
                    : "bg-[#f1f3f4] border-[#dadce0] text-[#202124] hover:bg-[#e8eaed]"
                }`}
              >
                Single Page
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#202124] font-medium">Max Sub-Pages Cap</span>
              <span className="font-mono text-[#1a73e8] font-bold text-xs">
                {localConfig.maxCrawlPages ?? 5} pages
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[2, 4, 5, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() =>
                    setLocalConfig((prev) => ({
                      ...prev,
                      maxCrawlPages: num,
                    }))
                  }
                  className={`py-1.5 rounded-lg border text-xs font-mono font-medium text-center transition-colors cursor-pointer ${
                    (localConfig.maxCrawlPages ?? 5) === num
                      ? "bg-[#1a73e8] border-[#1a73e8] text-white"
                      : "bg-[#f1f3f4] border-[#dadce0] text-[#5f6368] hover:bg-[#e8eaed]"
                  }`}
                >
                  {num} pages
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#dadce0] pt-4 space-y-4">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f6368] flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-[#5f6368]" />
            Custom API Keys (Stored in Browser)
          </h3>

          {/* Gemini API Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#111111] flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#1a73e8]" /> Google Gemini Key
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[#1a73e8] hover:underline flex items-center gap-1 text-[11px] font-mono"
              >
                Get Free Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="relative">
              <input
                type={showGemini ? "text" : "password"}
                placeholder="AIzaSy..."
                value={localConfig.geminiApiKey || ""}
                onChange={(e) =>
                  setLocalConfig((prev) => ({
                    ...prev,
                    geminiApiKey: e.target.value,
                  }))
                }
                className="w-full bg-white border border-[#dadce0] rounded-lg px-3 py-2 text-xs font-mono text-[#111111] placeholder-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] pr-9"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="absolute right-2.5 top-2.5 text-[#80868b] hover:text-[#111111]"
              >
                {showGemini ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Groq API Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#111111] flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5 text-[#5f6368]" /> Groq API Key (Llama 3.3)
              </span>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                className="text-[#1a73e8] hover:underline flex items-center gap-1 text-[11px] font-mono"
              >
                Get Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="relative">
              <input
                type={showGroq ? "text" : "password"}
                placeholder="gsk_..."
                value={localConfig.groqApiKey || ""}
                onChange={(e) =>
                  setLocalConfig((prev) => ({
                    ...prev,
                    groqApiKey: e.target.value,
                  }))
                }
                className="w-full bg-white border border-[#dadce0] rounded-lg px-3 py-2 text-xs font-mono text-[#111111] placeholder-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] pr-9"
              />
              <button
                type="button"
                onClick={() => setShowGroq(!showGroq)}
                className="absolute right-2.5 top-2.5 text-[#80868b] hover:text-[#111111]"
              >
                {showGroq ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Firecrawl Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#111111] font-mono">
                Firecrawl API Key (Optional)
              </span>
              <a
                href="https://firecrawl.dev"
                target="_blank"
                rel="noreferrer"
                className="text-[#1a73e8] hover:underline flex items-center gap-1 text-[11px] font-mono"
              >
                Get Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="relative">
              <input
                type={showFirecrawl ? "text" : "password"}
                placeholder="fc-..."
                value={localConfig.firecrawlApiKey || ""}
                onChange={(e) =>
                  setLocalConfig((prev) => ({
                    ...prev,
                    firecrawlApiKey: e.target.value,
                  }))
                }
                className="w-full bg-white border border-[#dadce0] rounded-lg px-3 py-2 text-xs font-mono text-[#111111] placeholder-[#80868b] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] pr-9"
              />
              <button
                type="button"
                onClick={() => setShowFirecrawl(!showFirecrawl)}
                className="absolute right-2.5 top-2.5 text-[#80868b] hover:text-[#111111]"
              >
                {showFirecrawl ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between border-t border-[#dadce0]">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-[#5f6368] hover:text-[#111111] font-mono underline"
          >
            Clear Stored Keys
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default ConfigDrawer;
