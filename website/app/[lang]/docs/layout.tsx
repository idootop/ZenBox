import { baseOptions } from 'app/layout.config';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { source } from 'lib/source';
import type { ReactNode } from 'react';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <DocsLayout
      {...baseOptions(lang)}
      nav={{ ...baseOptions(lang).nav, mode: 'top' }}
      tree={source.pageTree[lang]}
    >
      {children}
    </DocsLayout>
  );
}
