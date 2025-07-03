import { DocsBody, DocsPage } from 'fumadocs-ui/page';
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
    <DocsPage toc={page.data.toc}>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  return createMetadata({
    ...params,
    title: page.data.title,
    description: page.data.description,
  });
}
