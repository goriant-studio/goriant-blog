# goriant-blog

Personal blog for **[goriant.com](https://goriant.com)** — an indie game dev journey. Built with Astro + Tailwind CSS.

## Stack

- **[Astro 5](https://astro.build)** — static site generator
- **Tailwind CSS v4** — styling via `@tailwindcss/vite`
- **MDX** — rich markdown with components
- **Bilingual** — content in both `/blog-en` (English) and `/blog-vi` (Vietnamese)
- **RSS + Sitemap** — auto-generated

## Project Structure

```
src/
├── components/       # Shared UI components
├── content/
│   ├── blog-en/      # English posts
│   └── blog-vi/      # Vietnamese posts
├── layouts/          # Page layouts
├── pages/
│   ├── en/           # English routes
│   └── vi/           # Vietnamese routes
├── i18n/             # Translations
└── consts.ts         # Site title & description
```

## Commands

| Command           | Action                              |
| :---------------- | :---------------------------------- |
| `npm install`     | Install dependencies                |
| `npm run dev`     | Dev server at `localhost:4321`      |
| `npm run build`   | Build to `./dist/`                  |
| `npm run preview` | Preview production build locally    |

## Post Frontmatter

```yaml
---
title: "My Post"
date: 2024-01-01
description: "Optional description"
game: "maze-escape"   # optional — links post to a game
tags: ["devlog"]      # optional
draft: false          # optional, defaults to false
heroImage: ./img.png  # optional
---
```
