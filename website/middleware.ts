import { createI18nMiddleware } from 'fumadocs-core/i18n';
import { i18n } from 'lib/i18n';

export default createI18nMiddleware(i18n);

export const config = {
  matcher: [
    '/((?!llms.txt|llms-full.txt|api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.webp|.*\\.gif|.*\\.jpg|.*\\.jpeg).*)',
  ],
};
