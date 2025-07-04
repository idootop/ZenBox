import { remarkInclude } from 'fumadocs-mdx/config';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

import { type Page, source } from '@/lib/source';

import { getSiteDescription, kGithub, kSiteName, kSiteURL } from './const';

const processor = remark().use(remarkMdx).use(remarkInclude).use(remarkGfm);

export async function getLLMText(page: Page, lang: string = 'en') {
  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  const sourcePrefix = lang === 'cn' ? '源码' : 'Source';

  return `# ${page.data.title}

${page.data.description}

${sourcePrefix}: ${kGithub}/refs/heads/main/website/content/docs/${page.path}
        
${processed.value}`;
}

export async function getLLMTextTree(lang: string = 'en') {
  const scanned: string[] = [];
  scanned.push(`# ${kSiteName}`);
  scanned.push(getSiteDescription(lang));

  const map = new Map<string, string[]>();

  for (const page of source.getPages(lang)) {
    const dir = page.slugs[0] ?? 'Index';
    const list = map.get(dir) ?? [];
    let url = page.url.replace(`/${lang}/docs`, `/${lang}/llms.txt`);
    if (url === `/${lang}/llms.txt`) {
      url = `/${lang}/llms.txt/index`;
    }
    list.push(
      `- [${page.data.title}](${kSiteURL}${url}): ${page.data.description}`,
    );
    map.set(dir, list);
  }

  for (const [key, value] of map) {
    scanned.push(`## ${key.charAt(0).toUpperCase() + key.slice(1)}`);
    scanned.push(value.join('\n'));
  }

  return scanned.join('\n\n');
}

export async function getLLMTextFull(lang: string = 'en') {
  const scan = source.getPages(lang).map((page) => getLLMText(page, lang));
  const scanned = await Promise.all(scan);
  return scanned.join('\n\n');
}

export async function getLLMTextPage(slug: string[], lang: string = 'en') {
  if (slug.length === 1 && slug[0] === 'index') {
    slug = [];
  }
  const page = source.getPage(slug, lang);
  if (!page) {
    return null;
  }
  return getLLMText(page, lang);
}
