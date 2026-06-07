# Portfolio Website Spec — Nancy Ning

## Overview

A personal portfolio website for Nancy Ning. Its dual purpose is:
1. A living container for personal projects, experiments, and written work
2. A professional capability signal for potential hirers and collaborators

The site should feel clean, refined, and confident — content-forward with no visual clutter. The aesthetic reference is Claude's desktop UI: generous whitespace, muted neutrals, restrained typography, subtle motion. Light mode only (v1).

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Industry standard, excellent DX, built-in routing and image optimisation |
| Language | TypeScript | Type safety, better tooling, scales as codebase grows |
| Styling | Tailwind CSS | Utility-first, enforces consistency, minimal custom CSS |
| Content (Writing) | MDX | Write articles in Markdown, embed React components if needed |
| Animation | Framer Motion | Subtle, high-quality transitions without heavy overhead |
| UI Primitives | shadcn/ui | Accessible, unstyled-by-default components; code is owned, not abstracted away |
| Package Manager | pnpm | Faster than npm, cleaner node_modules |

No database required for v1. All content lives in the repository as `.mdx` files and typed config files.

---

## Site Architecture

### Pages

```
/               → About
/work           → Work
/writing        → Writing (index)
/writing/[slug] → Individual article
/now            → Now
```

### Navigation

- Fixed top navigation bar, full width
- Left: "Nancy Ning" wordmark (links to `/`)
- Right: navigation links — `Work · Writing · Now`
- On mobile: hamburger menu or a bottom navigation bar
- Active page indicated by a subtle underline or weight change on the nav link
- No dropdown menus in v1

---

## Design System

### Colour Palette

```
Background:      #FAFAF9   (warm off-white, not pure white)
Surface:         #FFFFFF   (cards, elevated elements)
Border:          #E8E5E0   (subtle dividers)
Text primary:    #1A1917   (near-black, warm undertone)
Text secondary:  #6B6560   (muted, for metadata and labels)
Text tertiary:   #A8A29E   (placeholders, disabled states)
Accent:          #2563EB   (a confident blue — used sparingly: links, hover states, active indicators)
Accent hover:    #1D4ED8
```

No gradients, no decorative colour blocks. Colour is used functionally, not decoratively.

### Typography

- **Display / Headings**: `Playfair Display` — a refined serif that signals editorial confidence without being stiff. Used for page titles and hero text only.
- **Body / UI**: `DM Sans` — a geometric humanist sans-serif. Clean, modern, highly readable at small sizes. Used for all body copy, navigation, labels, and metadata.
- **Monospace** (code blocks in articles): `JetBrains Mono`

Load all three from Google Fonts or via `next/font`.

Type scale (approximate, Tailwind classes):
```
Hero title:       text-5xl / text-6xl, font-display, tracking-tight
Section heading:  text-3xl / text-4xl, font-display
Sub-heading:      text-xl, font-sans, font-medium
Body:             text-base, font-sans, leading-relaxed
Metadata/label:   text-sm, font-sans, text-secondary
```

### Spacing

- Base unit: 4px (Tailwind default)
- Section vertical padding: `py-24` (96px) on desktop, `py-16` on mobile
- Max content width: `max-w-3xl` for reading content, `max-w-5xl` for wider layouts (project grid)
- Centre all content with `mx-auto px-6`

### Motion

All animations should be subtle and purposeful — nothing that draws attention to itself.

- **Page load**: Staggered fade-up on the hero section (opacity 0→1, translateY 12px→0, duration 500ms, ease-out)
- **Page transitions**: Fade in/out between routes (Framer Motion `AnimatePresence`)
- **Cards on hover**: Slight `translateY(-2px)` with a box-shadow lift, transition 200ms
- **Nav links**: Underline slides in from left on hover
- No parallax, no scroll-triggered animations in v1

### Reusable Components

| Component | Description |
|---|---|
| `<PageHeader>` | Page title + optional subtitle, used at top of each page |
| `<Card>` | Surface-coloured container with border and hover lift |
| `<Tag>` | Small pill label for categories/technologies |
| `<Button>` | Primary (filled accent) and Ghost (outlined) variants |
| `<Divider>` | Thin horizontal rule using border colour |
| `<EmptyState>` | Friendly placeholder for sections with no content yet |

---

## Pages — Detailed Spec

---

### `/` — About

**Purpose**: The human introduction. Nancy as a person — her background, how she thinks, where she's headed.

**Layout**:

```
[Hero]
  Large greeting: "Hi, I'm Nancy Ning."
  Two-line positioning statement (e.g. role, interests, disposition)
  Two CTAs: [Download CV]  [Read my writing →]

[Divider]

[Path]
  Section heading: "How I got here"
  Visual timeline of education and career milestones
  Each milestone: year · institution/company · role/degree · 1-line description
  Displayed as a vertical timeline component

[Divider]

[Now Teaser]
  Section heading: "What I'm up to"
  2–3 sentence excerpt from the /now page
  Link: "See full update →"
```

**Notes**:
- The CV download should link to a PDF stored in `/public/cv/nancy-ning-cv.pdf`. This file can be replaced without any code change.
- The positioning statement is the most important copy on the site — it should reflect Nancy's actual voice, not generic language.
- Keep the About page relatively short. It should make someone want to explore further, not tell them everything.

---

### `/work` — Work

**Purpose**: A showcase of projects, experiments, and builds. Signals technical and creative capability.

**Layout**:

```
[PageHeader]
  Title: "Work"
  Subtitle: "Projects, experiments, and things I've built."

[Project Grid]
  2-column grid on desktop, 1-column on mobile
  Each card contains:
    - Project title
    - Short description (2 sentences max)
    - Tags (technologies or themes, e.g. "Python · Data" or "Writing · Research")
    - Status badge: "Live" / "In Progress" / "Archived"
    - Link(s): [View →] and/or [GitHub →] (optional)

[EmptyState — shown when no projects exist]
  Friendly message, e.g.:
  "Nothing here yet — but this space is intentional.
   Building in public, starting soon."
```

**Data source**: A typed config file at `src/content/work.ts` that exports an array of project objects. Adding a new project = adding one object to that array. No CMS needed.

```typescript
// Example shape
type Project = {
  title: string
  description: string
  tags: string[]
  status: 'live' | 'in-progress' | 'archived'
  href?: string
  githubHref?: string
  featured?: boolean
}
```

**Notes**:
- The `featured` flag can be used later to pin certain projects to the top.
- The EmptyState should be included from day one — it's more honest and intentional than a hidden section.

---

### `/writing` — Writing (Index)

**Purpose**: An index of Nancy's articles, notes, and longer-form thoughts.

**Layout**:

```
[PageHeader]
  Title: "Writing"
  Subtitle: "Thoughts on things I'm learning and thinking through."

[Article List]
  Single-column list, sorted by date descending
  Each item:
    - Article title (large, links to article)
    - Date (formatted: "June 2025")
    - 1-sentence excerpt or description
    - Tags (optional, e.g. "Philosophy · Systems Thinking")
  Items separated by a thin Divider
```

**Notes**:
- Articles are `.mdx` files stored in `src/content/writing/`.
- Frontmatter per article:
  ```
  ---
  title: "Everything Are Linked Together"
  date: "2025-06-01"
  excerpt: "A short description of the piece."
  tags: ["Philosophy", "Systems Thinking"]
  ---
  ```
- Sorting, filtering, and reading of MDX files is handled server-side via Next.js.

---

### `/writing/[slug]` — Individual Article

**Purpose**: Render a single MDX article with a clean reading experience.

**Layout**:

```
[Article Header]
  Title (display font, large)
  Date · Estimated reading time
  Tags

[Article Body]
  Prose-optimised layout: max-w-2xl, generous line-height
  Tailwind Typography plugin (`@tailwindcss/typography`) for MDX rendering
  Code blocks styled with JetBrains Mono

[Footer]
  Thin divider
  "← Back to Writing"
  Optional: previous / next article links
```

**Notes**:
- Reading time is calculated automatically from word count (~200 wpm).
- The article slug is derived from the MDX filename (e.g. `everything-are-linked-together.mdx` → `/writing/everything-are-linked-together`).

---

### `/now` — Now

**Purpose**: A short, regularly-updated snapshot of what Nancy is currently working on, reading, and thinking about. Keeps the site alive and gives repeat visitors something new.

**Layout**:

```
[PageHeader]
  Title: "Now"
  Subtitle: "Last updated: [Month Year]"

[Now Content]
  3–5 short sections, each with:
    - A small heading (e.g. "Working on", "Reading", "Thinking about", "Learning")
    - 2–4 sentences of free-form text

[Footer note]
  Small italic note: "This is a /now page — a concept by Derek Sivers."
  Link to nownownow.com
```

**Data source**: A single MDX file at `src/content/now.mdx`. Updating this page = editing one file and pushing to git. No code changes needed.

---

## File Structure

```
nancy-ning-portfolio/
├── public/
│   └── cv/
│       └── nancy-ning-cv.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: nav, footer, fonts
│   │   ├── page.tsx            # About page
│   │   ├── work/
│   │   │   └── page.tsx
│   │   ├── writing/
│   │   │   ├── page.tsx        # Writing index
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Individual article
│   │   └── now/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   └── Footer.tsx
│   │   ├── about/
│   │   │   └── Timeline.tsx
│   │   ├── work/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectGrid.tsx
│   │   └── writing/
│   │       ├── ArticleList.tsx
│   │       └── ArticleItem.tsx
│   ├── content/
│   │   ├── work.ts             # Project data array
│   │   ├── now.mdx             # Now page content
│   │   └── writing/
│   │       └── *.mdx           # One file per article
│   └── lib/
│       ├── mdx.ts              # MDX reading and parsing utilities
│       └── utils.ts            # Shared helpers (e.g. reading time, date formatting)
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Footer

Minimal. Full-width, bottom of every page.

```
© 2025 Nancy Ning  ·  [GitHub]  [LinkedIn]  [Email]
```

Icons for GitHub/LinkedIn (from `lucide-react`). Email links to `mailto:`. Social links TBD — leave as placeholder strings in a `src/lib/config.ts` site config file.

---

## Site Config

A single file `src/lib/config.ts` holds all global constants. The coding agent should stub all fields and Nancy fills them in:

```typescript
export const siteConfig = {
  name: "Nancy Ning",
  tagline: "I sit at the intersection of AI, data, and insurance business — translating between what technology can do and what the business actually needs.",                    // Fill in: 1-line positioning statement
  email: "ningnancy0131@gmail.com",                      // Fill in
  github: "https://github.com/Nancyjane131",                     // Fill in: full URL
  linkedin: "https://www.linkedin.com/in/nancy-ning-989b8b211/",                   // Fill in: full URL
  cvPath: "nancy-cv.pdf",
}
```

---

## v1 Scope — Explicit Exclusions

The following are intentionally out of scope for v1 to keep the build focused:

- Dark mode toggle
- Search or filtering on the Writing index
- Comments or any interactive reader features
- A dedicated Finance / Learning section (content goes in Writing with tags for now)
- RSS feed
- Analytics (add later — Vercel Analytics or Plausible)
- Contact form (email link is sufficient)
- Internationalization

---

## Acceptance Criteria

The build is complete when:

- [ ] All four pages render correctly on desktop and mobile
- [ ] Navigation works between all pages; active state is shown
- [ ] The `EmptyState` renders on `/work` (no projects yet)
- [ ] At least one sample `.mdx` article is included and renders correctly on `/writing/[slug]`
- [ ] The `/now` page renders from `now.mdx`
- [ ] CV download link works (PDF can be a placeholder)
- [ ] `siteConfig` is wired up site-wide (name in nav, footer links, etc.)
- [ ] Framer Motion page transitions work between routes
- [ ] Hover states and card animations work
- [ ] Google Fonts (Playfair Display, DM Sans, JetBrains Mono) load correctly
- [ ] No TypeScript errors (`pnpm tsc --noEmit` passes)
- [ ] Site runs cleanly on `localhost:3000` via `pnpm dev`
