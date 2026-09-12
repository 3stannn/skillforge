"use client";

import React, { useState, useEffect } from "react";
import { UrlInputForm } from "@/components/UrlInputForm";
import { ConfigDrawer } from "@/components/ConfigDrawer";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ResultsWorkspace } from "@/components/ResultsWorkspace";
import { SplashScreen } from "@/components/SplashScreen";
import {
  ApiKeysConfig,
  UniversalSkill,
  GenerationStepUpdate,
} from "@/lib/types";
import { AlertCircle, Sliders, ArrowLeft } from "lucide-react";

export default function Home() {
  const [config, setConfig] = useState<ApiKeysConfig>({
    groqApiKey: "",
    geminiApiKey: "",
    firecrawlApiKey: "",
    preferredLlm: "auto",
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Generation Pipeline State
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepsLog, setStepsLog] = useState<GenerationStepUpdate[]>([]);
  const [activeUrl, setActiveUrl] = useState("");
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Active Skill in Results Workspace
  const [activeSkill, setActiveSkill] = useState<UniversalSkill | null>(null);

  useEffect(() => {
    // Purge any legacy stored config from localStorage to clean up previously persisted keys
    try {
      localStorage.removeItem("skillforge_config");
    } catch {}
  }, []);

  const handleDismissSplash = () => {
    setShowSplash(false);
  };

  const saveConfig = (updated: ApiKeysConfig) => {
    setConfig(updated);
  };

  const handleGenerateSkill = async (
    targetUrl: string,
    crawlOptions?: { crawlDepth: number; maxPages: number }
  ) => {
    setIsGenerating(true);
    setCurrentStep(1);
    setActiveUrl(targetUrl);
    setGenerationError(null);
    setStepsLog([]);

    const depth = crawlOptions?.crawlDepth ?? config.defaultCrawlDepth ?? 1;
    const maxPages = crawlOptions?.maxPages ?? config.maxCrawlPages ?? 5;

    try {
      const response = await fetch("/api/generate-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: targetUrl,
          firecrawlApiKey: config.firecrawlApiKey,
          groqApiKey: config.groqApiKey,
          geminiApiKey: config.geminiApiKey,
          preferredLlm: config.preferredLlm,
          stream: true,
          crawlDepth: depth,
          maxPages,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || `HTTP ${response.status}: Failed to extract skill`);
      }

      if (!response.body) throw new Error("ReadableStream not supported by browser");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6);
            try {
              const update: GenerationStepUpdate = JSON.parse(dataStr);
              setCurrentStep(update.step);

              setStepsLog((prev) => {
                const existingIdx = prev.findIndex((s) => s.step === update.step);
                if (existingIdx !== -1) {
                  const updated = [...prev];
                  updated[existingIdx] = update;
                  return updated;
                }
                return [...prev, update];
              });

              if (update.status === "error") {
                setGenerationError(update.error || update.message);
                setIsGenerating(false);
              }

              if (update.status === "completed" && update.result) {
                setActiveSkill(update.result);
                setIsGenerating(false);
              }
            } catch (parseErr) {
              console.warn("SSE parsing error:", parseErr, dataStr);
            }
          }
        }
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setGenerationError(err.message || "An unexpected error occurred.");
      setIsGenerating(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      className="min-h-screen flex flex-col bg-[#000000] text-[#ffffff] relative overflow-x-hidden selection:bg-[#1a73e8]/30 selection:text-[#3186ff] grid-container"
    >
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onDismiss={handleDismissSplash} />
      )}

      {/* Consistent Unified Navbar (Antigravity Sleek Dark) */}
      <header className="w-full h-12 sm:h-14 px-4 sm:px-8 flex items-center justify-between bg-[#000000]/85 backdrop-blur-md border-b border-[#262930] sticky top-0 z-30">
        {/* Brand & Quick Actions */}
        <div className="flex items-center gap-2.5">
          <div
            onClick={() => setActiveSkill(null)}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <span className="text-base sm:text-lg font-semibold tracking-[-0.035em] text-[#ffffff] group-hover:text-[#3186ff] transition-colors">
              SkillForge
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121316] text-[#9aa0a6] border border-[#262930] font-medium">
              v1.0
            </span>
          </div>

          {activeSkill && (
            <button
              type="button"
              onClick={() => setActiveSkill(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-[#ffffff] bg-[#121316] hover:bg-[#1c1e24] border border-[#262930] hover:border-[#3186ff]/40 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#9aa0a6]" />
              <span className="hidden sm:inline">New Extraction</span>
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSplash(true)}
            title="View Splash Screen"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#e8eaed] bg-[#121316] hover:bg-[#1c1e24] border border-[#262930] hover:border-[#3186ff]/40 transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#ffe432] shadow-[0_0_8px_#ffe432]" />
            <span>Splash</span>
          </button>
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#e8eaed] bg-[#121316] hover:bg-[#1c1e24] border border-[#262930] hover:border-[#3186ff]/40 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#9aa0a6]" />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1">
        {/* Input Form (Only shown when not viewing results) */}
        {!activeSkill && (
          <UrlInputForm
            onSubmit={handleGenerateSkill}
            isLoading={isGenerating}
          />
        )}

        {/* Error Banner */}
        {generationError && (
          <div className="w-full max-w-3xl mx-auto p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 text-xs flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-rose-300">Extraction Error:</span>
              <p className="leading-relaxed font-mono text-rose-200">{generationError}</p>
            </div>
          </div>
        )}

        {/* Progress Tracker */}
        {isGenerating && (
          <ProgressTracker
            currentStep={currentStep}
            steps={stepsLog}
            activeUrl={activeUrl}
          />
        )}

        {/* Results Workspace */}
        {!isGenerating && activeSkill && (
          <ResultsWorkspace
            skill={activeSkill}
            onReset={() => setActiveSkill(null)}
          />
        )}
      </main>

      {/* Drawers */}
      <ConfigDrawer
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onSaveConfig={saveConfig}
      />

      {/* Consistent Unified Footer (Antigravity Minimalist Dark) */}
      <footer className="w-full px-6 sm:px-12 py-5 border-t border-[#262930] bg-[#000000] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#9aa0a6]">
        <div>SkillForge Engine • Google Sans Flex</div>
        <div>Universal SKILL.md (Gemini • ChatGPT • Cursor • Claude)</div>
      </footer>
    </div>
  );
}
