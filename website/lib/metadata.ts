import { createMetadataImage } from 'fumadocs-core/server';
import { source } from 'lib/source';

export const metadataImage = createMetadataImage({
  source,
});

import type { Metadata } from 'next/types';

import { getSiteDescription, kSiteName, kSiteURL, kTitter } from './const';
import { i18n } from './i18n';
import { getLanguageConfig, getSEOKeywords } from './seo';

export function createMetadata(
  options: Metadata & { slug: string[]; lang: string; images?: string },
): Metadata {
  const {
    slug,
    lang = i18n.defaultLanguage,
    images = '/banner.jpg',
    ...override
  } = options;

  let title = override.title ?? kSiteName;
  if (title !== kSiteName) {
    title = `${title} | ${kSiteName}`;
  }

  const description = override.description ?? getSiteDescription(lang);

  const currentUrl = new URL(
    `/${lang}${slug ? `/${slug.join('/')}` : ''}`,
    kSiteURL,
  ).toString();

  const alternates: Record<string, string> = {};
  for (const altLang of i18n.languages) {
    const altUrl = new URL(
      `/${altLang}${slug ? `/${slug.join('/')}` : ''}`,
      kSiteURL,
    ).toString();
    alternates[altLang] = altUrl;
  }

  const langConfig = getLanguageConfig(lang);
  const keywords = getSEOKeywords(lang);
  const alternateLocales = i18n.languages
    .filter((l) => l !== lang)
    .map((l) => getLanguageConfig(l).ogLocale);

  return {
    ...override,
    metadataBase: new URL(kSiteURL),
    keywords: keywords.join(', '),
    alternates: {
      canonical: currentUrl,
      languages: alternates,
      ...override.alternates,
    },
    openGraph: {
      title,
      description,
      images,
      url: currentUrl,
      siteName: kSiteName,
      locale: langConfig.ogLocale,
      alternateLocale: alternateLocales,
      type: 'website',
      ...override.openGraph,
    },
    twitter: {
      title,
      description,
      images,
      card: 'summary_large_image',
      site: kTitter,
      creator: kTitter,
      ...override.twitter,
    },
    robots: override.robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
