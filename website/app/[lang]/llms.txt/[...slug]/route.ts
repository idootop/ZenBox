import { type NextRequest, NextResponse } from "next/server";
import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string[]; lang: string }> }
) {
  let { slug, lang } = await params;
  if (slug.length === 1 && slug[0] === "index") {
    slug = [];
  }
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  return new NextResponse(await getLLMText(page, lang));
}

export function generateStaticParams() {
  return source.generateParams();
}
