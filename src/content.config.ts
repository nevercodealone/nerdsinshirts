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
  highlightHref: z.string().optional(),
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
  logoCta: z
    .object({ label: z.string(), href: z.string(), icon: z.string().optional() })
    .optional(),
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

const agenticCodingNews = defineCollection({
  loader: glob({
    base: './src/content/agentic-coding-news',
    pattern: ['*.md', '!_*.md'],
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z
          .string()
          .max(70)
          .refine((value) => !value.includes(':'), {
            message: 'title must not contain ":" (headlines are sentences)',
          }),
        description: z.string().min(80).max(160),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        author: z.enum(['roland-golla', 'benjamin-klein']),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(true),
        workshop: z.enum(['developer', 'alle-abteilungen']).default('developer'),
        image: image().optional(),
        imageAlt: z.string().optional(),
        tldr: z.string().min(40),
        quoteText: z.string().max(200),
        quoteAuthor: z.string(),
        quoteRole: z.string().optional(),
        quoteUrl: z.url(),
        faq: z
          .array(z.object({ question: z.string(), answer: z.string() }))
          .min(5),
        sources: z
          .array(
            z.object({
              title: z.string(),
              url: z.url(),
              publisher: z.string().optional(),
            })
          )
          .min(1),
      })
      .refine((data) => !data.image || Boolean(data.imageAlt), {
        message: 'imageAlt is required when image is set',
        path: ['imageAlt'],
      }),
});

export const collections = { pages, agenticCodingNews };