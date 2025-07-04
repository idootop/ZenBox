export const kSiteName = 'ZenBox';

export const kSiteURL = 'https://zenbox.del.wang';

export const kGithub = 'https://github.com/idootop/ZenBox';

export const kTitter = '@del_wang_404';

export function getSiteDescription(lang: string = 'en') {
  return lang === 'cn'
    ? 'ZenBox 是一个现代的 React 状态管理库，专注于简单性和开发者体验。'
    : 'ZenBox is a modern React state management library focused on simplicity and developer experience.';
}
