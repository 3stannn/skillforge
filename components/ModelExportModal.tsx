"use client";

import React, { useState } from "react";
import { Dialog } from "./ui/dialog";
import { Copy, Check, Download, Sparkles, Terminal, Bot, Cpu } from "lucide-react";
import { UniversalSkill } from "@/lib/types";

export interface ModelExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: UniversalSkill;
  onDownloadZip: () => void;
}

export function ModelExportModal({
  isOpen,
  onClose,
  skill,
  onDownloadZip,
}: ModelExportModalProps) {
  const [activeModel, setActiveModel] = useState<"gemini" | "cursor" | "chatgpt" | "claude">("gemini");
  const [copied, setCopied] = useState(false);

  const modelOptions = [
    { id: "gemini", name: "Google Gemini", icon: Sparkles, color: "text-[#1a73e8]" },
    { id: "cursor", name: "Cursor & Windsurf", icon: Terminal, color: "text-[#b06000]" },
    { id: "chatgpt", name: "ChatGPT / OpenAI", icon: Bot, color: "text-[#188038]" },
    { id: "claude", name: "Anthropic Claude", icon: Cpu, color: "text-[#5f6368]" },
  ] as const;

  const currentPrompt =
    activeModel === "gemini"
      ? skill.modelPrompts.gemini
      : activeModel === "cursor"
      ? skill.modelPrompts.cursor
      : activeModel === "chatgpt"
      ? skill.modelPrompts.chatgpt
      : skill.modelPrompts.claude;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Export Skill for All AI Models"
      description="Copy model-specific instructions or download the complete project bundle."
      maxWidth="xl"
    >
      <div className="space-y-4 text-sm text-[#bdc1c6]">
        {/* Model Tabs */}
        <div className="flex flex-wrap gap-2">
          {modelOptions.map((m) => {
            const Icon = m.icon;
            const isSelected = activeModel === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setActiveModel(m.id);
                  setCopied(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1a73e8]/20 text-[#3186ff] border-[#1a73e8]/40 shadow-2xs font-semibold"
                    : "bg-[#121316] border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>

        {/* Model Instructions Banner */}
        <div className="p-3 bg-[#121316] rounded-xl border border-[#262930] text-xs text-[#9aa0a6] font-mono leading-relaxed">
          {activeModel === "gemini" && (
            <p>
              <strong className="text-white">Google Gemini:</strong> Paste into Google AI Studio (System Instructions) or Gemini API system instructions.
            </p>
          )}
          {activeModel === "cursor" && (
            <p>
              <strong className="text-white">Cursor & Windsurf:</strong> Save as <code className="text-[#3186ff] font-bold">.cursorrules</code> in your project root.
            </p>
          )}
          {activeModel === "chatgpt" && (
            <p>
              <strong className="text-white">ChatGPT / OpenAI:</strong> Paste into the Custom GPT &quot;Instructions&quot; field.
            </p>
          )}
          {activeModel === "claude" && (
            <p>
              <strong className="text-white">Anthropic Claude:</strong> Add to Claude Project Knowledge or custom instructions.
            </p>
          )}
        </div>

        {/* Prompt Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9aa0a6]">
              Prompt Template
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium text-[#3186ff] bg-[#1a73e8]/20 border border-[#1a73e8]/30 hover:bg-[#1a73e8]/30 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#34A853]" />
                  <span className="text-[#34A853]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 bg-[#0e0f13] rounded-xl border border-[#262930] font-mono text-xs text-[#e8eaed] overflow-x-auto max-h-56 leading-relaxed whitespace-pre-wrap select-text shadow-inner">
            {currentPrompt}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#262930]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-medium text-[#9aa0a6] hover:text-white hover:bg-[#16181d] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onDownloadZip}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#e8eaed] text-black text-xs font-medium shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All (.zip)</span>
          </button>
        </div>
      </div>
    </Dialog>
  );
}
