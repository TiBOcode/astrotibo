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
  }
});