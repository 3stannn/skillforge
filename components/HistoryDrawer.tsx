"use client";

import React from "react";
import { Drawer } from "./ui/drawer";
import { Badge } from "./ui/badge";
import { UniversalSkill } from "@/lib/types";
import { History, ArrowRight, Trash2, Calendar, Sparkles } from "lucide-react";

export interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  skills: UniversalSkill[];
  onSelectSkill: (skill: UniversalSkill) => void;
  onDeleteSkill: (id: string) => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  skills,
  onSelectSkill,
  onDeleteSkill,
}: HistoryDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Saved Skill Blueprints"
      description={`${skills.length} extracted specifications in local SQLite.`}
      width="md"
    >
      <div className="space-y-3">
        {skills.length === 0 ? (
          <div className="text-center py-12 text-[#5f6368] space-y-2">
            <History className="w-8 h-8 mx-auto text-[#80868b] opacity-40" />
            <p className="text-xs font-mono">No extracted skills saved yet.</p>
            <p className="text-[11px] text-[#80868b]">
              Enter any URL above to scrape and generate a SKILL.md.
            </p>
          </div>
        ) : (
          skills.map((s) => (
            <div
              key={s.id || s.name}
              className="p-4 rounded-xl bg-white border border-[#dadce0] hover:border-[#1a73e8]/50 shadow-xs transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-mono text-xs font-semibold text-[#111111]">
                    {s.title || s.name}
                  </h4>
                  <p className="text-[11px] text-[#5f6368] font-mono truncate max-w-xs mt-0.5">
                    {s.targetUrl}
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f1f3f4] text-[#1a73e8] border border-[#dadce0] font-medium">
                  {s.styles.colors.length} colors
                </span>
              </div>

              <p className="text-xs text-[#5f6368] line-clamp-2 leading-relaxed">
                {s.description}
              </p>

              <div className="flex items-center justify-between pt-2 text-[10px] text-[#80868b] border-t border-[#dadce0]/70">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" />
                  {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "Recent"}
                </span>

                <div className="flex items-center gap-2">
                  {s.id && (
                    <button
                      type="button"
                      onClick={() => onDeleteSkill(s.id!)}
                      className="p-1 rounded text-[#80868b] hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSkill(s);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#111111] hover:bg-black text-white transition-colors text-xs font-medium cursor-pointer"
                  >
                    <span>Load</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Drawer>
  );
}

export default HistoryDrawer;
