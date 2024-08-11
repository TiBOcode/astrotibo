import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
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