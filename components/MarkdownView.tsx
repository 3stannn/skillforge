"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal, ChevronRight } from "lucide-react";

interface MarkdownViewProps {
  content: string;
}

type Block =
  | { type: "frontmatter"; name?: string; description?: string }
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; lines: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; lang: string; code: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "hr" }
  | { type: "p"; text: string };

function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let i = 0;

  // 1. Check for YAML frontmatter at start
  if (lines[0]?.trim() === "---") {
    let j = 1;
    let frontmatterContent = "";
    while (j < lines.length && lines[j].trim() !== "---") {
      frontmatterContent += lines[j] + "\n";
      j++;
    }
    if (j < lines.length && lines[j].trim() === "---") {
      i = j + 1;
      const nameMatch = frontmatterContent.match(/^name:\s*(.+)$/m);
      const descMatch = frontmatterContent.match(/description:\s*(?:\||>)?\s*([\s\S]*?)(?=(?:^[a-zA-Z0-9_-]+:|\Z))/m);
      blocks.push({
        type: "frontmatter",
        name: nameMatch ? nameMatch[1].trim() : undefined,
        description: descMatch ? descMatch[1].trim().replace(/\n+/g, " ") : undefined,
      });
    }
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Blank line
    if (!trimmed) {
      i++;
      continue;
    }

    // Horizontal Rule
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Fenced Code Block
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      blocks.push({
        type: "code",
        lang: lang || "text",
        code: codeLines.join("\n"),
      });
      continue;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.slice(2).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4).trim() });
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", lines: quoteLines });
      continue;
    }

    // Table: Look ahead for header + separator
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const nextLine = lines[i + 1]?.trim();
      if (nextLine && nextLine.startsWith("|") && /^[|\s\-:]+$/.test(nextLine)) {
        const headers = trimmed
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim());
        i += 2; // skip header and separator
        const rows: string[][] = [];
        while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
          const cells = lines[i]
            .trim()
            .slice(1, -1)
            .split("|")
            .map((c) => c.trim());
          rows.push(cells);
          i++;
        }
        blocks.push({ type: "table", headers, rows });
        continue;
      }
    }

    // Bullet or Numbered List
    if (/^(\*|-|\+|\d+\.)\s+/.test(trimmed)) {
      const items: string[] = [];
      const ordered = /^\d+\./.test(trimmed);
      while (i < lines.length && /^(\*|-|\+|\d+\.)\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^(\*|-|\+|\d+\.)\s+/, "");
        items.push(itemText);
        i++;
      }
      blocks.push({ type: "list", items, ordered });
      continue;
    }

    // Standard Paragraph
    const pLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith("|") &&
      !/^(\*|-|\+|\d+\.)\s+/.test(lines[i].trim()) &&
      !/^(\*\*\*|---|___)$/.test(lines[i].trim())
    ) {
      pLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: pLines.join(" ") });
  }

  return blocks;
}

function renderInline(text: string): React.ReactNode {
  // Regex to split by inline markdown: `code`, **bold**, ![image](url), [link](url)
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g);

  return tokens.map((token, index) => {
    if (!token) return null;

    // Inline Code
    if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-[#16181d] text-[#ffe432] font-mono text-[11px] font-medium border border-[#262930]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    // Bold
    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Image: ![alt](url)
    const imgMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return (
        <span key={index} className="inline-block my-2 max-w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgMatch[2]}
            alt={imgMatch[1] || "Extracted asset"}
            className="max-h-48 max-w-full rounded-xl border border-[#262930] object-contain bg-[#121316] shadow-2xs"
            onError={(e) => {
              // Gracefully hide broken external images
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </span>
      );
    }

    // Link: [text](url)
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="text-[#3186ff] hover:text-[#5fa5ff] hover:underline font-medium inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <React.Fragment key={index}>{token}</React.Fragment>;
  });
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#262930] bg-[#0e0f13] my-3">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#16181d] border-b border-[#262930] text-xs font-mono text-[#9aa0a6]">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#5f6368]" />
          <span>{lang || "code"}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-[#bdc1c6] hover:text-white hover:bg-[#22242a] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#34A853]" />
              <span className="text-[#34A853]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 font-mono text-xs text-[#e8eaed] overflow-x-auto leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

export function MarkdownView({ content }: MarkdownViewProps) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-4 text-[#e8eaed] text-xs sm:text-[13px] leading-relaxed select-text font-sans">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "frontmatter":
            return (
              <div
                key={idx}
                className="p-3.5 bg-[#121316] border border-[#262930] rounded-xl space-y-1 font-mono text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#1a73e8]/20 border border-[#1a73e8]/30 text-[#3186ff] font-semibold text-[10px] uppercase tracking-wider">
                    Agent Skill Spec
                  </span>
                  {block.name && (
                    <span className="text-white font-bold">
                      name: {block.name}
                    </span>
                  )}
                </div>
                {block.description && (
                  <p className="text-[#9aa0a6] text-xs font-sans mt-1">
                    {block.description}
                  </p>
                )}
              </div>
            );

          case "h1":
            return (
              <div key={idx} className="pt-2 pb-1 border-b border-[#262930]">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {block.text}
                </h1>
              </div>
            );

          case "h2":
            return (
              <div key={idx} className="pt-4 pb-1">
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#3186ff] shrink-0" />
                  <span>{block.text}</span>
                </h2>
              </div>
            );

          case "h3":
            return (
              <div key={idx} className="pt-2">
                <h3 className="text-sm font-semibold text-white">
                  {block.text}
                </h3>
              </div>
            );

          case "blockquote":
            return (
              <div
                key={idx}
                className="border-l-4 border-[#3186ff] bg-[#121316] p-3.5 rounded-r-xl text-xs sm:text-sm text-[#bdc1c6] my-2 leading-relaxed space-y-1 shadow-2xs"
              >
                {block.lines.map((l, lIdx) => (
                  <div key={lIdx}>{renderInline(l)}</div>
                ))}
              </div>
            );

          case "table":
            return (
              <div
                key={idx}
                className="my-3 overflow-x-auto border border-[#262930] rounded-xl shadow-2xs"
              >
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-[#16181d] border-b border-[#262930]">
                      {block.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-3 py-2.5 font-semibold text-white"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262930] bg-[#0e0f13]">
                    {block.rows.map((r, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-[#16181d] transition-colors"
                      >
                        {r.map((c, cIdx) => (
                          <td
                            key={cIdx}
                            className="px-3 py-2 text-[#bdc1c6] font-mono text-[11px]"
                          >
                            {renderInline(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "code":
            return <CodeBlock key={idx} lang={block.lang} code={block.code} />;

          case "list":
            return (
              <ul
                key={idx}
                className="space-y-1.5 my-2 pl-2 text-xs sm:text-[13px]"
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <span className="text-[#3186ff] mt-0.5 text-xs font-bold shrink-0">
                      •
                    </span>
                    <div className="flex-1">{renderInline(item)}</div>
                  </li>
                ))}
              </ul>
            );

          case "hr":
            return <hr key={idx} className="my-3 border-[#262930]" />;

          case "p":
            return (
              <p key={idx} className="text-[#bdc1c6] leading-relaxed my-1.5">
                {renderInline(block.text)}
              </p>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
