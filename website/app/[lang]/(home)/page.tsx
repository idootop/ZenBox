import Image from 'next/image';

import { createMetadata } from '@/lib/metadata';

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang } = await props.params;

  if (lang === 'cn') {
    return createMetadata({
      title: 'ZenBox',
      description:
        'ZenBox 是一个现代的 React 状态管理库，专注于简单性和开发者体验。',
    });
  }

  return createMetadata({
    title: 'ZenBox',
    description:
      'ZenBox is a modern React state management library focused on simplicity and developer experience.',
  });
}

export default function HomePage() {
  return (
    <main className="flex h-[calc(100dvh-2*56px)] flex-col items-center justify-center gap-4 p-4">
      <Image
        alt="ZenBox"
        className="w-[256px]"
        height={1024}
        src="/logo.png"
        width={1024}
      />
      <h1 className="font-bold text-4xl">ZenBox</h1>
      <p className="text-lg">
        ZenBox is a modern React state management library focused on simplicity
        and developer experience.
      </p>
    </main>
  );
}
