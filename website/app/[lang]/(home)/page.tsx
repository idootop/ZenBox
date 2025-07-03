import Image from 'next/image';

import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'ZenBox',
  description:
    'ZenBox is a modern React state management library focused on simplicity and developer experience.',
});

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
