export const kSiteName = 'ZenBox';

export const kSiteURL = 'https://zenbox.del.wang';

export const kGithub = 'https://github.com/idootop/ZenBox';

export const kTitter = '@del_wang_404';

export function getSiteDescription(lang: string = 'en') {
  return lang === 'cn'
    ? '像 Vue 一样写 React 💚，像 Zustand 一样管理状态 🐻'
    : 'Code React like Vue 💚, manage state like Zustand 🐻';
}
