"use client";

import React, { useState } from "react";
import { DesignMdViewer } from "./DesignMdViewer";
import { LiveSpecimenViewer } from "./LiveSpecimenViewer";
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
  ArrowLeft,
  Compass,
  FileText,
} from "lucide-react";
import { DesignSystemData } from "@/lib/types";

export interface ResultsWorkspaceProps {
  skill: DesignSystemData;
  onReset: () => void;
}

export function ResultsWorkspace({ skill, onReset }: ResultsWorkspaceProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedDesignMd, setCopiedDesignMd] = useState(false);

  const designMdContent = skill.designMd || skill.skillMd || "";

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/download-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill }),
      });

      if (!response.ok) throw new Error("Failed to generate design system zip bundle");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `designmd-${skill.name.replace(/_/g, "-")}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download design system bundle. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyDesignMd = () => {
    navigator.clipboard.writeText(designMdContent);
    setCopiedDesignMd(true);
    setTimeout(() => setCopiedDesignMd(false), 1800);
  };

  const handleDownloadDesignMd = () => {
    const blob = new Blob([designMdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DESIGN-${skill.name.replace(/_/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      className="w-full max-w-7xl mx-auto space-y-3.5 animate-in fade-in duration-200"
    >
      {/* Sub-Navigation: Back to Explorer & Status */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#e8eaed] bg-[#121316] hover:bg-[#1c1e24] border border-[#262930] hover:border-[#3186ff]/40 shadow-2xs transition-all hover:-translate-x-0.5 cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#9aa0a6] group-hover:text-white transition-colors" />
          <span>Explore Another Website</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#9aa0a6] font-mono">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="hidden sm:inline">DESIGN.md Spec Ready</span>
          <span className="sm:hidden">Ready</span>
        </div>
      </div>

      {/* Top Workspace Header Card (Sleek Dark Aesthetics) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 sm:p-5 bg-[#0a0b0e] border border-[#262930] rounded-2xl gap-4 shadow-xl">
        {/* Left: Title & Meta Badges */}
        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold text-white tracking-tight truncate max-w-lg">
              {skill.title || skill.name}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 font-medium border border-blue-500/20">
              <Palette className="w-3 h-3 text-blue-400" />
              {skill.semanticColors?.length || skill.styles.colors.length} Colors
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#16181d] text-[#e8eaed] font-medium border border-[#262930]">
              <FileText className="w-3 h-3 text-blue-400" />
              DESIGN.md
            </span>
            {skill.crawledPages && skill.crawledPages.length > 1 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#16181d] text-[#e8eaed] font-medium border border-[#262930]">
                <Compass className="w-3 h-3 text-blue-400" />
                {skill.crawledPages.length} Pages Explored
              </span>
            )}
            {skill.frameworks && skill.frameworks.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#16181d] text-[#9aa0a6] font-medium border border-[#262930]">
                {skill.frameworks.slice(0, 2).join(" + ")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#9aa0a6]">
            <Globe className="w-3.5 h-3.5 text-[#5f6368] shrink-0" />
            <a
              href={skill.targetUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#9aa0a6] hover:text-[#3186ff] truncate max-w-md flex items-center gap-1 font-mono text-[11px] transition-colors"
            >
              {skill.targetUrl} <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Right: Workspace Actions Toolbar */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          {/* Primary: Copy DESIGN.md */}
          <button
            type="button"
            onClick={handleCopyDesignMd}
            className="px-3.5 py-2 rounded-full bg-[#ffffff] hover:bg-[#eff0f3] text-[#000000] text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer whitespace-nowrap"
          >
            {copiedDesignMd ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#137333]" />
                <span>DESIGN.md Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy DESIGN.md</span>
              </>
            )}
          </button>

          {/* Download DESIGN.md */}
          <button
            type="button"
            onClick={handleDownloadDesignMd}
            className="px-3.5 py-2 rounded-full bg-[#121316] hover:bg-[#1c1e24] text-[#e8eaed] text-xs font-medium border border-[#262930] hover:border-blue-500/40 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>.md File</span>
          </button>

          {/* AI Rules Modal (Cursor, Claude, Gemini, ChatGPT) */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>AI Rules ▾</span>
          </button>

          {/* Download Complete Zip Package */}
          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="px-3.5 py-2 rounded-full bg-[#121316] hover:bg-[#1c1e24] text-[#e8eaed] text-xs font-medium border border-[#262930] hover:border-blue-500/40 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#9aa0a6]" />
            <span>{isDownloading ? "Bundling..." : "Download .zip"}</span>
          </button>
        </div>
      </div>

      {/* Split Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[720px] lg:h-[760px]">
        {/* Left Screen: DESIGN.md Document & Token Viewer */}
        <div className="h-full min-h-[500px]">
          <DesignMdViewer design={skill} />
        </div>

        {/* Right Screen: Live Interactive Specimens & Code Exports (Tailwind, CSS, JSON) */}
        <div className="h-full min-h-[500px]">
          <LiveSpecimenViewer design={skill} />
        </div>
      </div>

      {/* AI Agent Export Modal */}
      <ModelExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        skill={skill}
        onDownloadZip={handleDownloadZip}
      />
    </div>
  );
}

export default ResultsWorkspace;
