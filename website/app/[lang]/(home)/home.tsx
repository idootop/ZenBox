'use client';

import Link from 'next/link';
import { useState } from 'react';

import { InteractiveDemo } from './demo';

interface HomePageProps {
  lang: string;
}

// Hero 组件
function Hero({ lang }: { lang: string }) {
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
      subheading: 'Vue Vibes in React',
      getStarted: 'Get started',
      copyTooltip: copied ? 'Copied' : 'Copy to clipboard',
    },
    cn: {
      subheading: '像 Vue 一样写 React',
      getStarted: '开始使用',
      copyTooltip: copied ? '已复制' : '复制到剪贴板',
    },
  };

  const currentText = text[lang as keyof typeof text] || text.en;

  return (
    <section className="relative px-4 pt-16 text-center sm:pt-32">
      <div className="relative mx-auto max-w-4xl">
        {/* 主标题 */}
        <h1 className="mb-8 font-bold text-5xl leading-tight md:text-6xl">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {currentText.subheading}
          </span>
        </h1>

        {/* 安装命令和按钮 */}
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 sm:flex-row">
          <div
            className="relative w-full flex-1 cursor-pointer"
            onClick={handleCopy}
          >
            <div className="rounded-full border border-gray-300 px-4 py-3 text-left font-mono text-gray-500 backdrop-blur-sm hover:bg-black/5 dark:border-gray-700 dark:bg-black/50 dark:hover:bg-white/5 dark:hover:text-green-500">
              <span>$ </span>
              <span>npm install zenbox</span>
              <button
                aria-label={currentText.copyTooltip}
                className="-translate-y-1/2 absolute top-1/2 right-2 cursor-pointer p-2"
                title={currentText.copyTooltip}
                type="button"
              >
                {copied ? (
                  <svg
                    aria-hidden="true"
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
                    aria-hidden="true"
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
            className="whitespace-nowrap rounded-full bg-black px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-black/80 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            href={`/${lang}/docs`}
          >
            {currentText.getStarted}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ lang }: HomePageProps) {
  return (
    <main className="home-container">
      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--color-grid-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-grid-border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative">
        {/* Hero 区域 */}
        <Hero lang={lang} />

        {/* Demo 区域 */}
        <InteractiveDemo lang={lang} />
      </div>
    </main>
  );
}
