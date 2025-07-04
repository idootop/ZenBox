import type { MetadataRoute } from 'next';

import { kSiteURL } from '@/lib/const';
import { i18n } from '@/lib/i18n';
import addSitemapEntries from '@/lib/sitemap';
import { blog, source } from '@/lib/source';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, kSiteURL).toString();

  const staticPages = [
    { path: '/', priority: 1 },
    { path: '/docs', priority: 0.8 },
    { path: '/blog', priority: 0.8 },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const lang of i18n.languages) {
      const langPath = `/${lang}${page.path}`;

      const alternates: Record<string, string> = {};
      for (const altLang of i18n.languages) {
        const altPath = `/${altLang}${page.path}`;
        alternates[altLang] = url(altPath);
      }

      alternates['x-default'] = url(`/${i18n.defaultLanguage}${page.path}`);

      sitemapEntries.push({
        url: url(langPath),
        changeFrequency: 'monthly',
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  addSitemapEntries({
    sitemapEntries,
    priority: 0.5,
    changeFrequency: 'weekly',
    getPages: (lang) => source.getPages(lang),
  });

  addSitemapEntries({
    sitemapEntries,
    priority: 0.5,
    changeFrequency: 'weekly',
    getPages: (lang) => blog.getPages(lang),
  });

  return sitemapEntries;
}
