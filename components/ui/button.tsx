import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.99]";

    const sizeStyles = {
      sm: "text-xs px-2.5 py-1.5 gap-1.5",
      md: "text-xs sm:text-sm px-3.5 py-2 gap-2",
      lg: "text-sm sm:text-base px-5 py-2.5 gap-2 font-medium",
      icon: "p-2 aspect-square",
    };

    const variantStyles = {
      primary:
        "bg-[#1a73e8] hover:bg-[#1557b0] text-white shadow-xs focus:ring-[#1a73e8]",
      accent:
        "bg-[#ffe432] hover:bg-[#ebd028] text-black font-semibold shadow-xs focus:ring-[#ffe432]",
      secondary:
        "bg-[#16181d] hover:bg-[#20232a] text-[#e8eaed] border border-[#262930] focus:ring-[#363942]",
      outline:
        "border border-[#262930] hover:border-[#363942] bg-transparent text-[#9aa0a6] hover:text-white hover:bg-[#16181d] focus:ring-[#363942]",
      ghost:
        "text-[#9aa0a6] hover:text-white hover:bg-[#16181d] focus:ring-[#363942]",
      danger:
        "bg-red-950/40 text-red-400 border border-red-800/60 hover:bg-red-900/40 focus:ring-red-500",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            className
          )
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
