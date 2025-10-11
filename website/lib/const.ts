export const kSiteName = 'ZenBox';

export const kSiteURL = 'https://zenbox.del.wang';

export const kGithub = 'https://github.com/idootop/ZenBox';

export const kTitter = '@del_wang_404';

export function getSiteDescription(lang: string = 'en') {
  return lang === 'cn'
    ? '像 Vue 一样写 React'
    : 'React state management that feels like Vue vibes in React';
}
