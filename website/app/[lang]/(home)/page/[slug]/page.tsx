import { pages } from 'lib/source';
import { getMDXComponents } from 'mdx-components';
import { notFound } from 'next/navigation';

import { createMetadata } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata(props: PageProps) {
  const { lang, slug } = await props.params;
  const page = pages.getPage([slug], lang);
  if (!page) notFound();

  return createMetadata({
    lang,
    slug: ['page', slug],
    title: page.data.title,
    description: page.data.description,
  });
}

export default async function Page(props: PageProps) {
  const { slug, lang } = await props.params;
  const page = pages.getPage([slug], lang);
  if (!page) notFound();

  return (
    <main className="mx-auto my-2 w-full max-w-[960px] p-4">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl dark:text-[var(--color-fd-primary)]">
          {page.data.title}
        </h1>
        <p className="text-gray-500">{page.data.description}</p>
      </div>
      <hr className="my-4 w-full" />
      <article className="prose">
        <page.data.body components={getMDXComponents()} />
      </article>
    </main>
  );
}
