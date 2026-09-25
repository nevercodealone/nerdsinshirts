import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  variant: z.enum(['primary', 'secondary']).default('primary'),
});

const statusBarSchema = z.object({
  type: z.literal('statusBar'),
  text: z.string(),
  separator: z.string().default('|'),
  highlight: z.string(),
});

const heroSchema = z.object({
  type: z.literal('hero'),
  eyebrow: z.string(),
  badge: z.string(),
  logo: z.string().optional(),
  avatar: z.string().optional(),
  headline: z.string(),
  headlineAccent: z.string(),
  description: z.string(),
  cta: z.array(ctaSchema),
});

const socialLinksSchema = z.object({
  type: z.literal('socialLinks'),
  title: z.string(),
  links: z.array(
    z.object({
      icon: z.string(),
      label: z.string(),
      handle: z.string(),
      href: z.string(),
    })
  ),
});

const blockSchema = z.discriminatedUnion('type', [
  statusBarSchema,
  heroSchema,
  socialLinksSchema,
]);

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seo: z
      .object({
        description: z.string().optional(),
        image: z.string().optional(),
      })
      .optional(),
    blocks: z.array(blockSchema),
  }),
});

export const collections = { pages };