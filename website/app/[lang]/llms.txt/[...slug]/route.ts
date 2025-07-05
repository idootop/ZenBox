import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';

import { getLLMTextPage } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string[]; lang: string }> },
) {
  const { slug = [], lang } = await params;
  const text = await getLLMTextPage(slug, lang);
  if (!text) notFound();
  return new NextResponse(text);
}

export function generateStaticParams() {
  return source.generateParams().map((param) => {
    if (param.slug && param.slug.length > 0) {
      return param;
    }
    return { ...param, slug: ['index'] };
  });
}
