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
    title: "Exploring URL & crawling site hierarchy",
    description: "Discovering key pages, DOM components, and external stylesheets",
    icon: Globe,
  },
  {
    step: 2,
    title: "Extracting design tokens, colors & typography",
    description: "Categorizing semantic palette, typography scale, spacing, and shadows",
    icon: Palette,
  },
  {
    step: 3,
    title: "Synthesizing spec-compliant DESIGN.md with AI",
    description: "Formulating design principles, component specs, and agent implementation rules",
    icon: Sparkles,
  },
  {
    step: 4,
    title: "Compiling Tailwind config, CSS variables & live specimens",
    description: "Generating code tokens and interactive preview specimens",
    icon: Cpu,
  },
];

export const ProgressTracker = React.memo(function ProgressTracker({
  currentStep,
  steps,
  activeUrl,
}: ProgressTrackerProps) {
  const stepsByStep = React.useMemo(() => {
    const map = new Map<number, GenerationStepUpdate>();
    for (const step of steps) {
      map.set(step.step, step);
    }
    return map;
  }, [steps]);
  return (
    <div
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      className="w-full max-w-3xl mx-auto my-6 p-6 bg-[#0a0b0e] border border-[#262930] rounded-2xl space-y-5 shadow-xl animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between border-b border-[#262930] pb-4">
        <div className="space-y-0.5">
          <div className="text-[11px] font-mono text-[#3186ff] font-semibold tracking-wider uppercase">
            Design Extraction Pipeline
          </div>
          <div className="text-xs text-[#9aa0a6] truncate max-w-md font-mono">
            {activeUrl}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-[#121316] text-[#3186ff] border border-[#262930] font-medium">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#3186ff]" />
          <span>Step {Math.min(currentStep, 4)} of 4</span>
        </div>
      </div>

      <div className="space-y-3">
        {STEP_DEFINITIONS.map((def) => {
          const stepData = stepsByStep.get(def.step);
          const isCompleted = stepData?.status === "completed" || currentStep > def.step;
          const isActive = stepData?.status === "active" || currentStep === def.step;
          const isError = stepData?.status === "error";
          const StepIcon = def.icon;

          return (
            <div
              key={def.step}
              className={`p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${
                isError
                  ? "bg-rose-950/40 border-rose-800/60"
                  : isActive
                  ? "bg-[#1a73e8]/10 border-[#3186ff]/40 ring-1 ring-[#1a73e8]/20"
                  : isCompleted
                  ? "bg-[#34A853]/10 border-[#34A853]/30"
                  : "bg-transparent border-[#262930]/40 opacity-40"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isError ? (
                  <div className="w-6 h-6 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center border border-rose-800">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                ) : isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-[#34A853]/20 text-[#34A853] flex items-center justify-center border border-[#34A853]/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                ) : isActive ? (
                  <div className="w-6 h-6 rounded-full bg-[#1a73e8]/20 text-[#3186ff] flex items-center justify-center border border-[#3186ff]/40">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#16181d] text-[#5f6368] flex items-center justify-center border border-[#262930]">
                    <StepIcon className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isError
                        ? "text-rose-300"
                        : isActive
                        ? "text-[#3186ff]"
                        : isCompleted
                        ? "text-white"
                        : "text-[#5f6368]"
                    }`}
                  >
                    {def.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#5f6368] shrink-0 ml-2">
                    Step {def.step}/4
                  </span>
                </div>

                <p className="text-[11px] text-[#9aa0a6] mt-0.5 leading-relaxed">
                  {stepData?.message || def.description}
                </p>

                {stepData?.error ? (
                  <p className="text-xs text-rose-300 font-mono mt-1 bg-rose-950/60 p-1.5 rounded-lg border border-rose-800/60">
                    {stepData.error}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ProgressTracker;
