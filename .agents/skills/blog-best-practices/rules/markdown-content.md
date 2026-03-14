# Markdown Content & i18n

## Content Directories
- English blog posts belong in `src/content/blog-en/`.
- Vietnamese blog posts belong in `src/content/blog-vi/`.

## Authoring Posts
- **File Naming:** Use kebab-case for filenames (`e.g., my-new-post.md`). Maintain the same filename across both `en` and `vi` directories to represent the same article.
- **Frontmatter:** Every `.md` post must contain YAML frontmatter with at least `title`, `description`, `pubDate`, and potentially `heroImage`.
- **Assets:** Reference public assets like images from the root `/images/` path or local relative paths depending on the collection config.

## Translation Requirements
- Always provide natural, readable translations from English to Vietnamese (or vice-versa).
- Do not use machine-stubbed text without context. Preserve Markdown formatting (bold, italic, links, lists) exactly across translations.
