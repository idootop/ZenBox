import { remarkInclude } from 'fumadocs-mdx/config';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

import type { Page } from '@/lib/source';

import { kGithub } from './const';

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
