import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { createMetadata } from 'lib/metadata';
import { source } from 'lib/source';
import { getMDXComponents } from 'mdx-components';
import { notFound } from 'next/navigation';

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      breadcrumb={{ enabled: false }}
      editOnGithub={{
        owner: 'idootop',
        repo: 'ZenBox',
        sha: 'main',
        path:
          page.url.replace(`/${params.lang}/docs`, '/website/content/docs') +
          '.mdx',
      }}
      lastUpdate={page.data.lastModified}
      toc={page.data.toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams().map((param) => {
    if (param.slug && param.slug.length > 0) {
      return param;
    }
    return { ...param, slug: [] };
  });
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  return createMetadata({
    ...params,
    slug: ['docs', ...(params.slug ?? [])],
    title: page.data.title,
    description: page.data.description,
  });
}
