// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: 'https://goriant.com',
	integrations: [mdx(), sitemap()],
	vite: {
    	plugins: [tailwindcss()],
  	},
	server: {
    	headers: {
      		"Cross-Origin-Opener-Policy": "same-origin",
      		"Cross-Origin-Embedder-Policy": "require-corp",
    	},
  	},
});
