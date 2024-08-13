// File: src/content/config.ts
import { z, defineCollection } from 'astro:content';

const notesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    description: z.preprocess(
      // This preprocessor converts null to an empty string
      (value) => value === null ? '' : value,
      // Then we use z.string().optional() to allow either a string or undefined
      z.string().optional()
    ),
    // You can remove these if you don't need them anymore
  }),
});

export const collections = {
  'notes': notesCollection,
};