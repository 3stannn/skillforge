import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  position?: "right" | "left";
  width?: "sm" | "md" | "lg";
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  position = "right",
  width = "md",
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`fixed inset-y-0 ${
          position === "right" ? "right-0" : "left-0"
        } flex max-w-full`}
      >
        <div
          style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
          className={`w-screen ${widthClasses[width]} bg-white border-l border-[#dadce0] p-6 shadow-2xl flex flex-col`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#dadce0]">
            <div>
              <h2 className="text-lg font-semibold text-[#111111] tracking-tight">{title}</h2>
              {description && (
                <p className="text-xs text-[#5f6368] mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#5f6368] hover:text-[#111111] hover:bg-[#f1f3f4] transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
