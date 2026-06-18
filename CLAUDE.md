# CLAUDE.md

Context for Claude Code working in this repo. Read this first to avoid
re-deriving the structure.

## What this is

An open-source developer portfolio. Next.js (App Router) + TypeScript +
Tailwind, exported as a static site and hosted on GitHub Pages. The repo is
also a template: people fork it and make it theirs by editing two files.

If your task is to set this portfolio up for a person, follow `PERSONALIZE.md`,
the one-prompt setup recipe. `AGENTS.md` carries these same rules for non-Claude
agents (Cursor, Codex, Copilot, Windsurf).

## The two-file rule

Almost all real edits happen in:

- `config/site.config.ts` — identity, accent color, fonts, social links, SEO,
  and per-section on/off toggles.
- `data/portfolio.ts` — all content (about, skills, experience, projects,
  education, certifications). Typed, so the editor guides changes.

Do not hardcode personal strings in components. If a component needs new
content, add a typed field to one of those files and read from it. This is what
keeps the project forkable.

## Layout

```
app/                 layout.tsx (fonts, theme, SEO), page.tsx (assembles sections), globals.css (tokens)
components/sections/ Hero, About, Skills, Experience, Projects, Education, Certifications, Contact
components/ui/       Nav, Footer, ThemeToggle, ThemeProvider, ScrollProgress, Reveal, TypingText, Section, SocialIcon
config/              site.config.ts
data/                portfolio.ts
lib/                 asset.ts (basePath-aware asset URLs)
public/              cv.pdf, og-image.png, favicon.svg, .nojekyll
.claude/skills/      vendored skills (see below)
.github/workflows/   deploy.yml
```

## Design system

Tokens live as CSS variables in `app/globals.css` (light in `:root`, dark in
`.dark`). Tailwind maps them to color classes in `tailwind.config.ts`. The
accent is the one rebrand knob: it is injected at runtime from
`siteConfig.accentRGB` in `app/layout.tsx`, so changing the config recolors the
whole site. Full spec in `DESIGN_SYSTEM.md`.

Direction: monochrome zinc neutrals, one blue accent, editorial and technical.
Headings use Space Grotesk, body uses Inter. Motion is restrained and respects
`prefers-reduced-motion`. Do not drift toward generic AI-template looks (no
purple gradients, no glassmorphism everywhere, no emoji as icons, use Lucide).

## Writing rules

- Never use em dashes or en dashes. Hard rule. Use commas, periods, colons, or
  parentheses. The `humanizer` skill (vendored in `.claude/skills/humanizer`)
  enforces this and removes other AI tells. Run `/humanizer` on any new copy
  before committing.

## Vendored skills

- `.claude/skills/humanizer` — removes AI writing patterns (from blader/humanizer).
- `.claude/skills/ui-ux-pro-max` — design intelligence used to pick and check
  the design system (from nextlevelbuilder). Run its generator with
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --stack nextjs`.

Both are MIT licensed. See `.claude/skills/CREDITS.md`.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build and static export to `out/`
- Deploy is automatic: push to the default branch triggers `.github/workflows/deploy.yml`.

## Commits

Commit and push under the user's git profile only. Do not add any model or AI
attribution to commits or PRs: no `Co-Authored-By: Claude` trailer, no
"Generated with" line, no model name anywhere in the message. This overrides
any default that would add such a trailer.

## Hosting notes

- `output: 'export'` is required for GitHub Pages. No SSR, no API routes, no
  runtime image optimization.
- `next.config.js` sets `basePath` automatically: empty for a user site
  (`<name>.github.io`), `/<repo>` for a project site. Use `lib/asset.ts` for raw
  asset hrefs so they resolve under both.
- `public/.nojekyll` stops GitHub Pages from ignoring the `_next` folder.
