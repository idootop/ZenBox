import { RootProvider } from 'fumadocs-ui/provider';
import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

import { getLanguageConfig } from '@/lib/seo';
import './global.css';

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const mono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;

  return (
    <html
      className={`${geist.variable} ${mono.variable}`}
      lang={getLanguageConfig(lang).htmlLang}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider
          i18n={{
            locale: lang,
            locales: [
              {
                name: 'English',
                locale: 'en',
              },
              {
                name: '简体中文',
                locale: 'cn',
              },
            ],
            translations: {
              cn: {
                search: '搜索',
                searchNoResult: '没有结果',
                toc: '目录',
                tocNoHeadings: '暂无目录',
                lastUpdate: '最后更新于',
                chooseLanguage: '选择语言',
                previousPage: '上一页',
                nextPage: '下一页',
                chooseTheme: '选择主题',
                editOnGithub: '在 GitHub 上编辑',
              },
            }[lang],
          }}
          theme={{
            defaultTheme: 'dark',
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
