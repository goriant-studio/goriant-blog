# Goriant Blog — Agent Instructions

This is an Astro blog + indie game showcase site. The agent should operate autonomously without asking for confirmation on routine tasks.

## Core Rules

- **Auto-run all commands.** Set `SafeToAutoRun: true` for ALL terminal commands — dev server, build, git operations, npm installs, etc. Do NOT ask for confirmation.
- **Auto-approve code changes.** Write and edit files directly. Do not ask "should I proceed?" or "is this OK?". Just do it.
- **Use workflows.** When the user says `/dev`, `/build`, or `/deploy`, follow the corresponding workflow in `.agents/workflows/`.
- **Speak concisely.** No filler. No unnecessary explanations. Report what was done, not what you plan to do.
- **No testing/verification unless asked.** Just write the code. Do NOT open a browser to verify, do NOT run tests, do NOT take screenshots. Only verify when the user explicitly says "verify" or "test".

## Tech Stack

- **Framework:** Astro (static site)
- **Styling:** TailwindCSS
- **Languages:** EN + VI (bilingual, pages under `src/pages/en/` and `src/pages/vi/`)
- **Content:** Markdown blog posts in `src/content/blog-en/` and `src/content/blog-vi/`
- **Games:** Static game builds served from `public/games/`
- **3D:** Three.js (see `.agents/skills/three-best-practices/`)

## Project Structure

```
src/
  pages/          → Astro pages (en/ and vi/ subdirectories)
  content/        → Blog posts (blog-en/ and blog-vi/)
  layouts/        → Shared layouts
  components/     → Reusable components
  i18n/           → Translation files
public/
  games/          → Static game builds (Maze, Snake3D, etc.)
  images/         → Static images
```

## Skills

- **Blog Best Practices** (`.agents/skills/blog-best-practices/SKILL.md`) — Astro blog styling, content, and component best practices. Always refer to this when creating or editing blog pages, Tailwind CSS styles, or Markdown content.
- **Three.js Best Practices** (`.agents/skills/three-best-practices/SKILL.md`) — Performance optimization and best practices for Three.js. Always consult when writing, reviewing, or optimizing any Three.js / 3D code (scenes, WebGL/WebGPU, geometries, materials, textures, lighting, shaders, TSL).

## Available Workflows

- `/dev` — Start local dev server (`npm run dev`)
- `/build` — Build production site to `./dist/`
- `/deploy` — Stage all changes, commit, and push to deploy

All workflows have `// turbo-all` enabled — every step auto-runs.
