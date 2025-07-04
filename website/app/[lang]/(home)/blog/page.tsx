import { blog } from 'lib/source';
import Link from 'next/link';

import { createMetadata } from '@/lib/metadata';

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang } = await props.params;
  return createMetadata({
    lang,
    slug: ['blog'],
    ...(lang === 'cn'
      ? {
          title: '博客',
          description: 'ZenBox 的最新更新和新闻',
        }
      : {
          title: 'Blog',
          description: 'ZenBox blog',
        }),
  });
}

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = await params;

  const posts = [...blog.getPages(lang)].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  return (
    <main className="mx-auto my-2 w-full max-w-[1024px] p-4">
      <div className="my-4 flex flex-col items-center gap-2">
        <h1 className="flex items-center gap-4 font-bold text-4xl">
          {lang === 'cn' ? '博客' : 'Blog'}
        </h1>
        <p className="text-gray-500 text-sm">
          {lang === 'cn'
            ? 'ZenBox 的最新更新和新闻'
            : 'The latest updates and news about ZenBox'}
        </p>
      </div>
      <hr className="my-4 w-full" />
      {posts.map((post) => (
        <Link
          className="flex w-full flex-col gap-2 rounded-xl border p-4 hover:shadow-sm dark:hover:text-[var(--color-fd-primary)]"
          href={post.url}
          key={post.data.title}
        >
          <p className="text-gray-500 text-sm">
            {new Date(post.data.date).toLocaleDateString(
              lang === 'cn' ? 'zh-CN' : 'en-US',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                weekday: 'short',
              },
            )}
          </p>
          <h2 className="font-bold text-2xl">{post.data.title}</h2>
          <p className="text-gray-500 text-sm">{post.data.description}</p>
        </Link>
      ))}
    </main>
  );
}
