# Astro Guidelines

## Page Structure
- **Bilingual Structure:** All pages must exist in `src/pages/en/` and `src/pages/vi/`. When creating a new page in English, you MUST create its Vietnamese counterpart (and vice-versa).
- **Layouts:** Use `src/layouts/Layout.astro` or specific layouts like `src/layouts/BlogPost.astro` to wrap page content. Do not recreate HTML wrapper markup in individual pages.

## Component Design
- **Reusability:** Common UI elements (buttons, cards, navigation) should be created in `src/components/`. 
- **Props:** Use TypeScript interfaces to define Astro component props (`Props`).

## Script Usage
- Minimize client-side JavaScript unless necessary. Use Astro's zero-JS-by-default approach. If you need JS, write it inside `<script>` tags in the Astro component or use UI frameworks sparingly.
