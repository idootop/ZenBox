import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

import { blogCollection, docs } from '@/.source';

import { i18n } from './i18n';

export const source = loader({
  i18n,
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

export const blog = loader({
  i18n,
  baseUrl: '/blog',
  source: createMDXSource(blogCollection, []),
});
