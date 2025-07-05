import { type NextRequest, NextResponse } from 'next/server';

import { getLLMTextTree } from '@/lib/get-llm-text';

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  const text = await getLLMTextTree(lang);
  return new NextResponse(text);
}
