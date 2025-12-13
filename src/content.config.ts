import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* --------------------------------------------------
 * Shared schema pieces
 * -------------------------------------------------- */
const baseBlogSchema = ({ image }: { image: any }) =>
  z.object({
    title: z.string(),
    description: z.string().optional(),

    // ngày publish (bắt buộc)
    date: z.coerce.date(),

    // ngày update (optional)
    updatedDate: z.coerce.date().optional(),

    // gắn bài viết với game (rất quan trọng)
    // ví dụ: "maze-escape"
    game: z.string().optional(),

    // tag tự do
    tags: z.array(z.string()).optional().default([]),

    // nháp
    draft: z.boolean().optional().default(false),

    // hero image nếu cần
    heroImage: image().optional(),
  });

/* --------------------------------------------------
 * Blog (legacy / global) – nếu bạn còn dùng
 * -------------------------------------------------- */
const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.{md,mdx}",
  }),
  schema: baseBlogSchema,
});

/* --------------------------------------------------
 * Blog tiếng Việt (primary)
 * -------------------------------------------------- */
const blogVi = defineCollection({
  loader: glob({
    base: "./src/content/blog-vi",
    pattern: "**/*.{md,mdx}",
  }),
  schema: baseBlogSchema,
});

/* --------------------------------------------------
 * (Optional – future) Blog tiếng Anh
 * -------------------------------------------------- */
// const blogEn = defineCollection({
//   loader: glob({
//     base: "./src/content/blog-en",
//     pattern: "**/*.{md,mdx}",
//   }),
//   schema: baseBlogSchema,
// });

/* --------------------------------------------------
 * Export collections
 * -------------------------------------------------- */
export const collections = {
  blog,     // có thể xoá sau nếu không dùng
  "blog-vi": blogVi,
  // "blog-en": blogEn,
};
