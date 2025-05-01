import { z, defineCollection } from 'astro:content';

const screenplayCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    premise: z.string(),
    genre: z.array(z.string()),
    synopsis: z.string(),
  }),
});

export const collections = {
  screenplay: screenplayCollection,
};

