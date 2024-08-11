import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from '@astrojs/vue';

export default defineConfig({
  output: 'static',
  integrations: [tailwind(), vue()],
 
  content: {
    collections: {
      notes: {
        type: 'content',
        schema: ({ z }) => z.object({
          title: z.string(),
          description: z.string().optional(),
        })
      }
    }
  },
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [
      ['rehype-external-links', {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
        content: { type: 'text', value: ' 🔗' }
      }]
    ]
  }
});