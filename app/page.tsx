"use client";

import React, { useState, useEffect } from "react";
import { UrlInputForm } from "@/components/UrlInputForm";
import { ConfigDrawer } from "@/components/ConfigDrawer";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ResultsWorkspace } from "@/components/ResultsWorkspace";
import { SplashScreen } from "@/components/SplashScreen";
import {
  ApiKeysConfig,
  UniversalSkill,
  GenerationStepUpdate,
} from "@/lib/types";
import { AlertCircle, History, Sliders, ArrowLeft } from "lucide-react";

const STORAGE_KEY = "skillforge_config";

export default function Home() {
  const [config, setConfig] = useState<ApiKeysConfig>({
    groqApiKey: "",
    geminiApiKey: "",
    firecrawlApiKey: "",
    preferredLlm: "auto",
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySkills, setHistorySkills] = useState<UniversalSkill[]>([]);
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
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConfig((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn("Failed to read config from localStorage:", e);
    }

    try {
      const seen = sessionStorage.getItem("skillforge_seen_splash");
      if (seen === "true") {
        setShowSplash(false);
      }
    } catch (e) {
      console.warn("Failed to read splash state:", e);
    }

    fetchHistory();
  }, []);

  const handleDismissSplash = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem("skillforge_seen_splash", "true");
    } catch (e) {
      console.warn("Failed to write splash state:", e);
    }
  };

  const saveConfig = (updated: ApiKeysConfig) => {
    setConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to write config to localStorage:", e);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        setHistorySkills(data.skills || []);
      }
    } catch (err) {
      console.warn("Failed to fetch history:", err);
    }
  };

  const handleDeleteHistory = async (id: string) => {
    try {
      const res = await fetch(`/api/history?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setHistorySkills((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete history item:", err);
    }
  };

  const handleGenerateSkill = async (targetUrl: string) => {
    setIsGenerating(true);
    setCurrentStep(1);
    setActiveUrl(targetUrl);
    setGenerationError(null);
    setStepsLog([]);

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
                fetchHistory();
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
      className="min-h-screen flex flex-col bg-white text-[#1f1f1f] relative overflow-x-hidden selection:bg-[#1a73e8]/20 selection:text-[#1a73e8]"
    >
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onDismiss={handleDismissSplash} />
      )}

      {/* Consistent Unified Navbar */}
      <header className="w-full h-16 sm:h-20 px-6 sm:px-12 flex items-center justify-between border-b border-[#dadce0]/70 bg-white/95 backdrop-blur-md sticky top-0 z-30">
        {/* Brand & Quick Actions */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveSkill(null)}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <span className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.035em] text-[#111111] group-hover:text-[#1a73e8] transition-colors">
              SkillForge
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#111111]/5 text-[#5f6368] border border-[#dadce0] font-medium">
              v1.0
            </span>
          </div>

          {activeSkill && (
            <button
              type="button"
              onClick={() => setActiveSkill(null)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#111111] bg-[#f1f3f4] hover:bg-[#e8eaed] border border-[#dadce0] transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#5f6368]" />
              <span className="hidden sm:inline">New Extraction</span>
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowSplash(true)}
            title="View Splash Screen"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#202124] bg-[#f1f3f4] hover:bg-[#e8eaed] border border-[#dadce0] transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#ffe432]" />
            <span>Splash</span>
          </button>
          <button
            type="button"
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#202124] bg-[#f1f3f4] hover:bg-[#e8eaed] border border-[#dadce0] transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-[#5f6368]" />
            <span>Saved Skills</span>
            {historySkills.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-[#1a73e8]/15 text-[#1a73e8] font-mono font-semibold">
                {historySkills.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#202124] bg-[#f1f3f4] hover:bg-[#e8eaed] border border-[#dadce0] transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#5f6368]" />
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
          <div className="w-full max-w-3xl mx-auto p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-rose-900">Extraction Error:</span>
              <p className="leading-relaxed font-mono">{generationError}</p>
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

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        skills={historySkills}
        onSelectSkill={(skill) => {
          setActiveSkill(skill);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onDeleteSkill={handleDeleteHistory}
      />

      {/* Consistent Unified Footer */}
      <footer className="w-full px-6 sm:px-12 py-5 border-t border-[#dadce0]/70 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#5f6368]">
        <div>SkillForge Engine • Google Sans Flex</div>
        <div>Universal SKILL.md (Gemini • ChatGPT • Cursor • Claude)</div>
      </footer>
    </div>
  );
}
