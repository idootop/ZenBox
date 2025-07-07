import { getSiteDescription, kSiteName } from '@/lib/const';
import { createMetadata } from '@/lib/metadata';

import { HomePage } from './home';

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang } = await props.params;
  return createMetadata({
    lang,
    slug: [],
    title: kSiteName,
    description: getSiteDescription(lang),
    openGraph: {
      type: 'website',
      images: [
        {
          url: '/banners/default.png',
          width: 1200,
          height: 630,
          alt: kSiteName,
        },
      ],
    },
    other: {
      'application-name': kSiteName,
      'apple-mobile-web-app-title': kSiteName,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#000000',
      'msapplication-tap-highlight': 'no',
      'theme-color': '#000000',
    },
  });
}

export default async function Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  return <HomePage lang={lang} />;
}
