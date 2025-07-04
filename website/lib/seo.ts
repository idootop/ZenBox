import { i18n } from './i18n';

export const LANGUAGE_MAP = {
  en: {
    locale: 'en-US',
    ogLocale: 'en_US',
    htmlLang: 'en',
    name: 'English',
    direction: 'ltr',
  },
  cn: {
    locale: 'zh-CN',
    ogLocale: 'zh_CN',
    htmlLang: 'zh-CN',
    name: '简体中文',
    direction: 'ltr',
  },
} as const;

export function getLanguageConfig(lang: string) {
  return (
    LANGUAGE_MAP[lang as keyof typeof LANGUAGE_MAP] ||
    LANGUAGE_MAP[i18n.defaultLanguage as keyof typeof LANGUAGE_MAP]
  );
}

export const SEO_KEYWORDS = {
  en: [
    'vue',
    'react',
    'zustand',
    'state management',
    'react state management',
    'react hooks',
    'typescript',
    'javascript',
    'frontend',
  ],
  cn: [
    'vue',
    'react',
    'zustand',
    '状态管理',
    'React 状态管理',
    'react hooks',
    'typescript',
    'javascript',
    '前端开发',
  ],
};

export function getSEOKeywords(lang: string): string[] {
  return (
    SEO_KEYWORDS[lang as keyof typeof SEO_KEYWORDS] ||
    SEO_KEYWORDS[i18n.defaultLanguage as keyof typeof SEO_KEYWORDS]
  );
}
