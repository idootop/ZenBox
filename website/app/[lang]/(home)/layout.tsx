import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

import { baseOptions } from '@/app/layout.config';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <HomeLayout {...baseOptions(lang)}>
      {children}
      <footer className="flex h-[56px] flex-col items-center justify-center gap-4 p-4">
        <p className="text-gray-500 text-sm">
          Made with <span className="heart">❤️</span> by{' '}
          <a
            className="hover:underline"
            href="https://del.wang"
            rel="noopener noreferrer"
            target="_blank"
          >
            Del Wang
          </a>
        </p>
      </footer>
    </HomeLayout>
  );
}
