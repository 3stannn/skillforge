"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  // Sync state whenever config prop changes or drawer opens
  useEffect(() => {
    setLocalConfig(config);
  }, [config, isOpen]);

  const handleSave = () => {
    onSaveConfig(localConfig);
    setSavedSuccess(true);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 500);
  };

  const handleClearAll = () => {
    const cleared: ApiKeysConfig = {
      groqApiKey: "",
      geminiApiKey: "",
      firecrawlApiKey: "",
      preferredLlm: "auto",
      defaultCrawlDepth: 1,
      maxCrawlPages: 5,
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
      <div className="space-y-6 text-sm text-[#bdc1c6]">
        {/* Zero Cost Notice */}
        <div className="p-4 rounded-xl bg-[#121316] border border-[#262930] text-xs leading-relaxed text-[#9aa0a6] flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-[#3186ff] mt-1 shrink-0 animate-pulse" />
          <div>
            <span className="font-semibold text-white">Zero-Cost Mode Active:</span>{" "}
            No API keys required. DesignMD extracts DOM styles and design tokens out of the box. Add your free Gemini or Groq key for multi-step reasoning.
          </div>
        </div>

        {/* LLM Provider Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
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
                    ? "bg-white border-white text-black font-semibold shadow-xs"
                    : "bg-[#121316] border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deep Crawl & Exploration Settings */}
        <div className="border-t border-[#262930] pt-4 space-y-3">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
            Scraper Depth & Exploration
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-medium">Default Crawl Mode</span>
              <span className="text-[#9aa0a6] font-mono text-[11px]">
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
                    ? "bg-white border-white text-black font-semibold shadow-xs"
                    : "bg-[#121316] border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
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
                    ? "bg-white border-white text-black font-semibold shadow-xs"
                    : "bg-[#121316] border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
                }`}
              >
                Single Page
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-medium">Max Sub-Pages Cap</span>
              <span className="font-mono text-[#3186ff] font-bold text-xs">
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
                      ? "bg-[#1a73e8] border-[#3186ff] text-white shadow-xs"
                      : "bg-[#121316] border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
                  }`}
                >
                  {num} pages
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#262930] pt-4 space-y-4">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6] flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-[#9aa0a6]" />
            Custom API Keys (Session Only)
          </h3>

          {/* Gemini API Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-white flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#3186ff]" /> Google Gemini Key
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[#3186ff] hover:text-[#5fa5ff] hover:underline flex items-center gap-1 text-[11px] font-mono"
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
                className="w-full bg-[#121316] border border-[#262930] rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-[#5f6368] focus:outline-none focus:border-[#3186ff] focus:ring-1 focus:ring-[#3186ff] pr-9"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="absolute right-2.5 top-2.5 text-[#5f6368] hover:text-white"
              >
                {showGemini ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Groq API Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-white flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5 text-[#9aa0a6]" /> Groq API Key (Llama 3.3)
              </span>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                className="text-[#3186ff] hover:text-[#5fa5ff] hover:underline flex items-center gap-1 text-[11px] font-mono"
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
                className="w-full bg-[#121316] border border-[#262930] rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-[#5f6368] focus:outline-none focus:border-[#3186ff] focus:ring-1 focus:ring-[#3186ff] pr-9"
              />
              <button
                type="button"
                onClick={() => setShowGroq(!showGroq)}
                className="absolute right-2.5 top-2.5 text-[#5f6368] hover:text-white"
              >
                {showGroq ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Firecrawl Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-white font-mono">
                Firecrawl API Key (Optional)
              </span>
              <a
                href="https://firecrawl.dev"
                target="_blank"
                rel="noreferrer"
                className="text-[#3186ff] hover:text-[#5fa5ff] hover:underline flex items-center gap-1 text-[11px] font-mono"
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
                className="w-full bg-[#121316] border border-[#262930] rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-[#5f6368] focus:outline-none focus:border-[#3186ff] focus:ring-1 focus:ring-[#3186ff] pr-9"
              />
              <button
                type="button"
                onClick={() => setShowFirecrawl(!showFirecrawl)}
                className="absolute right-2.5 top-2.5 text-[#5f6368] hover:text-white"
              >
                {showFirecrawl ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between border-t border-[#262930]">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-[#9aa0a6] hover:text-white font-mono underline cursor-pointer"
          >
            Clear Keys
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-white hover:bg-[#e8eaed] text-black text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
