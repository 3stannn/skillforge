"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Search,
  Plus,
  Zap,
  FolderKanban,
  CheckSquare,
  Sparkles,
  Layers,
  ChevronDown,
  Star,
  Link2,
  Copy,
  GitFork,
  ChevronUp,
  Sliders,
  FileText,
  Palette,
  Eye,
  Terminal as TerminalIcon,
  ShieldCheck,
  Check,
  Compass,
  Minus,
  Maximize2,
  X,
  Play,
  Menu,
} from "lucide-react";
import {
  DesignSystemData,
  GenerationStepUpdate,
  ApiKeysConfig,
} from "@/lib/types";
import {
  EXAMPLE_SYSTEMS_MAP,
  SAMPLE_SYSTEMS_LIST,
} from "@/lib/exampleDesignSystem";
import { TerminalExtractor } from "./TerminalExtractor";

const DesignMdViewer = dynamic(
  () => import("./DesignMdViewer").then((m) => m.DesignMdViewer),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center text-xs font-mono text-[#8a8f98]">
        Loading specification viewer...
      </div>
    ),
  }
);

const LiveSpecimenViewer = dynamic(
  () => import("./LiveSpecimenViewer").then((m) => m.LiveSpecimenViewer),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center text-xs font-mono text-[#8a8f98]">
        Loading interactive specimens...
      </div>
    ),
  }
);

const SystemAuditsView = dynamic(
  () => import("./SystemAuditsView").then((m) => m.SystemAuditsView),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center text-xs font-mono text-[#8a8f98]">
        Loading audit matrix...
      </div>
    ),
  }
);

const SystemPulseView = dynamic(
  () => import("./SystemPulseView").then((m) => m.SystemPulseView),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center text-xs font-mono text-[#8a8f98]">
        Loading system telemetry...
      </div>
    ),
  }
);

const ModelExportModal = dynamic(
  () => import("./ModelExportModal").then((m) => m.ModelExportModal),
  { ssr: false }
);

const ConfigDrawer = dynamic(
  () => import("./ConfigDrawer").then((m) => m.ConfigDrawer),
  { ssr: false }
);

export interface ProductWorkspaceShellProps {
  onGenerate: (url: string, options?: { crawlDepth: number; maxPages: number }) => void;
  isLoading: boolean;
  currentStep?: number;
  stepsLog?: GenerationStepUpdate[];
  activeUrl?: string;
  config: ApiKeysConfig;
  onSaveConfig: (cfg: ApiKeysConfig) => void;
  onShowSplash?: () => void;
  activeSkill?: DesignSystemData | null;
}

export function ProductWorkspaceShell({
  onGenerate,
  isLoading,
  currentStep = 0,
  stepsLog = [],
  activeUrl = "",
  config,
  onSaveConfig,
  onShowSplash,
  activeSkill = null,
}: ProductWorkspaceShellProps) {
  // Active design system: starts null for a clean, fresh state!
  const [activeSystemId, setActiveSystemId] = useState<string>("");
  const [customDesign, setCustomDesign] = useState<DesignSystemData | null>(activeSkill);

  // Default to terminal console so user lands on a clean input prompt!
  const [activeTab, setActiveTab] = useState<
    "terminal" | "overview" | "spec" | "tokens" | "specimens" | "audits" | "pulse"
  >("terminal");

  // Floating agent card state
  const [isAgentMinimized, setIsAgentMinimized] = useState(false);
  const [isAgentVisible, setIsAgentVisible] = useState(true);

  // Modals & Drawers
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAiExportOpen, setIsAiExportOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K and ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsConfigOpen(false);
        setIsAiExportOpen(false);
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Favorites list: starts empty!
  const [favorites, setFavorites] = useState<string[]>([]);

  // User notes
  const [userNotes, setUserNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");

  // Toast / Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Active design system is only populated when extracted or selected
  const currentDesign: DesignSystemData | null =
    customDesign || (activeSystemId ? EXAMPLE_SYSTEMS_MAP[activeSystemId] : null);

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const switchTab = (
    tab: "terminal" | "overview" | "spec" | "tokens" | "specimens" | "audits" | "pulse"
  ) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (activeSkill) {
      setCustomDesign(activeSkill);
      switchTab("spec");
      showToast(`Extracted ${activeSkill.title || activeSkill.name}!`);
    }
  }, [activeSkill]);

  const handleSelectSystem = (sysId: string) => {
    setActiveSystemId(sysId);
    setCustomDesign(EXAMPLE_SYSTEMS_MAP[sysId] || null);
    showToast(`Loaded ${sysId}.app design system`);
  };

  const handleExtractFromTerminal = (url: string, options: { crawlDepth: number; maxPages: number }) => {
    onGenerate(url, options);
  };

  const handleToggleFavorite = () => {
    if (!currentDesign) return;
    const name = currentDesign.name;
    setFavorites((prev) => {
      const exists = prev.includes(name);
      showToast(exists ? "Removed from favorites" : "Added to favorites");
      return exists ? prev.filter((f) => f !== name) : [...prev, name];
    });
  };

  const handleDownloadZip = async () => {
    if (!currentDesign) return;
    setIsDownloadingZip(true);
    try {
      const response = await fetch("/api/download-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill: currentDesign }),
      });
      if (!response.ok) throw new Error("Failed to generate zip");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `designmd-${currentDesign.name.replace(/_/g, "-")}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Downloaded .zip bundle!");
    } catch {
      showToast("Download failed. Please try again.");
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleCopySpec = () => {
    if (!currentDesign) return;
    navigator.clipboard.writeText(currentDesign.designMd || currentDesign.skillMd || "");
    showToast("DESIGN.md copied to clipboard!");
  };

  const handleCopyUrl = () => {
    if (!currentDesign) return;
    navigator.clipboard.writeText(currentDesign.targetUrl);
    showToast("Target URL copied!");
  };

  const handleForkCommand = () => {
    const target = currentDesign ? currentDesign.targetUrl : "";
    const cmd = `designmd extract ${target || "<url>"} --mode=deep`;
    navigator.clipboard.writeText(cmd);
    showToast(`CLI command copied: ${cmd}`);
    switchTab("terminal");
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setUserNotes((prev) => [...prev, newNote.trim()]);
    setNewNote("");
    showToast("Note added");
  };

  const renderSidebarContent = (isMobile = false) => (
    <>
      <div className="p-3 space-y-4 overflow-y-auto flex-1">
        {/* Header Brand */}
        <div className="flex items-center justify-between px-1.5 py-1 text-white">
          <div
            onClick={() => {
              switchTab("terminal");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="flex items-center gap-2 font-semibold cursor-pointer group"
          >
            <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center font-mono text-[10px] text-white">
              ◐
            </div>
            <span className="group-hover:text-[#3186ff] transition-colors">DesignMD</span>
            <ChevronDown className="w-3 h-3 text-[#585a5c]" />
          </div>

          <div className="flex items-center gap-2 text-[#585a5c]">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                if (isMobile) setIsMobileSidebarOpen(false);
              }}
              title="Search systems (Cmd+K)"
              className="hover:text-white cursor-pointer transition-colors p-0.5"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSystemId("");
                setCustomDesign(null);
                switchTab("terminal");
                if (isMobile) setIsMobileSidebarOpen(false);
              }}
              title="New extraction"
              className="hover:text-white cursor-pointer transition-colors p-0.5"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            {isMobile && (
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="hover:text-white cursor-pointer transition-colors p-0.5 ml-1"
                title="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <div
            onClick={() => {
              switchTab("terminal");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors border outline-none select-none ${
              activeTab === "terminal"
                ? "bg-[#161820] text-white font-medium border-[#20242f]"
                : "border-transparent hover:bg-white/5 text-[#8a8f98] hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>URL Extractor</span>
          </div>

          <div
            onClick={() => {
              switchTab("overview");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors border outline-none select-none ${
              activeTab === "overview"
                ? "bg-[#161820] text-white font-medium border-[#20242f]"
                : "border-transparent hover:bg-white/5 text-[#8a8f98] hover:text-white"
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Activity & Notes</span>
          </div>

          <div
            onClick={() => {
              switchTab("pulse");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors border outline-none select-none ${
              activeTab === "pulse"
                ? "bg-[#161820] text-white font-medium border-[#20242f]"
                : "border-transparent hover:bg-white/5 text-[#8a8f98] hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Pulse</span>
          </div>

          <div
            onClick={() => {
              switchTab("audits");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors border outline-none select-none ${
              activeTab === "audits"
                ? "bg-[#161820] text-white font-medium border-[#20242f]"
                : "border-transparent hover:bg-white/5 text-[#8a8f98] hover:text-white"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Audits</span>
          </div>
        </div>

        {/* WORKSPACE Section */}
        <div className="space-y-1 pt-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5e6473] px-2 block">
            Workspace
          </span>

          <div
            onClick={() => {
              switchTab("spec");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors border outline-none select-none ${
              activeTab === "spec"
                ? "bg-[#161820] text-white font-medium border-[#20242f]"
                : "border-transparent hover:bg-white/5 text-[#8a8f98] hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Specifications</span>
          </div>

          <div
            onClick={() => {
              switchTab("tokens");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors border outline-none select-none ${
              activeTab === "tokens"
                ? "bg-[#161820] text-white font-medium border-[#20242f]"
                : "border-transparent hover:bg-white/5 text-[#8a8f98] hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Tokens (JSON)</span>
          </div>

          <div
            onClick={() => {
              switchTab("specimens");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors border outline-none select-none ${
              activeTab === "specimens"
                ? "bg-[#161820] text-white font-medium border-[#20242f]"
                : "border-transparent hover:bg-white/5 text-[#8a8f98] hover:text-white"
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Live Specimens</span>
          </div>

          <div
            onClick={() => {
              if (isMobile) setIsMobileSidebarOpen(false);
              if (currentDesign) setIsAiExportOpen(true);
              else showToast("Extract a design system first");
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-transparent hover:bg-white/5 cursor-pointer text-[#8a8f98] hover:text-white transition-colors outline-none select-none"
          >
            <FileText className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>AI Prompts</span>
          </div>
        </div>

        {/* FAVORITES Section */}
        <div className="space-y-1 pt-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5e6473] px-2 flex items-center justify-between">
            <span>Favorites</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </span>

          {favorites.length === 0 ? (
            <div className="px-2 py-2 text-[11px] text-[#5e6473] font-mono italic">
              No favorites yet
            </div>
          ) : (
            favorites.map((fav) => (
              <div
                key={fav}
                onClick={() => {
                  handleSelectSystem(fav);
                  if (isMobile) setIsMobileSidebarOpen(false);
                }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-white/5 text-white"
              >
                <Star className="w-3 h-3 text-[#3b82f6]" />
                <span className="truncate">{fav}</span>
              </div>
            ))
          )}

          {/* Optional Sample Systems list */}
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#585a5c] px-2 block mb-1">
              Sample References
            </span>
            {SAMPLE_SYSTEMS_LIST.map((sample) => (
              <div
                key={sample.id}
                onClick={() => {
                  handleSelectSystem(sample.id);
                  if (isMobile) setIsMobileSidebarOpen(false);
                }}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-all ${
                  activeSystemId === sample.id
                    ? "bg-[#16181d] text-white font-medium border border-[#232730]"
                    : "hover:bg-white/5 text-[#8a8f98] hover:text-white"
                }`}
              >
                <span className="text-[10px] text-[#585a5c] font-mono">↗</span>
                <span className="truncate">{sample.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-[#191d20] bg-[#090a0c] space-y-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setIsConfigOpen(true);
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-[#8a8f98] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Sliders className="w-3 h-3 text-[#9aa0a6]" />
            <span>Settings</span>
          </button>

          {onShowSplash && (
            <button
              type="button"
              onClick={() => {
                onShowSplash();
                if (isMobile) setIsMobileSidebarOpen(false);
              }}
              title="View Splash Screen"
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#8a8f98] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span>Splash</span>
            </button>
          )}
        </div>

        <div className="px-2 text-[10px] font-mono text-[#585a5c]">
          DesignMD Engine
        </div>
      </div>
    </>
  );

  return (
    <div
      style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
      className="w-full h-[100dvh] min-h-[100dvh] flex bg-[#090a0d] text-[#ffffff] overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR (Desktop & Responsive Mobile Drawer)                      */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex md:w-56 lg:w-60 bg-[#090a0d] border-r border-[#191d20] flex-col justify-between shrink-0 text-xs text-[#8a8f98]">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex md:hidden animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileSidebarOpen(false);
          }}
        >
          <aside className="w-64 max-w-[85vw] h-full bg-[#090a0d] border-r border-[#191d20] flex flex-col justify-between text-xs text-[#8a8f98] shadow-2xl animate-in slide-in-from-left duration-200">
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN CANVAS VIEW                                                       */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#090a0d] overflow-hidden relative">
        {/* Top Ticket & Tool Bar */}
        <header className="h-11 sm:h-12 border-b border-[#191d20] px-4 sm:px-6 flex items-center justify-between text-xs text-[#8a8f98] shrink-0 bg-[#090a0d]/90 backdrop-blur-md">
          {/* Left Ticket Info */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-1 -ml-1 text-[#8a8f98] hover:text-white cursor-pointer rounded hover:bg-white/5 transition-colors"
              title="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <span className="text-blue-400 font-mono font-medium text-[11px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 shrink-0">
              {currentDesign ? "ACTIVE" : "READY"}
            </span>
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-md">
              {currentDesign
                ? `Extract ${currentDesign.name.replace(/_design$/, "")}.app design system`
                : "New Extraction"}
            </span>
            {currentDesign && (
              <button
                type="button"
                onClick={handleToggleFavorite}
                className="p-0.5 cursor-pointer text-[#ffe432]"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
              </button>
            )}
          </div>

          {/* Right Ticket Controls & Tools */}
          <div className="flex items-center gap-3 shrink-0 text-[#585a5c]">
            {currentDesign && (
              <>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  title="Copy Target URL"
                  className="cursor-pointer hover:text-white transition-colors p-0.5"
                >
                  <Link2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCopySpec}
                  title="Copy DESIGN.md"
                  className="cursor-pointer hover:text-white transition-colors p-0.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={handleForkCommand}
              title="Fork CLI command"
              className="cursor-pointer hover:text-white transition-colors p-0.5"
            >
              <GitFork className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Scrollable Canvas Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full text-left">
          {/* Main Title & Action Bar */}
          <div className="space-y-3 border-b border-[#191d20]/80 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-[-0.025em]">
                {currentDesign
                  ? `Extract ${currentDesign.name.replace(/_design$/, "")}.app design system`
                  : "Extract Website Design System"}
              </h1>

              {currentDesign && (
                <button
                  type="button"
                  onClick={handleDownloadZip}
                  disabled={isDownloadingZip}
                  className="text-xs text-[#9aa0a6] hover:text-white flex items-center gap-1.5 font-mono cursor-pointer transition-colors self-start sm:self-auto py-1 px-3 rounded-full bg-[#121418] border border-[#232731] hover:border-[#3186ff]/40 shadow-2xs"
                >
                  <span>{isDownloadingZip ? "Bundling..." : "Export"}</span>
                  <span className="text-[#3186ff]">↺ .zip bundle</span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-[13px] text-[#8a8f98] leading-relaxed max-w-3xl">
              {currentDesign ? (
                <>
                  Deep crawl completed across stylesheets. Extracted{" "}
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#191d22] border border-[#2a2e36] text-[11px] font-mono text-white">
                    {currentDesign.semanticColors?.length || 0} semantic color tokens
                  </span>
                  , computed typography scale, and synthesized spec-compliant{" "}
                  <strong className="text-white font-medium">DESIGN.md</strong> with Tailwind v4 @theme.
                </>
              ) : (
                "Enter any target website URL to deep crawl multi-route stylesheets, extract semantic color tokens, compute 8-step typography scales, and synthesize spec-compliant DESIGN.md with Tailwind v4 @theme."
              )}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 3. UNIFIED NAVIGATION TABS                                                */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-between border-b border-[#191d20] pb-2 overflow-x-auto gap-2">
            <div className="inline-flex items-center gap-1 p-1 bg-[#101215] border border-[#1e2126] rounded-full text-xs shrink-0">
              <button
                type="button"
                onClick={() => switchTab("terminal")}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
                  activeTab === "terminal"
                    ? "bg-[#1c1f24] text-white shadow-xs border-[#2e333d]"
                    : "border-transparent text-[#8a8f98] hover:text-white"
                }`}
              >
                <TerminalIcon className={`w-3 h-3 ${activeTab === "terminal" ? "text-blue-400" : "text-[#8a8f98]"}`} />
                <span>Terminal Console</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab("overview")}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
                  activeTab === "overview"
                    ? "bg-[#1c1f24] text-white shadow-xs border-[#2e333d]"
                    : "border-transparent text-[#8a8f98] hover:text-white"
                }`}
              >
                <FolderKanban className={`w-3 h-3 ${activeTab === "overview" ? "text-blue-400" : "text-[#8a8f98]"}`} />
                <span>Activity & Notes</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab("spec")}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
                  activeTab === "spec"
                    ? "bg-[#1c1f24] text-white shadow-xs border-[#2e333d]"
                    : "border-transparent text-[#8a8f98] hover:text-white"
                }`}
              >
                <FileText className={`w-3 h-3 ${activeTab === "spec" ? "text-blue-400" : "text-[#8a8f98]"}`} />
                <span>DESIGN.md Spec</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab("tokens")}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
                  activeTab === "tokens"
                    ? "bg-[#1c1f24] text-white shadow-xs border-[#2e333d]"
                    : "border-transparent text-[#8a8f98] hover:text-white"
                }`}
              >
                <Layers className={`w-3 h-3 ${activeTab === "tokens" ? "text-blue-400" : "text-[#8a8f98]"}`} />
                <span>Tokens & Colors</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab("specimens")}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
                  activeTab === "specimens"
                    ? "bg-[#1c1f24] text-white shadow-xs border-[#2e333d]"
                    : "border-transparent text-[#8a8f98] hover:text-white"
                }`}
              >
                <Palette className={`w-3 h-3 ${activeTab === "specimens" ? "text-blue-400" : "text-[#8a8f98]"}`} />
                <span>Live Specimens</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab("audits")}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1.5 border outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
                  activeTab === "audits"
                    ? "bg-[#1c1f24] text-white shadow-xs border-[#2e333d]"
                    : "border-transparent text-[#8a8f98] hover:text-white"
                }`}
              >
                <ShieldCheck className={`w-3 h-3 ${activeTab === "audits" ? "text-blue-400" : "text-[#8a8f98]"}`} />
                <span>Audits</span>
              </button>
            </div>

            {currentDesign ? (
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#585a5c]">
                <span>Target: {currentDesign.targetUrl}</span>
              </div>
            ) : null}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: TERMINAL CONSOLE                                                   */}
          {/* ========================================================================= */}
          {activeTab === "terminal" && (
            <div className="space-y-4">
              <TerminalExtractor
                config={config}
                onExtract={handleExtractFromTerminal}
                isLoading={isLoading}
                currentStep={currentStep}
                stepsLog={stepsLog}
                activeUrl={activeUrl}
                initialUrl={currentDesign?.targetUrl || ""}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: OVERVIEW & ACTIVITY                                                */}
          {/* ========================================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Live activity log from current session */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#585a5c] block">
                  Extraction Pipeline Activity
                </span>

                {stepsLog.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-[#1e2229] rounded-2xl bg-[#090a0d] space-y-3">
                    <TerminalIcon className="w-8 h-8 text-[#585a5c] mx-auto" />
                    <div className="text-sm font-medium text-white">No extraction activity in this session</div>
                    <p className="text-xs text-[#8a8f98] max-w-sm mx-auto">
                      Switch to the Terminal Console or enter a target URL to start deep crawling and token synthesis.
                    </p>
                    <button
                      type="button"
                      onClick={() => switchTab("terminal")}
                      className="px-4 py-2 rounded-full bg-[#16191f] text-[#3186ff] border border-[#3186ff]/30 text-xs font-semibold hover:bg-[#3186ff]/15 transition-colors cursor-pointer"
                    >
                      Open Terminal Console →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs font-mono text-[#8a8f98] bg-[#090a0d] border border-[#1e2229] p-4 rounded-xl">
                    {stepsLog.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            step.status === "completed"
                              ? "bg-[#34d399]"
                              : step.status === "error"
                              ? "bg-[#f87171]"
                              : "bg-[#3186ff] animate-pulse"
                          }`}
                        />
                        <span className="text-white font-medium">Step {step.step}/4:</span>
                        <span>{step.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User Notes & Comments Section (Real, not hardcoded!) */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#585a5c] block">
                  Design Notes & Tags
                </span>

                <form onSubmit={handleAddNote} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a custom note for this design system..."
                    className="flex-1 px-3.5 py-2 bg-[#0d0f13] border border-[#1e2229] rounded-xl text-xs text-white placeholder-[#585a5c] focus:outline-none focus:border-[#3186ff]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#16191f] text-white border border-[#232731] hover:bg-[#20242c] text-xs font-medium cursor-pointer transition-colors"
                  >
                    Add Note
                  </button>
                </form>

                {userNotes.length > 0 && (
                  <div className="space-y-2">
                    {userNotes.map((note, idx) => (
                      <div key={idx} className="bg-[#0e1014] border border-[#1e2229] rounded-xl p-3 text-xs text-white">
                        {note}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: DESIGN.md SPEC                                                     */}
          {/* ========================================================================= */}
          {activeTab === "spec" && (
            <div>
              {currentDesign ? (
                <div className="min-h-[550px]">
                  <DesignMdViewer design={currentDesign} />
                </div>
              ) : (
                <div className="p-12 text-center border border-dashed border-[#1e2229] rounded-2xl bg-[#090a0d] space-y-4">
                  <FileText className="w-10 h-10 text-[#585a5c] mx-auto" />
                  <div className="text-base font-medium text-white">No Specification Generated</div>
                  <p className="text-xs text-[#8a8f98] max-w-md mx-auto">
                    Extract any website URL in the Terminal Console to generate a spec-compliant DESIGN.md document.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchTab("terminal")}
                    className="px-5 py-2 rounded-full bg-[#ffffff] text-[#000000] text-xs font-semibold hover:bg-[#eff0f3] transition-all cursor-pointer"
                  >
                    Open Terminal Console
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: TOKENS & COLORS                                                    */}
          {/* ========================================================================= */}
          {activeTab === "tokens" && (
            <div>
              {currentDesign ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {currentDesign.semanticColors.map((color, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          navigator.clipboard.writeText(color.hex);
                          showToast(`Copied ${color.hex}`);
                        }}
                        className="p-3 bg-[#090b0e] border border-[#1e2229] rounded-xl space-y-2 cursor-pointer hover:border-[#3186ff]/50 transition-all group"
                      >
                        <div
                          style={{ backgroundColor: color.hex }}
                          className="w-full h-12 rounded-lg border border-white/10 shadow-inner group-hover:scale-[1.02] transition-transform"
                        />
                        <div>
                          <div className="font-semibold text-white text-xs truncate">{color.name}</div>
                          <div className="text-[11px] font-mono text-[#8a8f98]">{color.hex}</div>
                          <div className="text-[10px] text-[#585a5c] truncate mt-0.5">{color.usage}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#050608] border border-[#1e2229] rounded-xl font-mono text-xs text-[#9aa0a6] overflow-x-auto max-h-72">
                    <pre>{currentDesign.tokensJsonFormatted}</pre>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border border-dashed border-[#1e2229] rounded-2xl bg-[#090a0d] space-y-4">
                  <Layers className="w-10 h-10 text-[#585a5c] mx-auto" />
                  <div className="text-base font-medium text-white">No Tokens Extracted</div>
                  <p className="text-xs text-[#8a8f98] max-w-md mx-auto">
                    Enter a website URL in the Terminal Console to extract design tokens and CSS custom properties.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchTab("terminal")}
                    className="px-5 py-2 rounded-full bg-[#ffffff] text-[#000000] text-xs font-semibold hover:bg-[#eff0f3] transition-all cursor-pointer"
                  >
                    Open Terminal Console
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: LIVE SPECIMENS                                                     */}
          {/* ========================================================================= */}
          {activeTab === "specimens" && (
            <div>
              {currentDesign ? (
                <div className="min-h-[550px]">
                  <LiveSpecimenViewer design={currentDesign} />
                </div>
              ) : (
                <div className="p-12 text-center border border-dashed border-[#1e2229] rounded-2xl bg-[#090a0d] space-y-4">
                  <Palette className="w-10 h-10 text-[#585a5c] mx-auto" />
                  <div className="text-base font-medium text-white">No Specimens Generated</div>
                  <p className="text-xs text-[#8a8f98] max-w-md mx-auto">
                    Extract any website URL to generate live interactive React buttons, cards, and Tailwind v4 themes.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchTab("terminal")}
                    className="px-5 py-2 rounded-full bg-[#ffffff] text-[#000000] text-xs font-semibold hover:bg-[#eff0f3] transition-all cursor-pointer"
                  >
                    Open Terminal Console
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: AUDITS                                                             */}
          {/* ========================================================================= */}
          {activeTab === "audits" && (
            <div>
              {currentDesign ? (
                <SystemAuditsView design={currentDesign} />
              ) : (
                <div className="p-12 text-center border border-dashed border-[#1e2229] rounded-2xl bg-[#090a0d] space-y-4">
                  <ShieldCheck className="w-10 h-10 text-[#585a5c] mx-auto" />
                  <div className="text-base font-medium text-white">No Audit Data</div>
                  <p className="text-xs text-[#8a8f98] max-w-md mx-auto">
                    Extract a website to run an automated WCAG contrast and typography hierarchy audit.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchTab("terminal")}
                    className="px-5 py-2 rounded-full bg-[#ffffff] text-[#000000] text-xs font-semibold hover:bg-[#eff0f3] transition-all cursor-pointer"
                  >
                    Open Terminal Console
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: PULSE                                                              */}
          {/* ========================================================================= */}
          {activeTab === "pulse" && (
            <div>
              <SystemPulseView
                currentDesign={
                  currentDesign || {
                    name: "fresh_session",
                    title: "Active Session",
                    description: "Fresh session ready for extraction",
                    targetUrl: activeUrl || "https://...",
                    semanticColors: [],
                    typographyScale: [],
                    primaryFont: "sans-serif",
                    headingFont: "sans-serif",
                    monoFont: "monospace",
                    spacingScale: [],
                    radiiScale: [],
                    shadowScale: [],
                    designMd: "",
                    skillMd: "",
                    componentCode: "",
                    cssVariablesFormatted: "",
                    tailwindConfigFormatted: "",
                    tokensJsonFormatted: "{}",
                    styles: { colors: [], fonts: [], cssVariables: {}, tailwindClasses: [], layoutPatterns: [] },
                    logic: { stateVariables: [], eventHandlers: [], interactiveElements: [], apiEndpoints: [], formActions: [] },
                    modelPrompts: { cursor: "", claude: "", gemini: "", chatgpt: "" },
                  }
                }
                onSelectSystem={handleSelectSystem}
              />
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. DOCKED / FLOATING AUTONOMOUS AGENT CARD                                 */}
        {/* ========================================================================= */}
        {isAgentVisible && (
          isAgentMinimized ? (
            <div className="fixed bottom-4 right-4 z-40">
              <button
                type="button"
                onClick={() => setIsAgentMinimized(false)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#090a0d] border border-[#1e222a] shadow-2xl hover:border-[#3186ff]/50 text-xs text-white group cursor-pointer transition-all hover:scale-105"
              >
                <span className="w-2 h-2 rounded-full bg-[#3186ff]" />
                <span className="font-medium">DesignMD Agent</span>
                <span className="text-[10px] font-mono text-[#8a8f98] px-1.5 py-0.5 rounded bg-[#16191f] border border-[#232731]">
                  {isLoading ? "Running..." : currentDesign ? "Active" : "Ready"}
                </span>
                <ChevronUp className="w-3.5 h-3.5 text-[#585a5c] group-hover:text-white transition-colors" />
              </button>
            </div>
          ) : (
            <div className="fixed bottom-4 right-4 z-40 w-[92vw] sm:w-[410px] transition-all duration-200">
              <div className="bg-[#090a0d] border border-[#1e222a] rounded-2xl shadow-2xl p-4 sm:p-4.5 space-y-3 text-left">
                {/* Top Window Bar */}
                <div className="flex items-center justify-between border-b border-[#1e222a] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center font-mono text-[10px] text-white">
                      ◐
                    </div>
                    <span className="text-xs font-semibold text-white">DesignMD</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#16191f] text-[#8a8f98] border border-[#232731]">
                      Synthesizer
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#585a5c]">
                    <button
                      type="button"
                      onClick={() => setIsAgentMinimized(true)}
                      title="Minimize"
                      className="hover:text-white cursor-pointer transition-colors p-0.5"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => switchTab("spec")}
                      title="Open Spec View"
                      className="hover:text-white cursor-pointer transition-colors p-0.5"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAgentVisible(false)}
                      title="Close"
                      className="hover:text-white cursor-pointer transition-colors p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Dynamic Prompt / Status */}
                <div className="bg-[#0e1014] border border-[#1e2229] rounded-xl p-3 space-y-2">
                  <p className="text-xs text-white leading-relaxed">
                    {isLoading
                      ? `Synthesizing tokens from ${activeUrl}...`
                      : currentDesign
                      ? `Extracted tokens and computed type scale for ${currentDesign.targetUrl}`
                      : "Ready. Enter any website URL in the terminal to extract tokens into DESIGN.md."}
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 border-t border-[#1e2229]/60">
                    <span className="w-3.5 h-3.5 rounded-full border border-[#3186ff]/60 bg-[#3186ff]/20 flex items-center justify-center text-[9px] text-[#3186ff] font-mono">
                      ◐
                    </span>
                    <span className="text-[10px] font-mono text-white/80 font-medium">
                      {currentDesign ? currentDesign.name.replace(/_design$/, "") : "workspace"}
                    </span>
                    <span className="text-[10px] text-[#6b6c6d]">
                      {isLoading ? "processing stream" : currentDesign ? "active context" : "idle"}
                    </span>
                  </div>
                </div>

                {/* Execution Details */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1 text-[#6b6c6d] font-mono text-[11px]">
                    <span className={isLoading ? "text-blue-400" : currentDesign ? "text-blue-400" : "text-[#8a8f98]"}>
                      {isLoading ? `Running step ${currentStep}/4` : currentDesign ? "Extraction completed" : "Waiting for execution"}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8a8f98] leading-relaxed">
                    {currentDesign
                      ? `Extracted ${currentDesign.semanticColors?.length || 0} semantic color tokens, ${currentDesign.typographyScale?.length || 0}-level typography scale.`
                      : "Terminal extractor ready to crawl stylesheets and build live specimens."}
                  </p>
                </div>

                {/* Footer Execution Stats & Action */}
                {currentDesign ? (
                  <div className="pt-2 border-t border-[#1e222a] flex items-center justify-between text-xs font-mono">
                    <span className="text-[11px] text-[#6b6c6d]">
                      DESIGN.md <span className="text-[#34d399]">{currentDesign.designMd ? `${currentDesign.designMd.split("\n").length} lines` : "generated"}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => switchTab("spec")}
                      className="px-2.5 py-1 rounded-md bg-[#16191f] text-white hover:bg-[#20242c] border border-[#232731] hover:border-[#3186ff]/40 transition-all flex items-center gap-1 cursor-pointer text-[11px]"
                    >
                      <Eye className="w-3 h-3 text-[#3186ff]" />
                      <span>Preview Spec</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          )
        )}

        {/* Floating Toast Message */}
        {toastMessage ? (
          <div className="fixed top-14 right-6 z-50 px-4 py-2 rounded-xl bg-[#1a1d24] text-white text-xs border border-[#3186ff]/40 shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <Check className="w-3.5 h-3.5 text-[#34d399]" />
            <span>{toastMessage}</span>
          </div>
        ) : null}
      </main>

      {/* ========================================================================= */}
      {/* 5. MODALS & DRAWERS                                                       */}
      {/* ========================================================================= */}
      {isConfigOpen ? (
        <ConfigDrawer
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          config={config}
          onSaveConfig={onSaveConfig}
        />
      ) : null}

      {currentDesign && isAiExportOpen ? (
        <ModelExportModal
          isOpen={isAiExportOpen}
          onClose={() => setIsAiExportOpen(false)}
          skill={currentDesign}
          onDownloadZip={handleDownloadZip}
        />
      ) : null}

      {/* Quick Search Palette (Cmd+K) */}
      {isSearchOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSearchOpen(false);
          }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="w-full max-w-lg bg-[#0a0c10] border border-[#262a33] rounded-2xl p-4 space-y-3 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[#1e2229] pb-3">
              <Search className="w-4 h-4 text-[#8a8f98]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sample references or extracted systems..."
                className="w-full bg-transparent border-0 text-sm text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-[#585a5c] hover:text-white"
              >
                ESC
              </button>
            </div>

            <div className="space-y-1 max-h-60 overflow-y-auto text-xs">
              {SAMPLE_SYSTEMS_LIST.filter(
                (s) =>
                  s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.tag.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    handleSelectSystem(s.id);
                    setIsSearchOpen(false);
                  }}
                  className="p-2.5 rounded-lg hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{s.name}</span>
                    <span className="text-[#8a8f98] font-mono text-[11px]">{s.tag}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#585a5c]">Enter ↵</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductWorkspaceShell;
