# Tailwind Styling

## Dark Mode
- **Class Strategy:** The project uses Tailwind's `class` strategy for dark mode.
- **Default Prefix:** Ensure you always define dark mode variants where colors change. Use the `dark:` prefix constraint (e.g., `bg-white dark:bg-dark-bg`, `text-slate-900 dark:text-zinc-200`).
- **Backgrounds:** Use the custom `bg-dark-bg` class for the main dark background.

## Formatting & Conventions
- **Utility Classes:** Prefer inline utility classes over custom CSS where possible to keep styles component-scoped.
- **Responsiveness:** Use standard Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`) for responsive adjustments. Design mobile-first (base classes apply to mobile, prefix classes apply to larger screens).
