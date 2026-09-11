"use client";

import React, { useState } from "react";
import { SkillMdViewer } from "./SkillMdViewer";
import { ComponentCodeViewer } from "./ComponentCodeViewer";
import { ModelExportModal } from "./ModelExportModal";
import {
  Download,
  Share2,
  ExternalLink,
  Sparkles,
  Check,
  Globe,
  SlidersHorizontal,
  Palette,
  Cpu,
  ArrowLeft,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { UniversalSkill } from "@/lib/types";

export interface ResultsWorkspaceProps {
  skill: UniversalSkill;
  onReset: () => void;
}

export function ResultsWorkspace({ skill, onReset }: ResultsWorkspaceProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedSkillMd, setCopiedSkillMd] = useState(false);
  const [copiedGeminiPrompt, setCopiedGeminiPrompt] = useState(false);

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/download-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill }),
      });

      if (!response.ok) throw new Error("Failed to generate zip bundle");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `skill-${skill.name.replace(/_/g, "-")}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download skill bundle. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOneClickCopySkillMd = () => {
    navigator.clipboard.writeText(skill.skillMd);
    setCopiedSkillMd(true);
    setTimeout(() => setCopiedSkillMd(false), 1800);
  };

  const handleCopyGeminiPrompt = () => {
    navigator.clipboard.writeText(skill.modelPrompts.gemini);
    setCopiedGeminiPrompt(true);
    setTimeout(() => setCopiedGeminiPrompt(false), 1800);
  };

  return (
    <div
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      className="w-full max-w-7xl mx-auto space-y-3.5 animate-in fade-in duration-200"
    >
      {/* Sub-Navigation: Back to Extractor & Status */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#202124] bg-white hover:bg-[#f1f3f4] border border-[#dadce0] shadow-2xs transition-all hover:-translate-x-0.5 cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#5f6368] group-hover:text-[#111111] transition-colors" />
          <span>Extract Another Website</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#5f6368] font-mono">
          <span className="w-2 h-2 rounded-full bg-[#34A853]" />
          <span className="hidden sm:inline">Universal Skill Ready</span>
          <span className="sm:hidden">Ready</span>
        </div>
      </div>

      {/* Top Workspace Header Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 sm:p-5 bg-white border border-[#dadce0] rounded-2xl gap-4 shadow-xs">
        {/* Left: Title & Meta Badges */}
        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold text-[#111111] tracking-tight truncate max-w-lg">
              {skill.title || skill.name}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#e8f0fe] text-[#1a73e8] font-medium border border-[#1a73e8]/20">
              <Palette className="w-3 h-3 text-[#1a73e8]" />
              {skill.styles.colors.length} Colors
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#f1f3f4] text-[#5f6368] font-medium border border-[#dadce0]">
              <Cpu className="w-3 h-3 text-[#5f6368]" />
              {skill.logic.stateVariables.length} States
            </span>
            {skill.crawledPages && skill.crawledPages.length > 1 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#e6f4ea] text-[#137333] font-medium border border-[#34A853]/30">
                <Compass className="w-3 h-3 text-[#137333]" />
                {skill.crawledPages.length} Pages Crawled
              </span>
            )}
            {skill.frameworks && skill.frameworks.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#f8f9fa] text-[#3c4043] font-medium border border-[#dadce0]">
                {skill.frameworks.slice(0, 2).join(" + ")}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#fef7e0] text-[#b06000] font-medium border border-[#fbbc04]/30">
              Multi-Model
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#5f6368]">
            <Globe className="w-3.5 h-3.5 text-[#80868b] shrink-0" />
            <a
              href={skill.targetUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#5f6368] hover:text-[#1a73e8] truncate max-w-md flex items-center gap-1 font-mono text-[11px] transition-colors"
            >
              {skill.targetUrl} <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Right: Workspace Actions Toolbar (No Wrap on Large Viewports) */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          {/* Primary: Copy SKILL.md */}
          <button
            type="button"
            onClick={handleOneClickCopySkillMd}
            className="px-3.5 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer whitespace-nowrap"
          >
            {copiedSkillMd ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#34A853]" />
                <span>SKILL.md Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy SKILL.md</span>
              </>
            )}
          </button>

          {/* Copy Gemini Instructions */}
          <button
            type="button"
            onClick={handleCopyGeminiPrompt}
            className="px-3.5 py-2 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer whitespace-nowrap"
          >
            {copiedGeminiPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#ffe432]" />
                <span>Gemini Copied!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gemini Prompt</span>
              </>
            )}
          </button>

          {/* Multi-Model Export Modal */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-2 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] text-xs font-medium border border-[#dadce0] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5f6368]" />
            <span>Multi-Model ▾</span>
          </button>

          {/* Download Complete Zip Package */}
          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="px-3.5 py-2 rounded-full bg-white hover:bg-[#f1f3f4] text-[#202124] text-xs font-medium border border-[#dadce0] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#5f6368]" />
            <span>{isDownloading ? "Bundling..." : "Download .zip"}</span>
          </button>
        </div>
      </div>

      {/* Split Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[720px] lg:h-[760px]">
        {/* Left Screen: SKILL.md Viewer & Extracted Styles/Logic */}
        <div className="h-full min-h-[500px]">
          <SkillMdViewer skill={skill} />
        </div>

        {/* Right Screen: Reconstructed React + Tailwind Component Code */}
        <div className="h-full min-h-[500px]">
          <ComponentCodeViewer skill={skill} />
        </div>
      </div>

      {/* Model Export Modal */}
      <ModelExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        skill={skill}
        onDownloadZip={handleDownloadZip}
      />
    </div>
  );
}
