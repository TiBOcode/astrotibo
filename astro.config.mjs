import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from '@astrojs/vue';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';



export default defineConfig({
  output: 'static',
  integrations: [tailwind(), vue()],

  content: {
    collections: {
      notes: {
        schema: ({ z }) => z.object({
          title: z.string(),
          date: z.coerce.date().optional(),
          description: z.string().optional().default(''),
        })
      }
    }
  },

  markdown: {
    extendDefaultPlugins: true,
    
    rehypePlugins: [
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      }]
    ]
  }
});