import { DesignSystemData } from "./types";

export const LINEAR_DESIGN_MD = "# Linear - The system for product development - Style Reference\n> Linear - The system for product development design system built on obsidian canvas with high-contrast type and vibrant electric iris accents.\n\n**Theme:** mixed\n\nLinear - The system for product development projects a cosmic-workspace atmosphere: near-black canvas with a single electric iris accent slicing through the hero, then a quieter productivity grid below. The system lives in a narrow chromatic band - one electric electric iris and one ember ember pulse do all the brand work against layered graphite surfaces, so the dark mode never feels neutral. Typography is var(--font-monospace) for everything functional, with a custom display face (var(--font-monospace)) reserved for hero moments at 80-84px with aggressive negative tracking. Components lean pill-shaped: 9999px radii on controls, 12px on cards, minimal shadow, and glowing gradient strokes as the primary decoration. The page alternates between full-bleed dark spectacle and calm light sections, so any new screen must decide which mode it's in before picking colors.\n\n## Tokens - Colors\n\n| Name | Value | Token | Role |\n|------|-------|-------|------|\n| Obsidian Canvas | `#080808` | `--color-obsidian-canvas` | Page background, dominant surface - near-black with a whisper of warmth, default stage for all content |\n| Void | `#090a0c` | `--color-void` | Deepest surface layer for hero gradients, modal backdrops, and borders that need to disappear into the canvas |\n| Charcoal Card | `#08090a` | `--color-charcoal-card` | Elevated card and panel surfaces sitting one step above the canvas |\n| Slate Edge | `#191d20` | `--color-slate-edge` | Hairline borders and dividers on dark surfaces |\n| Iron Veil | `#6b6c6d` | `--color-iron-veil` | Muted backgrounds for tags, list-item fills, and disabled state washes |\n| Smoke | `#585a5c` | `--color-smoke` | Icon strokes, secondary text, and inactive controls - the workhorse mid-gray |\n| Ash | `#6b6b6b` | `--color-ash` | Tertiary text and subtle body borders in content-heavy lists |\n| Frost | `#d1d1d1` | `--color-frost` | Light-mode borders, input fields, and secondary CTA borders |\n| Linen | `#e5e5e7` | `--color-linen` | Light-mode surface tint and subtle section dividers in white backgrounds |\n| Snow | `#ffffff` | `--color-snow` | Hairline borders, dividers, input outlines, and card edges on light surfaces. Do not promote it to primary CTA |\n| Electric Iris | `#585a5c` | `--color-electric-iris` | Primary action background, active nav indicator, hero aurora cool stop - vivid and switched-on |\n| Ember Pulse | `#6b6b6b` | `--color-ember-pulse` | Secondary accent, hero aurora warm stop, notification dot, illustration highlight |\n| Molasses | `#5a250a` | `--color-molasses` | Deep ember tone for dark-context borders, icon strokes, and tag fills when coral would be too bright |\n\n## Tokens - Typography\n\n### var(--font-monospace) - All functional UI text - body, nav, buttons, list items, captions, small headings. Used at weight 500-600 for emphasis, 400 for body, 300 sparingly for quiet metadata. · `--font-var(--font-monospace)`\n- **Substitute:** DM Sans, IBM Plex Sans\n- **Weights:** 300, 400, 500, 600, 700\n- **Sizes:** 10, 11, 12, 14, 15, 16, 18, 22, 24\n- **Line height:** 1.00, 1.13, 1.25, 1.38, 1.50\n- **Letter spacing:** Tight: -0.04em at large sizes, -0.02em at subhead, -0.01em at body, normal at caption\n- **Role:** All functional UI text - body, nav, buttons, list items, captions, small headings. Used at weight 500-600 for emphasis, 400 for body, 300 sparingly for quiet metadata.\n\n### var(--font-monospace) - Display-only: hero headlines, section openers, feature titles. The condensed geometry and tight tracking make 84px feel editorial rather than SaaS. Never used below 28px. · `--font-var(--font-monospace)`\n- **Substitute:** Sora, General Sans\n- **Weights:** 400, 500, 600\n- **Sizes:** 28, 32, 80, 84\n- **Line height:** 0.80, 0.90, 1.00\n- **Letter spacing:** -0.05em to -0.02em, tightest at 80-84px\n- **Role:** Display-only: hero headlines, section openers, feature titles. The condensed geometry and tight tracking make 84px feel editorial rather than SaaS. Never used below 28px.\n\n### Type Scale\n\n| Role | Size | Line Height | Letter Spacing | Token |\n|------|------|-------------|----------------|-------|\n| caption | 11px | 1.38 | -0.1px | `--text-caption` |\n| body | 14px | 1.5 | -0.14px | `--text-body` |\n| body-lg | 16px | 1.5 | -0.16px | `--text-body-lg` |\n| subheading | 18px | 1.5 | -0.36px | `--text-subheading` |\n| heading-sm | 22px | 1.25 | - | `--text-heading-sm` |\n| heading | 24px | 1.25 | -0.48px | `--text-heading` |\n| display-sm | 32px | 1.0 | -1.6px | `--text-display-sm` |\n| display | 80px | 0.9 | -4px | `--text-display` |\n\n## Tokens - Spacing & Shapes\n\n**Base unit:** 4px\n\n**Density:** comfortable\n\n### Spacing Scale\n\n| Name | Value | Token |\n|------|-------|-------|\n| 4 | 4px | `--spacing-4` |\n| 8 | 8px | `--spacing-8` |\n| 12 | 12px | `--spacing-12` |\n| 16 | 16px | `--spacing-16` |\n| 20 | 20px | `--spacing-20` |\n| 24 | 24px | `--spacing-24` |\n| 28 | 28px | `--spacing-28` |\n| 32 | 32px | `--spacing-32` |\n| 36 | 36px | `--spacing-36` |\n| 40 | 40px | `--spacing-40` |\n| 64 | 64px | `--spacing-64` |\n| 160 | 160px | `--spacing-160` |\n| 180 | 180px | `--spacing-180` |\n| 240 | 240px | `--spacing-240` |\n\n### Border Radius\n\n| Element | Value |\n|---------|-------|\n| tags | 9999px |\n| cards | 12px |\n| inputs | 4px |\n| panels | 30px |\n| buttons | 9999px |\n\n### Shadows\n\n| Name | Value | Token |\n|------|-------|-------|\n| md | `rgba(0, 0, 0, 0.35) 0px 4px 16px 0px` | `--shadow-md` |\n| subtle | `rgba(255, 255, 255, 0.4) 0px 0px 0px 6px` | `--shadow-subtle` |\n| sm | `rgba(0, 0, 0, 0.15) 0px 4px 6px 0px` | `--shadow-sm` |\n| xl | `rgba(0, 0, 0, 0.5) 0px 6px 25px 0px` | `--shadow-xl` |\n\n### Layout\n\n- **Page max-width:** 1200px\n- **Section gap:** 96px\n- **Card padding:** 24px\n- **Element gap:** 12px\n\n## Components\n\n### Primary Pill Button\n**Role:** Hero CTA, top-level conversion\n\nFilled #585a5c, white text, var(--font-monospace) 14px weight 500, 9999px radius, 12px 24px padding. Inherits Electric Iris glow on hover. Uppercase or sentence-case tracking at -0.01em.\n\n### Ghost Pill Button\n**Role:** Secondary CTA, nav actions\n\nTransparent background, 1px #191d20 border on dark surfaces, white text, var(--font-monospace) 14px weight 500, 9999px radius, 10px 20px padding. Becomes solid white-on-charcoal on hover.\n\n### White Pill Button\n**Role:** Light-section CTA, 'See in action' hero button\n\nSolid #ffffff fill with dark text (#090a0c), 9999px radius, 12px 24px padding. This is the hero - 'SEE IN ACTION →' - and the one place white earns its weight as a foreground, not background.\n\n### Feature Card\n**Role:** Product capability cards in grids\n\nDark card on #08090a or gradient-tinted surface, 12px radius, 24px padding, optional 1px #191d20 border. Some variants carry a radial coral-to-amber glow behind the card edge.\n\n### MetaBrain Card\n**Role:** Feature highlight in the MetaBrain section\n\nDeep card (#090a0c base) with 12px radius, 16-20px padding, containing a var(--font-monospace) 32px heading in white. Many carry a soft radial gradient bleed in the corner - warm amber or cool iris - as the visual hook.\n\n### Product Screenshot Frame\n**Role:** In-app UI previews in the hero and feature sections\n\nDark UI surface (matching the real product) wrapped in a 12px radius frame with a soft black shadow (rgba(0,0,0,0.5) 0 6px 25px). Floats above the aurora background as the hero's evidence.\n\n### Top Navigation Bar\n**Role:** Site-wide header\n\nTransparent over the hero, sticks with a slight backdrop blur on scroll. Linear - The system for product development logo mark on the left, var(--font-monospace) 14px nav items in the center, 'Star Us' link + outlined 'Sign In' + filled 'Sign Up' pill on the right.\n\n### Aurora Hero Background\n**Role:** Full-bleed hero treatment\n\nVertical light beam on #090a0c: linear gradient from Electric Iris (#585a5c at ~60% opacity) through Ember Pulse (#6b6b6b) to white, painted as a narrow vertical streak. Radial sunburst glow at the base in warm amber.\n\n### Tag/Chip\n**Role:** Category labels on issue cards, filter pills\n\nSmall pill (9999px radius), 4px 10px padding, 11px var(--font-monospace) weight 500, text colored to match category. Background is the category color at 12% opacity.\n\n### Stat Counter\n**Role:** MetaBrain date/time display\n\nLarge var(--font-monospace) numeral (80px) in white inside a 30px-radius circle, with a + button below. The oversized number in a circle is the section's visual signature.\n\n### Light Section Band\n**Role:** Alternating content sections below the dark hero\n\nWhite (#ffffff) or warm linen (#f6f6f6) background, var(--font-monospace) display heading in #050506, var(--font-monospace) body in #080808. The contrast flip from dark hero to light band is the page's structural rhythm.\n\n### Kanban Board Preview\n**Role:** Feature illustration cards\n\nMini dark-mode kanban with columns (BACKLOG, TO DO, IN PROGRESS) rendered in-product, wrapped in a 12px card with subtle shadow. Shows tags and avatars at real product scale.\n\n### Inbox/Chat Panel\n**Role:** Right-side feature preview\n\nDark panel with avatar circles, 12px radius, user names in var(--font-monospace) 14px weight 500 white, message previews in muted gray. Includes 'Unread' pills and status dots in electric iris.\n\n## Do's and Don'ts\n\n### Do\n- Use 9999px radius for all buttons, tags, and pill controls - pill geometry is the system's signature shape\n- Reserve var(--font-monospace) for display moments (28px and up); never use it for body, nav, or anything below 22px\n- Pick a background mode first: dark (#080808 canvas) for product-heavy screens, white (#ffffff) for editorial sections - never blend them in one component\n- Use Electric Iris (#585a5c) for the single most important action per screen; let Ember Pulse (#6b6b6b) appear as warm punctuation in tags, dots, and gradient stops\n- Apply the aurora gradient (electric iris → ember pulse → white) as a narrow vertical or radial beam, never as a full background fill\n- Set body text to 14px / line-height 1.5 / -0.14px tracking, and increase tracking compression proportionally with size (to -4px at 80px display)\n- Stack dark and light sections as alternating bands with 96px vertical gaps to create the page's signature rhythm\n\n### Don't\n- Don't use sharp corners (0-8px) on buttons or tags - the system is pill-first\n- Don't pair var(--font-monospace) display weights with custom display faces; they fight each other at large sizes\n- Don't apply the aurora gradient as a full-surface background - it loses its impact when it covers everything\n- Don't introduce a third accent color; the electric iris/ember pulse pair is the entire chromatic vocabulary\n- Don't use shadows for elevation on dark cards - the system prefers borders (#191d20) and color contrast over drop shadows\n- Don't use var(--font-monospace) below 28px or in body copy - tight tracking crushes readability at small sizes\n- Don't put white text on a white section, or low contrast text on the dark canvas without checking contrast\n\n## Surfaces\n\n| Level | Name | Value | Purpose |\n|-------|------|-------|---------|\n| 0 | Obsidian Canvas | `#080808` | Page background, dominant surface for dark sections |\n| 1 | Void | `#090a0c` | Deepest dark surface, hero gradient base, modal backdrops |\n| 2 | Charcoal Card | `#08090a` | Elevated card panels one step above canvas |\n| 3 | Light Canvas | `#ffffff` | Alternating light sections, editorial content bands |\n| 4 | Linen | `#f6f6f6` | Soft warm tint for secondary light sections |\n\n## Elevation\n\n- **Product screenshot card:** `rgba(0, 0, 0, 0.5) 0px 6px 25px 0px`\n- **Floating panel:** `rgba(0, 0, 0, 0.35) 0px 4px 16px 0px`\n- **Subtle elevation:** `rgba(0, 0, 0, 0.15) 0px 4px 6px 0px`\n- **Focus ring:** `rgba(255, 255, 255, 0.4) 0px 0px 0px 6px`\n\n## Imagery\n\nHero is pure aurora gradient - no photography. All feature illustrations are real product UI screenshots (dark-mode kanban, inbox, calendar) wrapped in card frames, functioning as both evidence and decoration. No lifestyle photography, no stock imagery, no 3D renders. The only non-UI visual element is the warm radial sunburst glow at the base of the aurora, painted as a CSS gradient. Icons are monochrome line icons in muted gray or white, never multicolor. The system treats its own dark UI as the hero asset - the product is the photography.\n\n## Layout\n\nFull-bleed hero with a vertical aurora beam and headline left-aligned, product screenshot floating bottom-right. Below the hero, a max-width 1200px content area alternates dark and light bands. Each section is a single vertical block: heading + 3-column or 4-column card grid, separated by 96px gaps. The 'MetaBrain' section breaks the grid with a centered display heading and a mixed-size card mosaic (large featured card + smaller supporting cards). The page is content-dense by SaaS standards but uses the dark/light band alternation to give each section room to breathe. Navigation is a single transparent top bar that becomes opaque on scroll.\n\n## Agent Prompt Guide\n\nprimary action: #585a5c (filled action)\nCreate a Primary Action Button: #585a5c background, #ffffff text, 9999px radius, compact pill padding. Use this filled treatment for the main CTA.\n\n## Quick Color Reference\n- Canvas (dark): #080808\n- Canvas (light): #ffffff\n- Primary text on dark: #ffffff\n- Primary text on light: #050506\n- Border dark: #191d20\n- Border light: #d1d1d1\n- Accent: #585a5c (Electric Iris) for primary actions\n- Warm accent: #6b6b6b (Ember Pulse) for highlights, tags, gradient stops\n\n## Example Component Prompts\n\n1. **Primary action button**: #585a5c background, #ffffff text, 9999px radius, compact pill padding. Use this filled treatment for the main CTA.\n\n2. **Feature card grid**: 4-column grid on white (#ffffff) section. Each card: #08090a background, 12px radius, 24px padding, 1px #191d20 border. Card heading: var(--font-monospace) 28px weight 500, #ffffff. Card body: var(--font-monospace) 14px weight 400, muted gray. Optional radial gradient bleed in corner (rgba(255,137,100,0.15) fading to transparent).\n\n3. **Product screenshot frame**: In-app dark UI screenshot wrapped in a 12px-radius container with shadow rgba(0,0,0,0.5) 0 6px 25px. Floats over the aurora background at the bottom of the hero.\n\n4. **Tag chip**: 9999px radius, 4px 10px padding, var(--font-monospace) 11px weight 500. Background: category color at 12% opacity. Text: category color at full saturation.\n\n5. **Top navigation**: Transparent over hero. Linear - The system for product development logo left. Center: var(--font-monospace) 14px weight 400, #ffffff, 24px gaps. Right: 'Star Us' text link + outlined 'Sign In' ghost pill (1px #191d20 border, 9999px radius) + filled 'Sign Up' pill (#585a5c, white text, 9999px radius, 10px 20px padding).\n\n## Gradient System\n\nTwo gradient families serve distinct purposes:\n\n**Aurora beam** (hero only): linear-gradient(180deg, Electric Iris → Ember Pulse → white) painted as a narrow vertical streak, 15-25% page width. This is the brand's signature visual - it should appear once per page, not repeated.\n\n**Radial sunburst** (feature card glows): radial-gradient from warm amber through soft yellow to transparent. Painted as a 200-400px circle bleeding from a card corner, at 30-50% opacity. Provides warmth without competing with the hero aurora.\n\n**Section transitions** (rare): linear-gradient from white to soft violet-tint for section bridges.\n\nNever stack two full-opacity gradients in the same viewport.\n\n## Similar Brands\n\n- **Linear** - Same dark-canvas productivity app aesthetic with a single vivid accent, pill-shaped controls, and product-UI-as-hero photography\n- **Vercel** - Same dramatic gradient hero treatment (vertical beam on near-black) and display-headline-at-80px approach with tight letter-spacing\n- **Arc Browser** - Same dark-mode-first product UI with warm-to-cool gradient washes and pill geometry on controls\n- **Resend** - Same alternating dark/light section rhythm, minimal shadow approach, and 9999px button radii as a brand signature\n- **Stripe** - Same use of gradient hero beams and product screenshots floating over atmospheric backgrounds, with var(--font-monospace) as the workhorse UI face\n\n## Quick Start\n\n### CSS Custom Properties\n\n```css\n:root {\n  /* Colors */\n  --color-obsidian-canvas: #080808;\n  --color-void: #090a0c;\n  --color-charcoal-card: #08090a;\n  --color-slate-edge: #191d20;\n  --color-iron-veil: #6b6c6d;\n  --color-smoke: #585a5c;\n  --color-ash: #6b6b6b;\n  --color-frost: #d1d1d1;\n  --color-linen: #e5e5e7;\n  --color-snow: #ffffff;\n  --color-electric-iris: #585a5c;\n  --color-ember-pulse: #6b6b6b;\n  --color-molasses: #5a250a;\n\n  /* Typography - Font Families */\n  --font-var(--font-monospace): 'var(--font-monospace)', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  --font-mono: 'JetBrains Mono', monospace;\n\n  /* Typography - Scale */\n  --text-caption: 11px;\n  --leading-caption: 1.38;\n  --tracking-caption: -0.1px;\n  --text-body: 14px;\n  --leading-body: 1.5;\n  --tracking-body: -0.14px;\n  --text-body-lg: 16px;\n  --leading-body-lg: 1.5;\n  --tracking-body-lg: -0.16px;\n  --text-subheading: 18px;\n  --leading-subheading: 1.5;\n  --tracking-subheading: -0.36px;\n  --text-heading-sm: 22px;\n  --leading-heading-sm: 1.25;\n  --text-heading: 24px;\n  --leading-heading: 1.25;\n  --tracking-heading: -0.48px;\n  --text-display-sm: 32px;\n  --leading-display-sm: 1;\n  --tracking-display-sm: -1.6px;\n  --text-display: 80px;\n  --leading-display: 0.9;\n  --tracking-display: -4px;\n\n  /* Typography - Weights */\n  --font-weight-light: 300;\n  --font-weight-regular: 400;\n  --font-weight-medium: 500;\n  --font-weight-semibold: 600;\n  --font-weight-bold: 700;\n\n  /* Spacing */\n  --spacing-unit: 4px;\n  --spacing-4: 4px;\n  --spacing-8: 8px;\n  --spacing-12: 12px;\n  --spacing-16: 16px;\n  --spacing-20: 20px;\n  --spacing-24: 24px;\n  --spacing-28: 28px;\n  --spacing-32: 32px;\n  --spacing-36: 36px;\n  --spacing-40: 40px;\n  --spacing-64: 64px;\n  --spacing-160: 160px;\n  --spacing-180: 180px;\n  --spacing-240: 240px;\n\n  /* Layout */\n  --page-max-width: 1200px;\n  --section-gap: 96px;\n  --card-padding: 24px;\n  --element-gap: 12px;\n\n  /* Border Radius */\n  --radius-md: 4px;\n  --radius-xl: 12px;\n  --radius-3xl: 30px;\n  --radius-full: 9999px;\n\n  /* Named Radii */\n  --radius-tags: 9999px;\n  --radius-cards: 12px;\n  --radius-inputs: 4px;\n  --radius-panels: 30px;\n  --radius-buttons: 9999px;\n\n  /* Shadows */\n  --shadow-md: rgba(0, 0, 0, 0.35) 0px 4px 16px 0px;\n  --shadow-subtle: rgba(255, 255, 255, 0.4) 0px 0px 0px 6px;\n  --shadow-sm: rgba(0, 0, 0, 0.15) 0px 4px 6px 0px;\n  --shadow-xl: rgba(0, 0, 0, 0.5) 0px 6px 25px 0px;\n\n  /* Surfaces */\n  --surface-obsidian-canvas: #080808;\n  --surface-void: #090a0c;\n  --surface-charcoal-card: #08090a;\n  --surface-light-canvas: #ffffff;\n  --surface-linen: #f6f6f6;\n}\n```\n\n### Tailwind v4\n\n```css\n/* === Tailwind CSS v4 (@theme) === */\n@theme {\n  /* Colors */\n  --color-obsidian-canvas: #080808;\n  --color-void: #090a0c;\n  --color-charcoal-card: #08090a;\n  --color-slate-edge: #191d20;\n  --color-iron-veil: #6b6c6d;\n  --color-smoke: #585a5c;\n  --color-ash: #6b6b6b;\n  --color-frost: #d1d1d1;\n  --color-linen: #e5e5e7;\n  --color-snow: #ffffff;\n  --color-electric-iris: #585a5c;\n  --color-ember-pulse: #6b6b6b;\n  --color-molasses: #5a250a;\n\n  /* Typography */\n  --font-var(--font-monospace): 'var(--font-monospace)', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  --font-mono: 'JetBrains Mono', monospace;\n\n  /* Typography - Scale */\n  --text-caption: 11px;\n  --leading-caption: 1.38;\n  --tracking-caption: -0.1px;\n  --text-body: 14px;\n  --leading-body: 1.5;\n  --tracking-body: -0.14px;\n  --text-body-lg: 16px;\n  --leading-body-lg: 1.5;\n  --tracking-body-lg: -0.16px;\n  --text-subheading: 18px;\n  --leading-subheading: 1.5;\n  --tracking-subheading: -0.36px;\n  --text-heading-sm: 22px;\n  --leading-heading-sm: 1.25;\n  --text-heading: 24px;\n  --leading-heading: 1.25;\n  --tracking-heading: -0.48px;\n  --text-display-sm: 32px;\n  --leading-display-sm: 1;\n  --tracking-display-sm: -1.6px;\n  --text-display: 80px;\n  --leading-display: 0.9;\n  --tracking-display: -4px;\n\n  /* Spacing */\n  --spacing-4: 4px;\n  --spacing-8: 8px;\n  --spacing-12: 12px;\n  --spacing-16: 16px;\n  --spacing-20: 20px;\n  --spacing-24: 24px;\n  --spacing-28: 28px;\n  --spacing-32: 32px;\n  --spacing-36: 36px;\n  --spacing-40: 40px;\n  --spacing-64: 64px;\n  --spacing-160: 160px;\n  --spacing-180: 180px;\n  --spacing-240: 240px;\n\n  /* Border Radius */\n  --radius-md: 4px;\n  --radius-xl: 12px;\n  --radius-3xl: 30px;\n  --radius-full: 9999px;\n\n  /* Shadows */\n  --shadow-md: rgba(0, 0, 0, 0.35) 0px 4px 16px 0px;\n  --shadow-subtle: rgba(255, 255, 255, 0.4) 0px 0px 0px 6px;\n  --shadow-sm: rgba(0, 0, 0, 0.15) 0px 4px 6px 0px;\n  --shadow-xl: rgba(0, 0, 0, 0.5) 0px 6px 25px 0px;\n}\n\n/* === Tailwind CSS v3 (tailwind.config.js) === */\n/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        \"obsidian-canvas\": \"#080808\",\n        \"void\": \"#090a0c\",\n        \"charcoal-card\": \"#08090a\",\n        \"slate-edge\": \"#191d20\",\n        \"iron-veil\": \"#6b6c6d\",\n        \"smoke\": \"#585a5c\",\n        \"ash\": \"#6b6b6b\",\n        \"frost\": \"#d1d1d1\",\n        \"linen\": \"#e5e5e7\",\n        \"snow\": \"#ffffff\",\n        \"electric-iris\": \"#585a5c\",\n        \"ember-pulse\": \"#6b6b6b\",\n        \"molasses\": \"#5a250a\",\n      },\n      fontFamily: {\n        sans: [\"var(--font-monospace)\", \"sans-serif\"],\n        mono: [\"JetBrains Mono\", \"monospace\"],\n      },\n      borderRadius: {\n        md: \"4px\",\n        xl: \"12px\",\n        \"3xl\": \"30px\",\n        full: \"9999px\",\n      },\n    },\n  },\n};\n```\n";
export const HULY_DESIGN_MD = LINEAR_DESIGN_MD;

export const LINEAR_EXAMPLE_DESIGN_SYSTEM: DesignSystemData = {
  name: "linear_design",
  title: "Linear - The system for product development",
  description: "The product development system for teams and agents - built on obsidian canvas with high-contrast type and electric iris accents.",
  targetUrl: "https://linear.app",
  aestheticSummary: "Linear projects a cosmic-workspace atmosphere: near-black canvas with a single electric iris accent slicing through the hero, then a quieter productivity grid below.",
  designMd: LINEAR_DESIGN_MD,
  skillMd: LINEAR_DESIGN_MD,
  componentCode: `"use client";

import React, { useState } from "react";
import { ArrowRight, Copy, Check, Sparkles, Minus, Maximize2, X, Play, GitPullRequest, Plus } from "lucide-react";

export default function LinearSpecimens() {
  const [activeTab, setActiveTab] = useState<"agents" | "buttons" | "palette">("agents");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { role: "background", name: "Obsidian Canvas", hex: "#080808", usage: "Page background, dominant surface" },
    { role: "deep", name: "Void", hex: "#090a0c", usage: "Deepest surface layer for hero gradients" },
    { role: "surface", name: "Charcoal Card", hex: "#08090a", usage: "Elevated card and panel surfaces" },
    { role: "border", name: "Slate Edge", hex: "#191d20", usage: "Hairline borders and dividers on dark surfaces" },
    { role: "veil", name: "Iron Veil", hex: "#6b6c6d", usage: "Muted backgrounds for tags and disabled washes" },
    { role: "muted", name: "Smoke", hex: "#585a5c", usage: "Icon strokes, secondary text, inactive controls" },
    { role: "tertiary", name: "Ash", hex: "#6b6b6b", usage: "Tertiary text and subtle body borders" },
    { role: "light-border", name: "Frost", hex: "#d1d1d1", usage: "Light-mode borders, input fields, secondary CTA" },
    { role: "light-surface", name: "Linen", hex: "#e5e5e7", usage: "Light-mode surface tint and section dividers" },
    { role: "text", name: "Snow", hex: "#ffffff", usage: "Card edges and high-contrast text" },
    { role: "primary", name: "Electric Iris", hex: "#585a5c", usage: "Primary action background, active nav indicator" },
    { role: "accent", name: "Ember Pulse", hex: "#6b6b6b", usage: "Secondary accent, hero aurora warm stop" },
    { role: "dark-accent", name: "Molasses", hex: "#5a250a", usage: "Deep ember tone for dark-context borders" },
  ];

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="w-full space-y-6 text-[#ffffff] font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#191d20]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Linear - Style Specimens</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#585a5c]/20 text-[#d1d1d1] border border-[#585a5c]/40">
              Gold Standard
            </span>
          </h2>
          <p className="text-xs text-[#585a5c] mt-1">
            Linear autonomous agent cards, obsidian canvas & high-contrast tokens
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#090a0c] p-1 rounded-full border border-[#191d20] text-xs">
          {(["agents", "buttons", "palette"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={\`px-3 py-1.5 rounded-full font-medium capitalize transition-all cursor-pointer \${
                activeTab === tab
                  ? "bg-[#191d20] text-white shadow-xs border border-[#2b3038]"
                  : "text-[#585a5c] hover:text-white"
              }\`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "agents" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#585a5c]">
              Autonomous Agent Execution Cards (Inspo 2)
            </h3>
            <span className="text-[11px] font-mono text-[#585a5c]">Cursor & Linear Opus 5</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cursor Agent Card */}
            <div className="rounded-2xl border border-[#191d20] bg-[#08090a] p-5 flex flex-col justify-between space-y-4 text-left shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#191d20]/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <polygon points="12 2 2 22 22 22" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-white">Cursor</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#585a5c]">
                  <Minus className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                  <X className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              <div className="bg-[#121417] border border-[#1e2126] rounded-xl p-3.5 space-y-2.5 shadow-inner">
                <p className="text-[13px] text-white/95 leading-relaxed font-normal">
                  add retry handling for failed image uploads described in this issue
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[#1e2126]/60">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#ffe432]/60 bg-[#ffe432]/20 flex items-center justify-center text-[9px] text-[#ffe432] font-mono">
                    ◐
                  </span>
                  <span className="text-[11px] font-mono text-white/80 font-medium">ENG-2844</span>
                  <span className="text-[11px] text-[#6b6c6d]">added to context</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#6b6c6d] font-mono text-[11px]">
                  <span>Thinking...</span>
                  <Play className="w-2.5 h-2.5 fill-current text-[#6b6c6d]" />
                </div>
                <p className="text-[12px] text-[#d1d1d1] leading-relaxed">
                  Started working on{" "}
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#191d22] border border-[#2a2e36] text-[11px] font-mono text-white">
                    <span className="text-[#ffe432]">◐</span> ENG-2844 Failed image upload
                  </span>{" "}
                  and launched a cloud agent.
                </p>
              </div>

              <div className="bg-[#101215] border border-[#1b1e23] rounded-lg px-3 py-2 flex items-center justify-between text-xs text-[#8a8f98]">
                <div className="flex items-center gap-2">
                  <span className="text-[#585a5c] tracking-widest text-[11px]">⠿</span>
                  <span className="text-[12px] text-[#c0c4cc]">Setting up DRV/rideshare-app...</span>
                </div>
                <span className="font-mono text-[11px] text-[#585a5c]">00:07</span>
              </div>
            </div>

            {/* Linear Opus 5 Agent Card */}
            <div className="rounded-2xl border border-[#191d20] bg-[#08090a] p-5 flex flex-col justify-between space-y-4 text-left shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#191d20]/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-white flex items-center justify-center font-bold text-xs">
                    ◐
                  </div>
                  <span className="text-[13px] font-medium text-white">Linear</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181a1e] border border-[#262a30] text-[#9aa0a6]">
                    Opus 5
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#585a5c]">
                  <Minus className="w-3 h-3 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3 h-3 hover:text-white cursor-pointer" />
                  <X className="w-3 h-3 hover:text-white cursor-pointer" />
                </div>
              </div>

              <div className="bg-[#121417] border border-[#1e2126] rounded-xl p-3.5 space-y-2.5 shadow-inner">
                <p className="text-[13px] text-white/95 leading-relaxed font-normal">
                  Fix the dimmed ride rows that never reset and open a PR
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[#1e2126]/60">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#ffe432]/60 bg-[#ffe432]/20 flex items-center justify-center text-[9px] text-[#ffe432] font-mono">
                    ◐
                  </span>
                  <span className="text-[11px] font-mono text-white/80 font-medium">DRV-364</span>
                  <span className="text-[11px] text-[#6b6c6d]">added to context</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-[#6b6c6d] font-mono text-[11px]">
                  <span>Worked for 10 sec</span>
                  <Play className="w-2.5 h-2.5 fill-current text-[#6b6c6d]" />
                </div>
                <p className="text-[12px] text-[#d1d1d1] leading-relaxed">
                  Pushed and opened a draft PR. Removed dimmedIds - isItemDimmed now checks waitingStatusById directly.
                </p>
              </div>

              <div className="bg-[#121417] border border-[#1e2126] rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#9aa0a6] flex items-center gap-1.5">
                    <span>Changed 2 files</span>
                    <span className="font-mono text-[11px] text-[#34d399] font-medium">+22</span>
                    <span className="font-mono text-[11px] text-[#f87171] font-medium">-10</span>
                  </div>
                  <button type="button" className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#d1d1d1] bg-[#1a1d22] border border-[#2a2e36] flex items-center gap-1">
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Preview</span>
                  </button>
                </div>
                <div className="pt-1 border-t border-[#1e2126]/60">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-white/95">
                    <GitPullRequest className="w-3.5 h-3.5 text-[#9aa0a6]" />
                    <span>Draft Reset dimmed ride rows</span>
                  </div>
                  <p className="font-mono text-[10px] text-[#585a5c] mt-0.5">
                    master ← ride/drv-364-reset-dimmed-rows
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "buttons" && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#585a5c]">
            Pill-Shaped Controls (9999px Radius)
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white bg-[#585a5c] hover:bg-[#6e7175] transition-all active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <span>Primary Action</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-transparent border border-[#191d20] hover:bg-white hover:text-[#080808] transition-all active:scale-98 cursor-pointer"
            >
              <span>Ghost Pill</span>
            </button>
            <button
              type="button"
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#080808] bg-[#ffffff] hover:bg-[#eaeaea] transition-all active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <span>White Pill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === "palette" && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#585a5c]">
            Linear Semantic Palette
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {colors.map((c) => (
              <div
                key={c.name}
                onClick={() => copyHex(c.hex)}
                className="p-3 rounded-xl bg-[#08090a] border border-[#191d20] space-y-2 cursor-pointer hover:border-[#2b3038] transition-all group"
              >
                <div
                  className="w-full h-12 rounded-lg border border-white/10 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate">{c.name}</span>
                    <span className="font-mono text-[10px] text-[#585a5c] group-hover:text-white">
                      {copiedHex === c.hex ? "Copied!" : c.hex}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#6b6c6d] line-clamp-1">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
`
,
  semanticColors: [
    { role: "background", name: "Obsidian Canvas", hex: "#080808", usage: "Page background, dominant surface - near-black with a whisper of warmth, default stage for all content" },
    { role: "deep", name: "Void", hex: "#090a0c", usage: "Deepest surface layer for hero gradients, modal backdrops, and borders that need to disappear into the canvas" },
    { role: "surface", name: "Charcoal Card", hex: "#08090a", usage: "Elevated card and panel surfaces sitting one step above the canvas" },
    { role: "border", name: "Slate Edge", hex: "#191d20", usage: "Hairline borders and dividers on dark surfaces" },
    { role: "veil", name: "Iron Veil", hex: "#6b6c6d", usage: "Muted backgrounds for tags, list-item fills, and disabled state washes" },
    { role: "muted", name: "Smoke", hex: "#585a5c", usage: "Icon strokes, secondary text, and inactive controls - the workhorse mid-gray" },
    { role: "tertiary", name: "Ash", hex: "#6b6b6b", usage: "Tertiary text and subtle body borders in content-heavy lists" },
    { role: "light-border", name: "Frost", hex: "#d1d1d1", usage: "Light-mode borders, input fields, and secondary CTA borders" },
    { role: "light-surface", name: "Linen", hex: "#e5e5e7", usage: "Light-mode surface tint and subtle section dividers in white backgrounds" },
    { role: "text", name: "Snow", hex: "#ffffff", usage: "Hairline borders, dividers, input outlines, and card edges on light surfaces. Do not promote it to primary CTA" },
    { role: "primary", name: "Electric Iris", hex: "#585a5c", usage: "Primary action background, active nav indicator, hero aurora cool stop - vivid and switched-on" },
    { role: "accent", name: "Ember Pulse", hex: "#6b6b6b", usage: "Secondary accent, hero aurora warm stop, notification dot, illustration highlight" },
    { role: "dark-accent", name: "Molasses", hex: "#5a250a", usage: "Deep ember tone for dark-context borders, icon strokes, and tag fills when coral would be too bright" },
  ],
  typographyScale: [
    { level: "caption", size: "11px", lineHeight: "1.38", weight: "500", letterSpacing: "-0.1px", sample: "Category labels, tags, and small timestamps" },
    { level: "body", size: "14px", lineHeight: "1.5", weight: "400", letterSpacing: "-0.14px", sample: "All functional UI text, issue descriptions, and feed items." },
    { level: "body-lg", size: "16px", lineHeight: "1.5", weight: "500", letterSpacing: "-0.16px", sample: "Hero paragraph copy and featured card summaries." },
    { level: "subheading", size: "18px", lineHeight: "1.5", weight: "500", letterSpacing: "-0.36px", sample: "Section lead-ins and prominent card titles." },
    { level: "heading-sm", size: "22px", lineHeight: "1.25", weight: "600", letterSpacing: "normal", sample: "Feature headers and sub-panel titles." },
    { level: "heading", size: "24px", lineHeight: "1.25", weight: "600", letterSpacing: "-0.48px", sample: "Modal titles and core section openers." },
    { level: "display-sm", size: "32px", lineHeight: "1", weight: "600", letterSpacing: "-1.6px", sample: "Secondary hero banner accents." },
    { level: "display", size: "80px", lineHeight: "0.9", weight: "600", letterSpacing: "-4px", sample: "The product development system for teams and agents" },
  ],
  primaryFont: "var(--font-monospace)",
  headingFont: "var(--font-monospace)",
  monoFont: "JetBrains Mono",
  spacingScale: ["4px", "8px", "12px", "16px", "20px", "24px", "28px", "32px", "36px", "40px", "64px", "160px", "180px", "240px"],
  radiiScale: ["4px", "12px", "30px", "9999px"],
  shadowScale: [
    "rgba(0, 0, 0, 0.15) 0px 4px 6px 0px",
    "rgba(0, 0, 0, 0.35) 0px 4px 16px 0px",
    "rgba(0, 0, 0, 0.5) 0px 6px 25px 0px",
    "rgba(255, 255, 255, 0.4) 0px 0px 0px 6px",
  ],
  cssVariablesFormatted: `:root {
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

  /* Typography Scale */
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

  /* Border Radii */
  --radius-md: 4px;
  --radius-xl: 12px;
  --radius-3xl: 30px;
  --radius-full: 9999px;
}`,
  tailwindConfigFormatted: `@theme {
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

  --font-sans: 'var(--font-monospace)', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-md: 4px;
  --radius-xl: 12px;
  --radius-3xl: 30px;
  --radius-full: 9999px;
}`,
  tokensJsonFormatted: JSON.stringify(
    {
      color: {
        obsidianCanvas: { value: "#080808" },
        void: { value: "#090a0c" },
        charcoalCard: { value: "#08090a" },
        slateEdge: { value: "#191d20" },
        ironVeil: { value: "#6b6c6d" },
        smoke: { value: "#585a5c" },
        ash: { value: "#6b6b6b" },
        frost: { value: "#d1d1d1" },
        linen: { value: "#e5e5e7" },
        snow: { value: "#ffffff" },
        electricIris: { value: "#585a5c" },
        emberPulse: { value: "#6b6b6b" },
        molasses: { value: "#5a250a" },
      },
      radius: {
        tags: { value: "9999px" },
        cards: { value: "12px" },
        inputs: { value: "4px" },
        panels: { value: "30px" },
        buttons: { value: "9999px" },
      },
    },
    null,
    2
  ),
  styles: {
    colors: ["#080808", "#090a0c", "#08090a", "#191d20", "#6b6c6d", "#585a5c", "#6b6b6b", "#d1d1d1", "#e5e5e7", "#ffffff"],
    fonts: ["var(--font-monospace)", "JetBrains Mono"],
    cssVariables: {
      "--color-obsidian-canvas": "#080808",
      "--color-void": "#090a0c",
      "--color-charcoal-card": "#08090a",
      "--color-slate-edge": "#191d20",
      "--color-electric-iris": "#585a5c",
      "--color-ember-pulse": "#6b6b6b",
    },
    tailwindClasses: ["bg-[#080808]", "text-white", "rounded-full", "rounded-xl", "border-[#191d20]"],
    layoutPatterns: ["Obsidian canvas", "Pill controls", "Autonomous agent cards", "Subtle border hierarchy"],
  },
  logic: {
    stateVariables: ["activeIssue", "agentThinking", "draftPrStatus"],
    eventHandlers: ["handleLaunchAgent", "handleFilterPills", "handleCopyToken"],
    interactiveElements: ["Agent dialogs", "Pill buttons", "Window controls", "Search palette"],
    apiEndpoints: ["/api/generate-skill", "/api/download-bundle"],
    formActions: [],
  },
  modelPrompts: {
    cursor: `// .cursorrules for Linear Style System
Primary Canvas: #080808 (near-black)
Surface Cards: #08090a, 12px border radius, 1px solid #191d20 border
Controls: 9999px radius (pill buttons, category tags, filters)
Primary Accent: #585a5c (Electric Iris)
Typography: var(--font-monospace) at -0.01em to -0.04em letter spacing`,
    claude: `# CLAUDE.md - Linear Design System
You are a frontend expert implementing the Linear design language.
Use #080808 canvas background with #08090a elevated cards and 1px #191d20 borders.
All buttons, filter tags, and chips must use rounded-full (9999px radius).
Autonomous agent cards feature recessed prompt bubbles and diff bars.`,
    gemini: `Google Gemini Persona: Linear Design Architect
Emphasize Obsidian Canvas (#080808), high-contrast Snow (#ffffff) typography, and subtle Slate Edge (#191d20) dividing lines. Components must strictly adhere to 9999px pill controls and 12px card frames.`,
    chatgpt: `OpenAI System Prompt: Linear Design System
Build UI with pitch-black canvas (#080808), charcoal cards (#08090a), and high-precision pill buttons (9999px). Feature autonomous agent dialog cards with monospace timestamps and issue references.`,
  },
};

export const HULY_EXAMPLE_DESIGN_SYSTEM = LINEAR_EXAMPLE_DESIGN_SYSTEM;

export const STRIPE_EXAMPLE_DESIGN_SYSTEM: DesignSystemData = {
  name: "stripe_design",
  title: "Stripe - Financial infrastructure for the internet",
  description: "The global fintech benchmark: crisp typography, vibrant indigo accents, subtle glass elevation, and clean tabular grids.",
  targetUrl: "https://stripe.com",
  aestheticSummary: "Stripe balances corporate authority with vibrant modernity: pure white and slate light surfaces, signature blur gradients, high-legibility Soehne typography, and meticulous 4px micro-radii.",
  designMd: `# Stripe - Financial Infrastructure - Style Reference
> Clean fintech precision engineered for global commerce, characterized by vivid indigo highlights, pristine white surfaces, and subtle blur gradients.

**Theme:** light-first with dark terminal accents

Stripe represents the gold standard in fintech interface design: crisp, reliable, and mathematically proportioned. The palette centers on iconic Stripe Blurple (#635bff), supported by deep navy (#0a2540) text and tranquil slate borders (#e6ebf1). Typography is clean, utilizing proportional sans-serif with tabular numerals for monetary values.

## Tokens - Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas | \`#ffffff\` | \`--color-canvas\` | Primary page and card surface |
| Off-Canvas | \`#f6f9fc\` | \`--color-off-canvas\` | Elevated section tint and background shading |
| Slate Border | \`#e6ebf1\` | \`--color-slate-border\` | Structural divider lines and input borders |
| Navy Heading | \`#0a2540\` | \`--color-navy-heading\` | Highest-contrast headings and active metrics |
| Slate Body | \`#425466\` | \`--color-slate-body\` | High-readability secondary copy and documentation |
| Stripe Blurple | \`#635bff\` | \`--color-blurple\` | Primary action button, active link, brand anchor |
| Cyan Accent | \`#00d4ff\` | \`--color-cyan-accent\` | Secondary gradient stop, API highlight |
| Success Emerald | \`#00d924\` | \`--color-emerald\` | Transaction verified, 200 OK status |
| Amber Warning | \`#ffc000\` | \`--color-amber\` | Pending webhooks and risk flags |

## Tokens - Typography

### Primary Font - Soehne / Inter
- Weights: 400, 500, 600, 700
- Sizes: 12px, 14px, 16px, 18px, 24px, 32px, 48px, 64px
- Tracking: -0.01em on body, -0.03em on hero displays
`,
  skillMd: `# Stripe Design System Reference`,
  componentCode: ``,
  semanticColors: [
    { role: "background", name: "Canvas", hex: "#ffffff", usage: "Primary background" },
    { role: "surface", name: "Off-Canvas", hex: "#f6f9fc", usage: "Section shading" },
    { role: "border", name: "Slate Border", hex: "#e6ebf1", usage: "Card and input borders" },
    { role: "text", name: "Navy Heading", hex: "#0a2540", usage: "Headings and display type" },
    { role: "muted", name: "Slate Body", hex: "#425466", usage: "Body text and metadata" },
    { role: "primary", name: "Stripe Blurple", hex: "#635bff", usage: "Primary CTA and active states" },
    { role: "accent", name: "Cyan Accent", hex: "#00d4ff", usage: "Gradient highlights" },
    { role: "success", name: "Emerald", hex: "#00d924", usage: "Transaction success" },
  ],
  typographyScale: [
    { level: "caption", size: "12px", lineHeight: "1.33", weight: "500", sample: "API v2024-06" },
    { level: "body", size: "14px", lineHeight: "1.5", weight: "400", sample: "Accept payments and scale globally." },
    { level: "body-lg", size: "16px", lineHeight: "1.5", weight: "500", sample: "Unified financial stack" },
    { level: "heading-sm", size: "20px", lineHeight: "1.3", weight: "600", sample: "Payment Methods" },
    { level: "heading", size: "28px", lineHeight: "1.2", weight: "600", sample: "Built for developers" },
    { level: "display", size: "56px", lineHeight: "1.08", weight: "700", sample: "Financial infrastructure" },
  ],
  primaryFont: "Inter, -apple-system, sans-serif",
  headingFont: "Inter, sans-serif",
  monoFont: "ui-monospace, SFMono-Regular, monospace",
  spacingScale: ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px"],
  radiiScale: ["4px", "8px", "12px", "9999px"],
  shadowScale: ["0 2px 4px rgba(0,0,0,0.05)", "0 4px 12px rgba(50,50,93,0.1)"],
  cssVariablesFormatted: `:root {
  --color-canvas: #ffffff;
  --color-off-canvas: #f6f9fc;
  --color-slate-border: #e6ebf1;
  --color-navy-heading: #0a2540;
  --color-slate-body: #425466;
  --color-blurple: #635bff;
  --color-cyan-accent: #00d4ff;
  --radius-sm: 4px;
  --radius-md: 8px;
}`,
  tailwindConfigFormatted: `@theme {
  --color-canvas: #ffffff;
  --color-off-canvas: #f6f9fc;
  --color-slate-border: #e6ebf1;
  --color-navy-heading: #0a2540;
  --color-slate-body: #425466;
  --color-blurple: #635bff;
  --color-cyan-accent: #00d4ff;
}`,
  tokensJsonFormatted: JSON.stringify({
    color: {
      canvas: { value: "#ffffff" },
      offCanvas: { value: "#f6f9fc" },
      slateBorder: { value: "#e6ebf1" },
      navyHeading: { value: "#0a2540" },
      slateBody: { value: "#425466" },
      blurple: { value: "#635bff" },
      cyanAccent: { value: "#00d4ff" },
    },
  }, null, 2),
  styles: {
    colors: ["#ffffff", "#f6f9fc", "#e6ebf1", "#0a2540", "#425466", "#635bff", "#00d4ff"],
    fonts: ["Inter", "monospace"],
    cssVariables: { "--color-blurple": "#635bff", "--color-navy": "#0a2540" },
    tailwindClasses: ["bg-[#ffffff]", "text-[#0a2540]", "rounded-md", "border-[#e6ebf1]"],
    layoutPatterns: ["Clean white cards", "Tabular data grids", "Indigo buttons", "Subtle shadows"],
  },
  logic: {
    stateVariables: ["paymentStatus", "selectedMethod"],
    eventHandlers: ["handleSubmitPayment", "handleToggleCurrency"],
    interactiveElements: ["Payment form", "Tabular rows", "Checkout buttons"],
    apiEndpoints: ["https://api.stripe.com/v1/charges"],
    formActions: ["process_payment"],
  },
  modelPrompts: {
    cursor: "// .cursorrules for Stripe UI\nPrimary: #635bff (Blurple), Surface: #ffffff with #e6ebf1 borders, Radius: 8px.",
    claude: "Implement Stripe design language with #0a2540 navy text and #635bff action buttons.",
    gemini: "Follow Stripe corporate precision: tabular numbers, #635bff accents, 8px rounded corners.",
    chatgpt: "Design with Stripe fintech aesthetics: #ffffff surfaces, crisp borders, and reliable contrast.",
  },
};

export const APPLE_EXAMPLE_DESIGN_SYSTEM: DesignSystemData = {
  name: "apple_design",
  title: "Apple - Technology & Design Vitrine",
  description: "Minimalist vitrine aesthetic: deep blacks, pure whites, San Francisco typography, and fluid corner smoothing.",
  targetUrl: "https://apple.com",
  aestheticSummary: "Apple uses maximum contrast between pitch black (#000000) and optical gray surfaces (#f5f5f7), anchored by San Francisco type and electric Cupertino blue (#0071e3).",
  designMd: `# Apple - Minimalist Vitrine - Style Reference
> Extreme restraint, monolithic typography, and continuous corner curvature.

**Theme:** monochrome with Cupertino Blue accents

Apple interface design strips away all unnecessary ornament. Typography does 90% of the visual communication, with SF Pro Display commanding attention at large scale and SF Pro Text ensuring legible functional microcopy.

## Tokens - Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Pitch Canvas | \`#000000\` | \`--color-pitch-canvas\` | Dominant dark surface for pro products |
| Off Black | \`#1d1d1f\` | \`--color-off-black\` | High-contrast typography and subtle dark cards |
| Pure Vitrine | \`#ffffff\` | \`--color-pure-vitrine\` | Light background and hero canvas |
| Aluminum Tint | \`#f5f5f7\` | \`--color-aluminum\` | Alternating section fills and card surfaces |
| Hairline Slate | \`#d2d2d7\` | \`--color-hairline\` | Subtle dividing lines and borders |
| Cupertino Blue | \`#0071e3\` | \`--color-cupertino-blue\` | Primary CTA buttons, interactive links, selection rings |
`,
  skillMd: `# Apple Design System Reference`,
  componentCode: ``,
  semanticColors: [
    { role: "background", name: "Pitch Canvas", hex: "#000000", usage: "Pro product background" },
    { role: "surface", name: "Aluminum Tint", hex: "#f5f5f7", usage: "Light sections and cards" },
    { role: "border", name: "Hairline Slate", hex: "#d2d2d7", usage: "Subtle borders" },
    { role: "text", name: "Off Black", hex: "#1d1d1f", usage: "Display text" },
    { role: "primary", name: "Cupertino Blue", hex: "#0071e3", usage: "Buy buttons and links" },
  ],
  typographyScale: [
    { level: "caption", size: "12px", lineHeight: "1.33", weight: "400", sample: "Designed in California" },
    { level: "body", size: "14px", lineHeight: "1.42", weight: "400", sample: "Incredible speed and battery life." },
    { level: "body-lg", size: "17px", lineHeight: "1.47", weight: "400", sample: "Supercharged by Apple silicon." },
    { level: "heading-sm", size: "24px", lineHeight: "1.2", weight: "600", sample: "Pro camera system." },
    { level: "heading", size: "36px", lineHeight: "1.1", weight: "600", sample: "Titanium. So strong. So light." },
    { level: "display", size: "64px", lineHeight: "1.06", weight: "700", sample: "iPhone 16 Pro" },
  ],
  primaryFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
  headingFont: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
  monoFont: "SF Mono, Monaco, monospace",
  spacingScale: ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "80px"],
  radiiScale: ["18px", "24px", "30px", "9999px"],
  shadowScale: ["0 4px 20px rgba(0,0,0,0.08)"],
  cssVariablesFormatted: `:root {
  --color-canvas: #000000;
  --color-aluminum: #f5f5f7;
  --color-off-black: #1d1d1f;
  --color-blue: #0071e3;
  --radius-apple: 18px;
}`,
  tailwindConfigFormatted: `@theme {
  --color-pitch-canvas: #000000;
  --color-aluminum: #f5f5f7;
  --color-off-black: #1d1d1f;
  --color-cupertino-blue: #0071e3;
}`,
  tokensJsonFormatted: JSON.stringify({
    color: {
      pitchCanvas: { value: "#000000" },
      aluminum: { value: "#f5f5f7" },
      offBlack: { value: "#1d1d1f" },
      cupertinoBlue: { value: "#0071e3" },
    },
  }, null, 2),
  styles: {
    colors: ["#000000", "#1d1d1f", "#ffffff", "#f5f5f7", "#0071e3"],
    fonts: ["-apple-system", "SF Pro Display"],
    cssVariables: { "--color-blue": "#0071e3" },
    tailwindClasses: ["bg-black", "text-white", "rounded-full", "rounded-2xl"],
    layoutPatterns: ["Monolithic hero titles", "High-contrast product photography", "Blue pill CTAs"],
  },
  logic: {
    stateVariables: ["selectedFinish", "storageSize"],
    eventHandlers: ["handleSelectFinish", "handleAddToBag"],
    interactiveElements: ["Finish selector", "Pill CTA", "Navigation drawer"],
    apiEndpoints: [],
    formActions: [],
  },
  modelPrompts: {
    cursor: "// .cursorrules for Apple Vitrine\nColors: #000000, #f5f5f7, #0071e3 (Cupertino Blue). Pill buttons with 9999px radius.",
    claude: "Implement Apple's clean design with SF Pro typography, #0071e3 blue buttons, and smooth corner radius.",
    gemini: "Follow Apple design guidelines: high typographic hierarchy, continuous curves, and uncluttered whitespace.",
    chatgpt: "Design using Apple minimalist vitrine principles: deep contrast, #0071e3 CTAs, and large display headings.",
  },
};

export const EXAMPLE_SYSTEMS_MAP: Record<string, DesignSystemData> = {
  linear: LINEAR_EXAMPLE_DESIGN_SYSTEM,
  stripe: STRIPE_EXAMPLE_DESIGN_SYSTEM,
  apple: APPLE_EXAMPLE_DESIGN_SYSTEM,
  huly: LINEAR_EXAMPLE_DESIGN_SYSTEM,
};

export const SAMPLE_SYSTEMS_LIST: { id: string; name: string; url: string; tag: string; system: DesignSystemData }[] = [
  { id: "linear", name: "linear.app", url: "https://linear.app", tag: "Obsidian Canvas", system: LINEAR_EXAMPLE_DESIGN_SYSTEM },
  { id: "stripe", name: "stripe.com", url: "https://stripe.com", tag: "Fintech Clean", system: STRIPE_EXAMPLE_DESIGN_SYSTEM },
  { id: "apple", name: "apple.com", url: "https://apple.com", tag: "Minimalist Vitrine", system: APPLE_EXAMPLE_DESIGN_SYSTEM },
];
