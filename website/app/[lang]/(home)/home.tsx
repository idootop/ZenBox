'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HomePageProps {
  lang: string;
}

export function HomePage({ lang }: HomePageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('npm install zenbox');
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const text = {
    en: {
      heading: 'Code React like Vue',
      subheading: 'Manage state like Zustand',
      getStarted: 'Get started',
      copyTooltip: copied ? 'Copied' : 'Copy to clipboard',
    },
    cn: {
      heading: '像 Vue 一样写 React',
      subheading: '像 Zustand 一样管理状态',
      getStarted: '开始使用',
      copyTooltip: copied ? '已复制' : '复制到剪贴板',
    },
  };

  const currentText = text[lang as keyof typeof text] || text.en;

  return (
    <main className="home-container relative min-h-[calc(100dvh-2*56px)] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-grid-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-grid-border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative flex min-h-[calc(100dvh-2*56px)] flex-col items-center justify-center gap-8 p-4 text-center">
        <div className="max-w-4xl space-y-4">
          <h1 className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text font-bold text-5xl text-transparent leading-tight md:text-7xl dark:from-white dark:via-gray-200 dark:to-gray-400">
            {currentText.heading}
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {currentText.subheading}
            </span>
          </h1>
        </div>

        <div className="flex w-full max-w-lg flex-col items-center gap-4 sm:flex-row">
          <div
            className="relative w-full flex-1 cursor-pointer"
            onClick={handleCopy}
          >
            <div className="rounded-[100px] border border-gray-300 px-4 py-3 text-left font-mono text-gray-500 backdrop-blur-sm hover:bg-black/5 dark:border-gray-700 dark:bg-black/50 dark:hover:bg-white/5 dark:hover:text-green-500">
              <span>$ </span>
              <span>npm install zenbox</span>
              <button
                className="-translate-y-1/2 absolute top-1/2 right-2 cursor-pointer p-2"
                title={currentText.copyTooltip}
              >
                {copied ? (
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <Link
            className="whitespace-nowrap rounded-[100px] bg-black px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-black/80 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            href={`/${lang}/docs`}
          >
            {currentText.getStarted}
          </Link>
        </div>
      </div>
    </main>
  );
}
