"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  Terminal,
  FileText,
  Sparkles,
  Bot,
  Cpu,
  Moon,
  Sun,
  Code2,
} from "lucide-react";
import { UniversalSkill } from "@/lib/types";
import { MarkdownView } from "./MarkdownView";

export interface ComponentCodeViewerProps {
  skill: UniversalSkill;
}

export function ComponentCodeViewer({ skill }: ComponentCodeViewerProps) {
  const [activeTab, setActiveTab] = useState<"component" | "prompts" | "source">("component");
  const [activeModel, setActiveModel] = useState<"gemini" | "cursor" | "chatgpt" | "claude">("gemini");
  const [sourceMode, setSourceMode] = useState<"rendered" | "raw">("rendered");
  const [editorTheme, setEditorTheme] = useState<"light" | "dark">("dark");
  const [copied, setCopied] = useState(false);

  const code = skill.componentCode || "// Generating component code...";

  const currentPrompt =
    activeModel === "gemini"
      ? skill.modelPrompts.gemini
      : activeModel === "cursor"
      ? skill.modelPrompts.cursor
      : activeModel === "chatgpt"
      ? skill.modelPrompts.chatgpt
      : skill.modelPrompts.claude;

  const handleCopy = () => {
    let textToCopy = "";
    if (activeTab === "component") {
      textToCopy = code;
    } else if (activeTab === "prompts") {
      textToCopy = currentPrompt;
    } else {
      textToCopy = skill.rawMarkdownSnippet || "";
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    if (activeTab === "component") {
      const blob = new Blob([code], { type: "text/typescript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${skill.name}.tsx`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (activeTab === "prompts") {
      const blob = new Blob([currentPrompt], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${skill.name}-${activeModel}-prompt.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const blob = new Blob([skill.rawMarkdownSnippet || ""], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${skill.name}-scraped-source.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const lines = code.split("\n");

  return (
    <div className="flex flex-col h-full bg-[#0a0b0e] border border-[#262930] rounded-2xl overflow-hidden shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#121316] border-b border-[#262930] gap-2 shrink-0">
        {/* Primary View Switcher */}
        <div className="flex items-center gap-1 bg-[#0a0b0e] p-1 rounded-xl border border-[#262930] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("component")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "component"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3c4043] font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#3186ff]" />
            <span>Component.tsx</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("prompts")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "prompts"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3c4043] font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffe432]" />
            <span>AI Prompts</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("source")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "source"
                ? "bg-[#1e2026] text-white shadow-xs border border-[#3c4043] font-semibold"
                : "text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#9aa0a6]" />
            <span>Scraped Source</span>
          </button>
        </div>

        {/* Right Tools: Theme toggle, Download, Copy */}
        <div className="flex items-center gap-1.5">
          {activeTab === "component" && (
            <button
              type="button"
              onClick={() => setEditorTheme(editorTheme === "light" ? "dark" : "light")}
              title={`Switch to ${editorTheme === "light" ? "Dark" : "Light"} theme`}
              className="p-1.5 rounded-lg text-[#9aa0a6] hover:text-white hover:bg-[#16181d] border border-transparent hover:border-[#262930] transition-all cursor-pointer"
            >
              {editorTheme === "light" ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-[#ffe432]" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleDownload}
            title="Download file"
            className="p-1.5 rounded-lg text-[#9aa0a6] hover:text-white hover:bg-[#16181d] border border-transparent hover:border-[#262930] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#16181d] hover:bg-[#20232a] border border-[#262930] shadow-xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#34A853]" />
                <span className="text-[#34A853] text-xs font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#9aa0a6]" />
                <span className="text-xs">
                  Copy {activeTab === "component" ? "Code" : activeTab === "prompts" ? "Prompt" : "Source"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-hidden flex flex-col bg-[#0a0b0e]">
        {/* Tab 1: Component.tsx with IDE Gutter & Syntax Coloring */}
        {activeTab === "component" && (
          <div
            className={`flex-1 overflow-auto font-mono text-xs leading-relaxed select-text transition-colors ${
              editorTheme === "dark"
                ? "bg-[#0e0f13] text-[#e8eaed]"
                : "bg-[#121316] text-[#bdc1c6]"
            }`}
          >
            <div className="flex min-w-full p-4">
              {/* Line Numbers Gutter */}
              <div
                className="pr-4 mr-4 text-right select-none border-r text-[#5f6368] border-[#262930]"
              >
                {lines.map((_, i) => (
                  <div key={i} className="leading-relaxed">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code Surface */}
              <pre className="flex-1 whitespace-pre leading-relaxed overflow-x-auto">
                {lines.map((line, i) => {
                  // Simple syntax tinting for key statements
                  let colorClass = "";
                  if (/^\s*(import|export|from|default)\b/.test(line)) {
                    colorClass = "text-[#3186ff]";
                  } else if (/^\s*(const|let|var|function|return|interface|type)\b/.test(line)) {
                    colorClass = "text-[#c58af9]";
                  } else if (/^\s*(\/\/|\/\*)/.test(line)) {
                    colorClass = "text-[#5f6368] italic";
                  }

                  return (
                    <div key={i} className={colorClass}>
                      {line || " "}
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: AI Model Prompts Selector */}
        {activeTab === "prompts" && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0a0b0e] text-[#bdc1c6]">
            {/* Model Sub-Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveModel("gemini")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeModel === "gemini"
                    ? "bg-[#1a73e8]/20 text-[#3186ff] border border-[#1a73e8]/40 font-semibold shadow-2xs"
                    : "bg-[#121316] border border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#3186ff]" />
                <span>Google Gemini</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModel("cursor")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeModel === "cursor"
                    ? "bg-[#ffe432]/15 text-[#ffe432] border border-[#ffe432]/30 font-semibold shadow-2xs"
                    : "bg-[#121316] border border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-[#ffe432]" />
                <span>Cursor (.cursorrules)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModel("chatgpt")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeModel === "chatgpt"
                    ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 font-semibold shadow-2xs"
                    : "bg-[#121316] border border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>ChatGPT / OpenAI</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModel("claude")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeModel === "claude"
                    ? "bg-[#1e2026] text-white border border-[#3c4043] font-semibold shadow-2xs"
                    : "bg-[#121316] border border-[#262930] text-[#9aa0a6] hover:text-white hover:bg-[#16181d]"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-[#9aa0a6]" />
                <span>Anthropic Claude</span>
              </button>
            </div>

            {/* Model Target Guidance Card */}
            <div className="p-3 bg-[#121316] border border-[#262930] rounded-xl text-xs text-[#9aa0a6] font-mono leading-relaxed">
              {activeModel === "gemini" && (
                <p>
                  <strong className="text-white">Google Gemini:</strong> Paste into Google AI Studio (System Instructions) or your Gemini API backend system instructions.
                </p>
              )}
              {activeModel === "cursor" && (
                <p>
                  <strong className="text-white">Cursor & Windsurf:</strong> Save directly as <code className="text-[#3186ff] font-bold">.cursorrules</code> in the root of your workspace.
                </p>
              )}
              {activeModel === "chatgpt" && (
                <p>
                  <strong className="text-white">ChatGPT:</strong> Paste into the Custom GPT &quot;Instructions&quot; field or ChatGPT project instructions.
                </p>
              )}
              {activeModel === "claude" && (
                <p>
                  <strong className="text-white">Claude:</strong> Add to Claude Project Knowledge or the prompt system instructions block.
                </p>
              )}
            </div>

            {/* Prompt Content Box */}
            <div className="rounded-xl border border-[#262930] bg-[#0e0f13] p-4 font-mono text-xs text-[#e8eaed] leading-relaxed whitespace-pre-wrap select-text max-h-[500px] overflow-y-auto">
              {currentPrompt}
            </div>
          </div>
        )}

        {/* Tab 3: Scraped Source (Rendered via MarkdownView or Clean Raw) */}
        {activeTab === "source" && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#0a0b0e] space-y-3">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-[#262930]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#9aa0a6]">
                <FileText className="w-3.5 h-3.5 text-[#3186ff]" />
                <span>Source content extracted from {skill.targetUrl}</span>
              </div>
              <div className="flex items-center gap-1 bg-[#121316] p-0.5 rounded-lg text-[11px] font-mono border border-[#262930]">
                <button
                  type="button"
                  onClick={() => setSourceMode("rendered")}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                    sourceMode === "rendered"
                      ? "bg-[#1e2026] text-white shadow-2xs font-semibold"
                      : "text-[#9aa0a6] hover:text-white"
                  }`}
                >
                  Rendered
                </button>
                <button
                  type="button"
                  onClick={() => setSourceMode("raw")}
                  className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                    sourceMode === "raw"
                      ? "bg-[#1e2026] text-white shadow-2xs font-semibold"
                      : "text-[#9aa0a6] hover:text-white"
                  }`}
                >
                  Raw Markdown
                </button>
              </div>
            </div>

            {sourceMode === "rendered" ? (
              <MarkdownView content={skill.rawMarkdownSnippet || "No source content recorded."} />
            ) : (
              <div className="rounded-xl border border-[#262930] bg-[#0e0f13] p-4 font-mono text-xs text-[#e8eaed] leading-relaxed whitespace-pre-wrap select-text">
                {skill.rawMarkdownSnippet || "No source content recorded."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-[#121316] border-t border-[#262930] text-[11px] text-[#9aa0a6] font-mono flex items-center justify-between shrink-0">
        <span>Stack: React + TypeScript + Tailwind CSS</span>
        <span>
          {activeTab === "component"
            ? `${lines.length} lines of code`
            : activeTab === "prompts"
            ? `Prompt for ${activeModel.toUpperCase()}`
            : "Scraped Page Data"}
        </span>
      </div>
    </div>
  );
}
