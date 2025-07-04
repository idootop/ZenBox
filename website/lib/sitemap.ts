import type { Page } from 'fumadocs-core/source';
import type { MetadataRoute } from 'next';

import { kSiteURL } from '@/lib/const';
import { i18n } from '@/lib/i18n';

export function samePage(page1: Page, page2: Page) {
  return (
    page1.url.replace('/cn/', '/en/') === page2.url.replace('/cn/', '/en/')
  );
}

export function websiteURL(path: string): string {
  return new URL(path, kSiteURL).toString();
}

export default async function addSitemapEntries({
  getPages,
  sitemapEntries,
  changeFrequency,
  priority,
}: {
  getPages: (lang: string) => Page[];
  sitemapEntries: MetadataRoute.Sitemap;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: MetadataRoute.Sitemap[number]['priority'];
}): Promise<MetadataRoute.Sitemap> {
  for (const lang of i18n.languages) {
    const pages = getPages(lang);
    for (const page of pages) {
      const { lastModified } = page.data as any;
      const alternates: Record<string, string> = {};

      for (const altLang of i18n.languages) {
        const altPage = getPages(altLang).find((p) => samePage(p, page));
        if (altPage) {
          alternates[altLang] = websiteURL(altPage.url);
        }
      }

      if (Object.keys(alternates).length > 1) {
        alternates['x-default'] = websiteURL(
          getPages(i18n.defaultLanguage).find((p) => samePage(p, page))?.url ||
            page.url,
        );
      }

      sitemapEntries.push({
        lastModified,
        url: websiteURL(page.url),
        changeFrequency,
        priority,
        alternates:
          Object.keys(alternates).length > 1
            ? {
                languages: alternates,
              }
            : undefined,
      });
    }
  }

  return sitemapEntries;
}
