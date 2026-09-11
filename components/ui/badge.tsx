import React, { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "danger" | "outline" | "accent";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#16181d] text-[#e8eaed] border-[#262930]",
    info: "bg-[#1a73e8]/15 text-[#3186ff] border-[#1a73e8]/30",
    accent: "bg-[#ffe432]/15 text-[#ffe432] border-[#ffe432]/30",
    success: "bg-emerald-950/40 text-emerald-400 border-emerald-800/40",
    warning: "bg-amber-950/40 text-amber-300 border-amber-800/40",
    danger: "bg-rose-950/40 text-rose-400 border-rose-800/40",
    outline: "bg-transparent text-[#9aa0a6] border-[#262930]",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border select-none tracking-wide",
          variantStyles[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
}
