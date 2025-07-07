import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { icons } from 'lucide-react';
import { createElement } from 'react';

import { blogCollection, docs, pageCollection } from '@/.source';

import { i18n } from './i18n';

export const source = loader({
  i18n,
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
});

export const blog = loader({
  i18n,
  baseUrl: '/blog',
  source: createMDXSource(blogCollection, []),
});

export const pages = loader({
  i18n,
  baseUrl: '/page',
  source: createMDXSource(pageCollection, []),
});

export type Page = ReturnType<typeof source.getPages>[number];
