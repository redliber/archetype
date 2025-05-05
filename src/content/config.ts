import { z, defineCollection } from 'astro:content';

const screenplayCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    premise: z.string(),
    cover: z.string(),
    genre: z.array(z.string()),
    synopsis: z.string(),
    characters: z.string(),
    strength: z.string(),
    colors: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
      complementary: z.string(),
      neutral: z.string(),
    })
  }),
});

const affiliationCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    screenplay: z.array(z.string()),
  }),
});

export const collections = {
  screenplay: screenplayCollection,
  affiliation: affiliationCollection
};
