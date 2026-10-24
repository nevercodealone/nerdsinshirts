// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';
import { workshopAdPlugin } from './src/lib/workshop-inline-ad.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://nerdsinshirts.de',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [workshopAdPlugin] }),
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
