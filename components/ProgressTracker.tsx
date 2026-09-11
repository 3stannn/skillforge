"use client";

import React from "react";
import { CheckCircle2, Loader2, AlertCircle, Globe, Palette, Cpu, Sparkles } from "lucide-react";
import { GenerationStepUpdate } from "@/lib/types";

export interface ProgressTrackerProps {
  currentStep: number;
  steps: GenerationStepUpdate[];
  activeUrl: string;
}

const STEP_DEFINITIONS = [
  {
    step: 1,
    title: "Scraping target URL & extracting styles + scripts",
    description: "Capturing CSS variables, color palettes, fonts, and inline scripts",
    icon: Globe,
  },
  {
    step: 2,
    title: "Analyzing visual design system & interactive logic",
    description: "Synthesizing typography hierarchy, layout rules, state flows, and event listeners",
    icon: Palette,
  },
  {
    step: 3,
    title: "Synthesizing universal SKILL.md for all AI models",
    description: "Formulating canonical YAML frontmatter, design specifications, and model directives",
    icon: Sparkles,
  },
  {
    step: 4,
    title: "Compiling component code & cross-model adapters",
    description: "Generating React + Tailwind TSX component and export prompts for Gemini, ChatGPT, Cursor, and Claude",
    icon: Cpu,
  },
];

export function ProgressTracker({
  currentStep,
  steps,
  activeUrl,
}: ProgressTrackerProps) {
  return (
    <div
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      className="w-full max-w-3xl mx-auto my-6 p-6 bg-white border border-[#dadce0] rounded-2xl space-y-5 shadow-sm animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between border-b border-[#dadce0] pb-4">
        <div className="space-y-0.5">
          <div className="text-[11px] font-mono text-[#1a73e8] font-semibold tracking-wider uppercase">
            Extraction Pipeline
          </div>
          <div className="text-xs text-[#5f6368] truncate max-w-md font-mono">
            {activeUrl}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-[#f1f3f4] text-[#1a73e8] border border-[#dadce0] font-medium">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1a73e8]" />
          <span>Step {Math.min(currentStep, 4)} of 4</span>
        </div>
      </div>

      <div className="space-y-3">
        {STEP_DEFINITIONS.map((def) => {
          const stepData = steps.find((s) => s.step === def.step);
          const isCompleted = stepData?.status === "completed" || currentStep > def.step;
          const isActive = stepData?.status === "active" || currentStep === def.step;
          const isError = stepData?.status === "error";
          const StepIcon = def.icon;

          return (
            <div
              key={def.step}
              className={`p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${
                isError
                  ? "bg-rose-50 border-rose-200"
                  : isActive
                  ? "bg-[#e8f0fe]/60 border-[#1a73e8]/40 ring-1 ring-[#1a73e8]/20"
                  : isCompleted
                  ? "bg-[#e6f4ea]/40 border-[#34A853]/30"
                  : "bg-transparent border-[#dadce0]/50 opacity-40"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isError ? (
                  <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-300">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                ) : isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center border border-[#34A853]/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                ) : isActive ? (
                  <div className="w-6 h-6 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center border border-[#1a73e8]/40">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#f1f3f4] text-[#80868b] flex items-center justify-center border border-[#dadce0]">
                    <StepIcon className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isError
                        ? "text-rose-900"
                        : isActive
                        ? "text-[#1a73e8]"
                        : isCompleted
                        ? "text-[#202124]"
                        : "text-[#80868b]"
                    }`}
                  >
                    {def.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#80868b] shrink-0 ml-2">
                    Step {def.step}/4
                  </span>
                </div>

                <p className="text-[11px] text-[#5f6368] mt-0.5 leading-relaxed">
                  {stepData?.message || def.description}
                </p>

                {stepData?.error && (
                  <p className="text-xs text-rose-700 font-mono mt-1 bg-rose-100/60 p-1.5 rounded-lg border border-rose-200">
                    {stepData.error}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressTracker;
