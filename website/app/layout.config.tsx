import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from 'lib/i18n';
import Image from 'next/image';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    i18n,
    themeSwitch: {
      enabled: true,
      mode: 'light-dark',
    },
    nav: {
      title: (
        <div className="flex items-center justify-center gap-2">
          <Image alt="logo" height={24} src={'/logo.png'} width={24} />
          <span className="font-medium [.uwu_&]:hidden [header_&]:text-[16px]">
            ZenBox
          </span>
        </div>
      ),
      url: `/${locale}`,
    },
    githubUrl: 'https://github.com/idootop/ZenBox',
    links: [
      {
        text: locale === 'cn' ? '文档' : 'Docs',
        url: `/${locale}/docs`,
        active: 'nested-url',
      },
      {
        text: locale === 'cn' ? '博客' : 'Blog',
        url: `/${locale}/blog`,
        active: 'nested-url',
      },
      {
        text: locale === 'cn' ? '资源' : 'Resources',
        url: `/${locale}/page/resources`,
        active: 'nested-url',
      },
    ],
  };
}
