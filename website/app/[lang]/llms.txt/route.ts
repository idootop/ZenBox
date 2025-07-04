import { getSiteDescription, kSiteName } from "@/lib/const";
import { source } from "@/lib/source";
import { NextRequest } from "next/server";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const scanned: string[] = [];
  scanned.push(`# ${kSiteName}`);
  scanned.push(getSiteDescription(lang));

  const map = new Map<string, string[]>();

  for (const page of source.getPages(lang)) {
    const dir = page.slugs[0] ?? "Index";
    const list = map.get(dir) ?? [];
    let url = page.url.replace(`/${lang}/docs`, `/${lang}/llms.txt`);
    if (url === `/${lang}/llms.txt`) {
      url = `/${lang}/llms.txt/index`;
    }
    list.push(`- [${page.data.title}](${url}): ${page.data.description}`);
    map.set(dir, list);
  }

  for (const [key, value] of map) {
    scanned.push(`## ${key.charAt(0).toUpperCase() + key.slice(1)}`);
    scanned.push(value.join("\n"));
  }

  return new Response(scanned.join("\n\n"));
}
