---
name: antigravity_skill
description: |
  Specialized skill extracting the design system, visual style tokens, interactive state logic,
  and multi-page architecture from Google Antigravity. Use when designing, building, or refactoring
  features to match this exact aesthetic and interactive flow.
---

# Google Antigravity

> **Source URL**: [https://antigravity.google/](https://antigravity.google/)  
> **Extraction Engine**: SkillForge Multi-Model Synthesizer (Deep Crawl Engine)  
> **Crawled Scope**: 5 pages across site architecture  
> **Detected Languages**: JavaScript, Bash / cURL  

---

## 1. Executive Summary & Use Cases
This skill provides an authoritative blueprint of the visual design system and functional logic extracted from **Google Antigravity**.
Any modern AI model (Gemini, ChatGPT, Cursor, Claude) should use this specification to:
- Faithfully reproduce the component layout and user interaction flows.
- Implement matching color palettes, typography scales, CSS variables, and Tailwind CSS utility rules.
- Maintain consistent state transitions, form validation schemas, and asynchronous API contracts.
- Align with detected architectural stack: **Tailwind CSS**.
- Apply code idioms for detected languages: **JavaScript, Bash / cURL**.

---

## 2. Discovered Site Architecture & Crawled Pages
The deep scraper explored the following routes across the site:
| Page Title | URL / Route | Depth | Word Count |
| :--- | :--- | :---: | :---: |
| Google Antigravity | [`/`](https://antigravity.google/) | 0 | 385 |
| Getting Started with Antigravity 2.0 | [`/docs/getting-started`](https://antigravity.google/docs/getting-started) | 1 | 482 |
| IDE Extensions | [`/docs/ide/extensions`](https://antigravity.google/docs/ide/extensions) | 1 | 288 |
| Google Antigravity - Antigravity SDK | [`/product/antigravity-sdk`](https://antigravity.google/product/antigravity-sdk) | 1 | 197 |
| Enterprise | [`/docs/enterprise`](https://antigravity.google/docs/enterprise) | 1 | 1101 |

---

## 3. Visual Design System & Styling Tokens

### Color Palette
| Token | Hex / HSL | Application |
| :--- | :--- | :--- |
| `color-1` | `#45474d` | Primary accent |
| `color-2` | `#000000` | Background / Surface |
| `color-3` | `#ffffff` | Content / Border |
| `color-4` | `#eff0f3` | Content / Border |
| `color-5` | `#1a73e8` | Primary Brand Blue |
| `color-6` | `#1557b0` | Dark Blue Accent |
| `color-7` | `#3186ff` | Light Blue Highlight |
| `color-8` | `#ffe432` | Yellow Attention / Highlight |

### CSS Custom Properties & Variables
| Variable | Value |
| :--- | :--- |
| `--intrinsic-aspect-ratio` | `1920 / 1080` |
| `--item-count` | `9` |
| `--sl-card-border` | `var(--sl-color-blue)` |
| `--sl-card-bg` | `var(--sl-color-blue-low)` |
| `--stagger-height` | `5rem` |
| `--sl-tab-color-border` | `var(--sl-color-text-accent)` |
| `--bullet-size` | `calc(var(--sl-line-height) * 1rem)` |
| `--bullet-margin` | `.375rem` |
| `--guide-width` | `1px` |
| `--lh` | `calc(1em * var(--sl-line-height-headings))` |

### Typography & Fonts
- **Font Families**: Google Sans Flex, Google Sans Text, Google Sans Code, Roboto, Arial, Helvetica, sans-serif, monospace
- **Hierarchy**:
  - Headings: Bold / ExtraBold, tracking-tight
  - Body: Regular / Medium text-sm with leading-relaxed
  - Code / Tokens: Monospace font-mono text-xs

### Layout & Utility Classes
- **Layout Paradigms**: Centered Container Architecture, Dark Mode Styling, Grid Containers
- **Animation & Transitions**: `@keyframes blink`
- **Primary Tailwind Classes**:
  ```css
  grid-container cursor-container grid-row grid-col cursor-content text-container dark:sl-hidden
  ```

---

## 4. Detected Languages & Code Stacks
The target application utilizes and references the following programming languages, CLI tooling, and dialects:
| Language / Tooling | Ecosystem Role | Detection Source |
| :--- | :--- | :--- |
| **JavaScript** | Implementation & Examples | DOM / Markdown / Scripts |
| **Bash / cURL** | Implementation & Examples | DOM / Markdown / Scripts |

---

## 5. Interactive Logic & State Architecture

### Core State Variables
- `query: string` (User search or filter input)
- `isLoading: boolean` (Asynchronous loading state)
- `activeTab: string` (Current view mode)

### Event Handlers & User Workflows
- `onSubmit(event)`: Handles user submissions and parameter validation.
- `onFilterChange(value)`: Triggers re-computation or data fetching.
- `onReset()`: Restores initial component state.

---

## 6. Universal AI Model Directives

### For Google Gemini
- Ground code generation in the CSS variables and Tailwind classes documented above.
- Ensure strict TypeScript typing and explicit component props interfaces.
- Primary code languages to produce: JavaScript, Bash / cURL.

### For OpenAI ChatGPT
- Apply the color tokens and state machines when generating UI or backend handlers.
- Prefer modular hooks for managing state variables.
- Target implementation languages: JavaScript, Bash / cURL.

### For Cursor & Windsurf
- Reference this skill when generating pages or components within this workspace.
- Adhere to the declared utility classes and avoid ad-hoc styling.
- Format code blocks using syntax for: JavaScript, Bash / cURL.

### For Anthropic Claude
- Use the structural layout patterns and design constraints outlined above.
- Support idiomatic patterns for JavaScript, Bash / cURL.

---

## 7. Gemini Assistant Instruction & Persona
```text
You are a Senior Frontend Architect and Gemini Coding Assistant specialized in the "antigravity_skill" skill.
When writing code or answering queries related to Google Antigravity:
1. Use these primary colors: #45474d, #000000, #ffffff, #eff0f3, #1a73e8.
2. Use Tailwind utility classes matching: grid-container cursor-container grid-row grid-col cursor-content text-container dark:sl-hidden.
3. Enforce the state management pattern: activeTab, query, isLoading.
4. Target Frameworks: Tailwind CSS.
5. Code Languages & Dialects: JavaScript, Bash / cURL.
6. Always produce clean, typed TypeScript and modern React components.
```
