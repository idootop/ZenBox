import { createMetadataImage } from 'fumadocs-core/server';
import { source } from 'lib/source';

export const metadataImage = createMetadataImage({
  source,
});

import type { Metadata } from 'next/types';

import { getSiteDescription, kSiteName, kTitter, kWebsite } from './const';

export function createMetadata(
  options: Metadata & {
    images?: string;
    slug?: string[];
    lang?: string;
  },
): Metadata {
  const { images = '/banner.jpg', slug: _slug, lang, ...override } = options;

  let title = override.title ?? kSiteName;
  if (title !== kSiteName) {
    title = `${title} | ${kSiteName}`;
  }

  const description = override.description ?? getSiteDescription(lang);
  return {
    ...override,
    metadataBase: new URL(kWebsite),
    openGraph: {
      title,
      description,
      images,
      url: kWebsite,
      siteName: kSiteName,
      ...override.openGraph,
    },
    twitter: {
      title,
      description,
      images,
      card: 'summary_large_image',
      creator: kTitter,
      ...override.twitter,
    },
  };
}
