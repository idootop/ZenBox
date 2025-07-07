import { createI18nMiddleware } from 'fumadocs-core/i18n';
import { i18n } from 'lib/i18n';
import type { NextFetchEvent, NextRequest } from 'next/server';

const i18nMiddleware = createI18nMiddleware(i18n);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Skip redirect for root path
  if (request.nextUrl.pathname === '/') {
    return;
  }

  return i18nMiddleware(request, event);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|llms-full.txt|.*\\.svg|.*\\.png|.*\\.webp|.*\\.gif|.*\\.jpg|.*\\.jpeg).*)',
  ],
};
