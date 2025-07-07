import Image from 'next/image';

import { getSiteDescription, kSiteName } from '@/lib/const';
import { createMetadata } from '@/lib/metadata';

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

export default function HomePage() {
  return (
    <main className="flex h-[calc(100dvh-2*56px)] flex-col items-center justify-center gap-4 p-4">
      <Image
        alt="ZenBox"
        className="w-[256px]"
        height={1024}
        src="/logo.png"
        width={1024}
      />
      <h1 className="font-bold text-4xl">ZenBox</h1>
      <p className="text-lg">
        ZenBox is a modern React state management library focused on simplicity
        and developer experience.
      </p>
    </main>
  );
}
