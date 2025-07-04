import { createI18nMiddleware } from 'fumadocs-core/i18n';
import { i18n } from 'lib/i18n';

export default createI18nMiddleware(i18n);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|llms-full.txt|.*\\.svg|.*\\.png|.*\\.webp|.*\\.gif|.*\\.jpg|.*\\.jpeg).*)',
  ],
};
