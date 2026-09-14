# Linear – The system for product development — Style Reference
> Linear – The system for product development design system built on obsidian canvas with high-contrast type and vibrant electric iris accents.

**Theme:** mixed

Linear – The system for product development projects a cosmic-workspace atmosphere: near-black canvas with a single electric iris accent slicing through the hero, then a quieter productivity grid below. The system lives in a narrow chromatic band — one electric electric iris and one ember ember pulse do all the brand work against layered graphite surfaces, so the dark mode never feels neutral. Typography is var(--font-monospace) for everything functional, with a custom display face (var(--font-monospace)) reserved for hero moments at 80–84px with aggressive negative tracking. Components lean pill-shaped: 9999px radii on controls, 12px on cards, minimal shadow, and glowing gradient strokes as the primary decoration. The page alternates between full-bleed dark spectacle and calm light sections, so any new screen must decide which mode it's in before picking colors.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Obsidian Canvas | `#080808` | `--color-obsidian-canvas` | Page background, dominant surface — near-black with a whisper of warmth, default stage for all content |
| Void | `#090a0c` | `--color-void` | Deepest surface layer for hero gradients, modal backdrops, and borders that need to disappear into the canvas |
| Charcoal Card | `#08090a` | `--color-charcoal-card` | Elevated card and panel surfaces sitting one step above the canvas |
| Slate Edge | `#191d20` | `--color-slate-edge` | Hairline borders and dividers on dark surfaces |
| Iron Veil | `#6b6c6d` | `--color-iron-veil` | Muted backgrounds for tags, list-item fills, and disabled state washes |
| Smoke | `#585a5c` | `--color-smoke` | Icon strokes, secondary text, and inactive controls — the workhorse mid-gray |
| Ash | `#6b6b6b` | `--color-ash` | Tertiary text and subtle body borders in content-heavy lists |
| Frost | `#d1d1d1` | `--color-frost` | Light-mode borders, input fields, and secondary CTA borders |
| Linen | `#e5e5e7` | `--color-linen` | Light-mode surface tint and subtle section dividers in white backgrounds |
| Snow | `#ffffff` | `--color-snow` | Hairline borders, dividers, input outlines, and card edges on light surfaces. Do not promote it to primary CTA |
| Electric Iris | `#585a5c` | `--color-electric-iris` | Primary action background, active nav indicator, hero aurora cool stop — vivid and switched-on |
| Ember Pulse | `#6b6b6b` | `--color-ember-pulse` | Secondary accent, hero aurora warm stop, notification dot, illustration highlight |
| Molasses | `#5a250a` | `--color-molasses` | Deep ember tone for dark-context borders, icon strokes, and tag fills when coral would be too bright |

## Tokens — Typography

### var(--font-monospace) — All functional UI text — body, nav, buttons, list items, captions, small headings. Used at weight 500–600 for emphasis, 400 for body, 300 sparingly for quiet metadata. · `--font-var(--font-monospace)`
- **Substitute:** DM Sans, IBM Plex Sans
- **Weights:** 300, 400, 500, 600, 700
- **Sizes:** 10, 11, 12, 14, 15, 16, 18, 22, 24
- **Line height:** 1.00, 1.13, 1.25, 1.38, 1.50
- **Letter spacing:** Tight: -0.04em at large sizes, -0.02em at subhead, -0.01em at body, normal at caption
- **Role:** All functional UI text — body, nav, buttons, list items, captions, small headings. Used at weight 500–600 for emphasis, 400 for body, 300 sparingly for quiet metadata.

### var(--font-monospace) — Display-only: hero headlines, section openers, feature titles. The condensed geometry and tight tracking make 84px feel editorial rather than SaaS. Never used below 28px. · `--font-var(--font-monospace)`
- **Substitute:** Sora, General Sans
- **Weights:** 400, 500, 600
- **Sizes:** 28, 32, 80, 84
- **Line height:** 0.80, 0.90, 1.00
- **Letter spacing:** -0.05em to -0.02em, tightest at 80–84px
- **Role:** Display-only: hero headlines, section openers, feature titles. The condensed geometry and tight tracking make 84px feel editorial rather than SaaS. Never used below 28px.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 11px | 1.38 | -0.1px | `--text-caption` |
| body | 14px | 1.5 | -0.14px | `--text-body` |
| body-lg | 16px | 1.5 | -0.16px | `--text-body-lg` |
| subheading | 18px | 1.5 | -0.36px | `--text-subheading` |
| heading-sm | 22px | 1.25 | — | `--text-heading-sm` |
| heading | 24px | 1.25 | -0.48px | `--text-heading` |
| display-sm | 32px | 1.0 | -1.6px | `--text-display-sm` |
| display | 80px | 0.9 | -4px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 64 | 64px | `--spacing-64` |
| 160 | 160px | `--spacing-160` |
| 180 | 180px | `--spacing-180` |
| 240 | 240px | `--spacing-240` |

### Border Radius

| Element | Value |
|---------|-------|
| tags | 9999px |
| cards | 12px |
| inputs | 4px |
| panels | 30px |
| buttons | 9999px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| md | `rgba(0, 0, 0, 0.35) 0px 4px 16px 0px` | `--shadow-md` |
| subtle | `rgba(255, 255, 255, 0.4) 0px 0px 0px 6px` | `--shadow-subtle` |
| sm | `rgba(0, 0, 0, 0.15) 0px 4px 6px 0px` | `--shadow-sm` |
| xl | `rgba(0, 0, 0, 0.5) 0px 6px 25px 0px` | `--shadow-xl` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 12px

## Components

### Primary Pill Button
**Role:** Hero CTA, top-level conversion

Filled #585a5c, white text, var(--font-monospace) 14px weight 500, 9999px radius, 12px 24px padding. Inherits Electric Iris glow on hover. Uppercase or sentence-case tracking at -0.01em.

### Ghost Pill Button
**Role:** Secondary CTA, nav actions

Transparent background, 1px #191d20 border on dark surfaces, white text, var(--font-monospace) 14px weight 500, 9999px radius, 10px 20px padding. Becomes solid white-on-charcoal on hover.

### White Pill Button
**Role:** Light-section CTA, 'See in action' hero button

Solid #ffffff fill with dark text (#090a0c), 9999px radius, 12px 24px padding. This is the hero — 'SEE IN ACTION →' — and the one place white earns its weight as a foreground, not background.

### Feature Card
**Role:** Product capability cards in grids

Dark card on #08090a or gradient-tinted surface, 12px radius, 24px padding, optional 1px #191d20 border. Some variants carry a radial coral-to-amber glow behind the card edge.

### MetaBrain Card
**Role:** Feature highlight in the MetaBrain section

Deep card (#090a0c base) with 12px radius, 16–20px padding, containing a var(--font-monospace) 32px heading in white. Many carry a soft radial gradient bleed in the corner — warm amber or cool iris — as the visual hook.

### Product Screenshot Frame
**Role:** In-app UI previews in the hero and feature sections

Dark UI surface (matching the real product) wrapped in a 12px radius frame with a soft black shadow (rgba(0,0,0,0.5) 0 6px 25px). Floats above the aurora background as the hero's evidence.

### Top Navigation Bar
**Role:** Site-wide header

Transparent over the hero, sticks with a slight backdrop blur on scroll. Linear – The system for product development logo mark on the left, var(--font-monospace) 14px nav items in the center, 'Star Us' link + outlined 'Sign In' + filled 'Sign Up' pill on the right.

### Aurora Hero Background
**Role:** Full-bleed hero treatment

Vertical light beam on #090a0c: linear gradient from Electric Iris (#585a5c at ~60% opacity) through Ember Pulse (#6b6b6b) to white, painted as a narrow vertical streak. Radial sunburst glow at the base in warm amber.

### Tag/Chip
**Role:** Category labels on issue cards, filter pills

Small pill (9999px radius), 4px 10px padding, 11px var(--font-monospace) weight 500, text colored to match category. Background is the category color at 12% opacity.

### Stat Counter
**Role:** MetaBrain date/time display

Large var(--font-monospace) numeral (80px) in white inside a 30px-radius circle, with a + button below. The oversized number in a circle is the section's visual signature.

### Light Section Band
**Role:** Alternating content sections below the dark hero

White (#ffffff) or warm linen (#f6f6f6) background, var(--font-monospace) display heading in #050506, var(--font-monospace) body in #080808. The contrast flip from dark hero to light band is the page's structural rhythm.

### Kanban Board Preview
**Role:** Feature illustration cards

Mini dark-mode kanban with columns (BACKLOG, TO DO, IN PROGRESS) rendered in-product, wrapped in a 12px card with subtle shadow. Shows tags and avatars at real product scale.

### Inbox/Chat Panel
**Role:** Right-side feature preview

Dark panel with avatar circles, 12px radius, user names in var(--font-monospace) 14px weight 500 white, message previews in muted gray. Includes 'Unread' pills and status dots in electric iris.

## Do's and Don'ts

### Do
- Use 9999px radius for all buttons, tags, and pill controls — pill geometry is the system's signature shape
- Reserve var(--font-monospace) for display moments (28px and up); never use it for body, nav, or anything below 22px
- Pick a background mode first: dark (#080808 canvas) for product-heavy screens, white (#ffffff) for editorial sections — never blend them in one component
- Use Electric Iris (#585a5c) for the single most important action per screen; let Ember Pulse (#6b6b6b) appear as warm punctuation in tags, dots, and gradient stops
- Apply the aurora gradient (electric iris → ember pulse → white) as a narrow vertical or radial beam, never as a full background fill
- Set body text to 14px / line-height 1.5 / -0.14px tracking, and increase tracking compression proportionally with size (to -4px at 80px display)
- Stack dark and light sections as alternating bands with 96px vertical gaps to create the page's signature rhythm

### Don't
- Don't use sharp corners (0–8px) on buttons or tags — the system is pill-first
- Don't pair var(--font-monospace) display weights with custom display faces; they fight each other at large sizes
- Don't apply the aurora gradient as a full-surface background — it loses its impact when it covers everything
- Don't introduce a third accent color; the electric iris/ember pulse pair is the entire chromatic vocabulary
- Don't use shadows for elevation on dark cards — the system prefers borders (#191d20) and color contrast over drop shadows
- Don't use var(--font-monospace) below 28px or in body copy — tight tracking crushes readability at small sizes
- Don't put white text on a white section, or low contrast text on the dark canvas without checking contrast

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Obsidian Canvas | `#080808` | Page background, dominant surface for dark sections |
| 1 | Void | `#090a0c` | Deepest dark surface, hero gradient base, modal backdrops |
| 2 | Charcoal Card | `#08090a` | Elevated card panels one step above canvas |
| 3 | Light Canvas | `#ffffff` | Alternating light sections, editorial content bands |
| 4 | Linen | `#f6f6f6` | Soft warm tint for secondary light sections |

## Elevation

- **Product screenshot card:** `rgba(0, 0, 0, 0.5) 0px 6px 25px 0px`
- **Floating panel:** `rgba(0, 0, 0, 0.35) 0px 4px 16px 0px`
- **Subtle elevation:** `rgba(0, 0, 0, 0.15) 0px 4px 6px 0px`
- **Focus ring:** `rgba(255, 255, 255, 0.4) 0px 0px 0px 6px`

## Imagery

Hero is pure aurora gradient — no photography. All feature illustrations are real product UI screenshots (dark-mode kanban, inbox, calendar) wrapped in card frames, functioning as both evidence and decoration. No lifestyle photography, no stock imagery, no 3D renders. The only non-UI visual element is the warm radial sunburst glow at the base of the aurora, painted as a CSS gradient. Icons are monochrome line icons in muted gray or white, never multicolor. The system treats its own dark UI as the hero asset — the product is the photography.

## Layout

Full-bleed hero with a vertical aurora beam and headline left-aligned, product screenshot floating bottom-right. Below the hero, a max-width 1200px content area alternates dark and light bands. Each section is a single vertical block: heading + 3-column or 4-column card grid, separated by 96px gaps. The 'MetaBrain' section breaks the grid with a centered display heading and a mixed-size card mosaic (large featured card + smaller supporting cards). The page is content-dense by SaaS standards but uses the dark/light band alternation to give each section room to breathe. Navigation is a single transparent top bar that becomes opaque on scroll.

## Agent Prompt Guide

primary action: #585a5c (filled action)
Create a Primary Action Button: #585a5c background, #ffffff text, 9999px radius, compact pill padding. Use this filled treatment for the main CTA.

## Quick Color Reference
- Canvas (dark): #080808
- Canvas (light): #ffffff
- Primary text on dark: #ffffff
- Primary text on light: #050506
- Border dark: #191d20
- Border light: #d1d1d1
- Accent: #585a5c (Electric Iris) for primary actions
- Warm accent: #6b6b6b (Ember Pulse) for highlights, tags, gradient stops

## Example Component Prompts

1. **Primary action button**: #585a5c background, #ffffff text, 9999px radius, compact pill padding. Use this filled treatment for the main CTA.

2. **Feature card grid**: 4-column grid on white (#ffffff) section. Each card: #08090a background, 12px radius, 24px padding, 1px #191d20 border. Card heading: var(--font-monospace) 28px weight 500, #ffffff. Card body: var(--font-monospace) 14px weight 400, muted gray. Optional radial gradient bleed in corner (rgba(255,137,100,0.15) fading to transparent).

3. **Product screenshot frame**: In-app dark UI screenshot wrapped in a 12px-radius container with shadow rgba(0,0,0,0.5) 0 6px 25px. Floats over the aurora background at the bottom of the hero.

4. **Tag chip**: 9999px radius, 4px 10px padding, var(--font-monospace) 11px weight 500. Background: category color at 12% opacity. Text: category color at full saturation.

5. **Top navigation**: Transparent over hero. Linear – The system for product development logo left. Center: var(--font-monospace) 14px weight 400, #ffffff, 24px gaps. Right: 'Star Us' text link + outlined 'Sign In' ghost pill (1px #191d20 border, 9999px radius) + filled 'Sign Up' pill (#585a5c, white text, 9999px radius, 10px 20px padding).

## Gradient System

Two gradient families serve distinct purposes:

**Aurora beam** (hero only): linear-gradient(180deg, Electric Iris → Ember Pulse → white) painted as a narrow vertical streak, 15–25% page width. This is the brand's signature visual — it should appear once per page, not repeated.

**Radial sunburst** (feature card glows): radial-gradient from warm amber through soft yellow to transparent. Painted as a 200–400px circle bleeding from a card corner, at 30–50% opacity. Provides warmth without competing with the hero aurora.

**Section transitions** (rare): linear-gradient from white to soft violet-tint for section bridges.

Never stack two full-opacity gradients in the same viewport.

## Similar Brands

- **Linear** — Same dark-canvas productivity app aesthetic with a single vivid accent, pill-shaped controls, and product-UI-as-hero photography
- **Vercel** — Same dramatic gradient hero treatment (vertical beam on near-black) and display-headline-at-80px approach with tight letter-spacing
- **Arc Browser** — Same dark-mode-first product UI with warm-to-cool gradient washes and pill geometry on controls
- **Resend** — Same alternating dark/light section rhythm, minimal shadow approach, and 9999px button radii as a brand signature
- **Stripe** — Same use of gradient hero beams and product screenshots floating over atmospheric backgrounds, with var(--font-monospace) as the workhorse UI face

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-obsidian-canvas: #080808;
  --color-void: #090a0c;
  --color-charcoal-card: #08090a;
  --color-slate-edge: #191d20;
  --color-iron-veil: #6b6c6d;
  --color-smoke: #585a5c;
  --color-ash: #6b6b6b;
  --color-frost: #d1d1d1;
  --color-linen: #e5e5e7;
  --color-snow: #ffffff;
  --color-electric-iris: #585a5c;
  --color-ember-pulse: #6b6b6b;
  --color-molasses: #5a250a;

  /* Typography — Font Families */
  --font-var(--font-monospace): 'var(--font-monospace)', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Typography — Scale */
  --text-caption: 11px;
  --leading-caption: 1.38;
  --tracking-caption: -0.1px;
  --text-body: 14px;
  --leading-body: 1.5;
  --tracking-body: -0.14px;
  --text-body-lg: 16px;
  --leading-body-lg: 1.5;
  --tracking-body-lg: -0.16px;
  --text-subheading: 18px;
  --leading-subheading: 1.5;
  --tracking-subheading: -0.36px;
  --text-heading-sm: 22px;
  --leading-heading-sm: 1.25;
  --text-heading: 24px;
  --leading-heading: 1.25;
  --tracking-heading: -0.48px;
  --text-display-sm: 32px;
  --leading-display-sm: 1;
  --tracking-display-sm: -1.6px;
  --text-display: 80px;
  --leading-display: 0.9;
  --tracking-display: -4px;

  /* Typography — Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-64: 64px;
  --spacing-160: 160px;
  --spacing-180: 180px;
  --spacing-240: 240px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 96px;
  --card-padding: 24px;
  --element-gap: 12px;

  /* Border Radius */
  --radius-md: 4px;
  --radius-xl: 12px;
  --radius-3xl: 30px;
  --radius-full: 9999px;

  /* Named Radii */
  --radius-tags: 9999px;
  --radius-cards: 12px;
  --radius-inputs: 4px;
  --radius-panels: 30px;
  --radius-buttons: 9999px;

  /* Shadows */
  --shadow-md: rgba(0, 0, 0, 0.35) 0px 4px 16px 0px;
  --shadow-subtle: rgba(255, 255, 255, 0.4) 0px 0px 0px 6px;
  --shadow-sm: rgba(0, 0, 0, 0.15) 0px 4px 6px 0px;
  --shadow-xl: rgba(0, 0, 0, 0.5) 0px 6px 25px 0px;

  /* Surfaces */
  --surface-obsidian-canvas: #080808;
  --surface-void: #090a0c;
  --surface-charcoal-card: #08090a;
  --surface-light-canvas: #ffffff;
  --surface-linen: #f6f6f6;
}
```

### Tailwind v4

```css
/* === Tailwind CSS v4 (@theme) === */
@theme {
  /* Colors */
  --color-obsidian-canvas: #080808;
  --color-void: #090a0c;
  --color-charcoal-card: #08090a;
  --color-slate-edge: #191d20;
  --color-iron-veil: #6b6c6d;
  --color-smoke: #585a5c;
  --color-ash: #6b6b6b;
  --color-frost: #d1d1d1;
  --color-linen: #e5e5e7;
  --color-snow: #ffffff;
  --color-electric-iris: #585a5c;
  --color-ember-pulse: #6b6b6b;
  --color-molasses: #5a250a;

  /* Typography */
  --font-var(--font-monospace): 'var(--font-monospace)', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Typography — Scale */
  --text-caption: 11px;
  --leading-caption: 1.38;
  --tracking-caption: -0.1px;
  --text-body: 14px;
  --leading-body: 1.5;
  --tracking-body: -0.14px;
  --text-body-lg: 16px;
  --leading-body-lg: 1.5;
  --tracking-body-lg: -0.16px;
  --text-subheading: 18px;
  --leading-subheading: 1.5;
  --tracking-subheading: -0.36px;
  --text-heading-sm: 22px;
  --leading-heading-sm: 1.25;
  --text-heading: 24px;
  --leading-heading: 1.25;
  --tracking-heading: -0.48px;
  --text-display-sm: 32px;
  --leading-display-sm: 1;
  --tracking-display-sm: -1.6px;
  --text-display: 80px;
  --leading-display: 0.9;
  --tracking-display: -4px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-64: 64px;
  --spacing-160: 160px;
  --spacing-180: 180px;
  --spacing-240: 240px;

  /* Border Radius */
  --radius-md: 4px;
  --radius-xl: 12px;
  --radius-3xl: 30px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-md: rgba(0, 0, 0, 0.35) 0px 4px 16px 0px;
  --shadow-subtle: rgba(255, 255, 255, 0.4) 0px 0px 0px 6px;
  --shadow-sm: rgba(0, 0, 0, 0.15) 0px 4px 6px 0px;
  --shadow-xl: rgba(0, 0, 0, 0.5) 0px 6px 25px 0px;
}

/* === Tailwind CSS v3 (tailwind.config.js) === */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "obsidian-canvas": "#080808",
        "void": "#090a0c",
        "charcoal-card": "#08090a",
        "slate-edge": "#191d20",
        "iron-veil": "#6b6c6d",
        "smoke": "#585a5c",
        "ash": "#6b6b6b",
        "frost": "#d1d1d1",
        "linen": "#e5e5e7",
        "snow": "#ffffff",
        "electric-iris": "#585a5c",
        "ember-pulse": "#6b6b6b",
        "molasses": "#5a250a",
      },
      fontFamily: {
        sans: ["var(--font-monospace)", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        md: "4px",
        xl: "12px",
        "3xl": "30px",
        full: "9999px",
      },
    },
  },
};
```
