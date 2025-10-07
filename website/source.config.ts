import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const blogCollection = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    title: z.string(),
    description: z.string(),
    date: z.string().date().or(z.date()),
  }),
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

export const pageCollection = defineCollections({
  type: 'doc',
  dir: 'content/page',
  schema: frontmatterSchema.extend({
    title: z.string(),
    description: z.string(),
  }),
});

export default defineConfig({
  lastModifiedTime: 'git',
});
