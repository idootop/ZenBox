import type { NextRequest } from 'next/server';

import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  const scan = source.getPages(lang).map((page) => getLLMText(page, lang));
  const scanned = await Promise.all(scan);
  return new Response(scanned.join('\n\n'));
}
