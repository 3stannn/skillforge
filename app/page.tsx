"use client";

import React, { useState, useEffect } from "react";
import { ProductWorkspaceShell } from "@/components/ProductWorkspaceShell";
import { SplashScreen } from "@/components/SplashScreen";
import {
  ApiKeysConfig,
  UniversalSkill,
  GenerationStepUpdate,
} from "@/lib/types";

export default function Home() {
  const [config, setConfig] = useState<ApiKeysConfig>({
    groqApiKey: "",
    geminiApiKey: "",
    firecrawlApiKey: "",
    preferredLlm: "auto",
  });

  const [showSplash, setShowSplash] = useState(false);

  // Generation Pipeline State
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepsLog, setStepsLog] = useState<GenerationStepUpdate[]>([]);
  const [activeUrl, setActiveUrl] = useState("");
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Active Skill in Results Workspace
  const [activeSkill, setActiveSkill] = useState<UniversalSkill | null>(null);

  useEffect(() => {
    // Load persisted settings on mount
    try {
      const saved = localStorage.getItem("designmd_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  const handleDismissSplash = () => {
    setShowSplash(false);
  };

  const saveConfig = (updated: ApiKeysConfig) => {
    setConfig(updated);
    try {
      localStorage.setItem("designmd_config", JSON.stringify(updated));
    } catch {}
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
    <>
      {/* Optional Splash Screen */}
      {showSplash && (
        <SplashScreen
          onDismiss={handleDismissSplash}
          onLoadExample={(example) => {
            setActiveSkill(example);
            setActiveUrl(example.targetUrl);
            setShowSplash(false);
          }}
        />
      )}

      {/* Main Product UI Shell (Image 3) */}
      <ProductWorkspaceShell
        onGenerate={handleGenerateSkill}
        isLoading={isGenerating}
        currentStep={currentStep}
        stepsLog={stepsLog}
        activeUrl={activeUrl}
        config={config}
        onSaveConfig={saveConfig}
        onShowSplash={() => setShowSplash(true)}
        activeSkill={activeSkill}
      />
    </>
  );
}

