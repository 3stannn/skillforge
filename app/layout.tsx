import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignMD • Generate DESIGN.md from Any Website",
  description:
    "Explore any website and generate a spec-compliant DESIGN.md with design principles, semantic colors, typography scale, component specs, and exportable tokens for Cursor, Claude Code, Gemini, and ChatGPT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,slnt,wdth,wght,ROND@8..144,-10..0,25..150,400..700,0..100&family=Google+Sans+Code:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#000000] text-[#ffffff] antialiased flex flex-col selection:bg-[#1a73e8]/30 selection:text-[#3186ff]">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
