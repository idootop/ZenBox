'use client';

import { createStore, useComputed, useStore, useWatch } from 'zenbox';

interface DemoProps {
  lang: string;
}

// 创建一个计数器 store
const counterStore = createStore({
  count: 1,
  increment: () => {
    counterStore.setState((s) => {
      if (s.count < 3) {
        s.count++;
      }
    });
  },
});

const i18nText = {
  en: {
    stars: 'Stars',
    score: 'Score',
    clickMe: 'Click ME',
    already3stars: 'Already 3 stars!',
    typeIsAutoInferred: 'Types are automatically inferred from initial state',
    computedValuesThatJustWork: 'Computed values that just work',
    watchChangesLikeVue: 'Watch changes like Vue',
  },
  cn: {
    stars: '星星',
    score: '分数',
    clickMe: '点击 +1',
    already3stars: '已经3颗星了！',
    typeIsAutoInferred: '自动推导类型',
    computedValuesThatJustWork: '计算属性',
    watchChangesLikeVue: '监听变化',
  },
};

// 浮动计数器组件
function FloatingCounter({ lang }: { lang: string }) {
  const { count, increment } = useStore(counterStore);

  // 生成星星显示
  const stars = '⭐️'.repeat(count);

  const t = i18nText[lang as keyof typeof i18nText] || i18nText.en;

  // 计算值
  const score = useComputed(() => counterStore.value.count * 2);

  // 监听变化 - 到 3 颗星时提示
  useWatch(
    () => counterStore.value.count,
    (newCount: number) => {
      if (newCount === 3) {
        setTimeout(() => {
          alert(t.already3stars);
        }, 100);
      }
    },
  );

  return (
    <div className="absolute z-10 hidden flex-col items-center gap-2 sm:top-20 sm:right-10 sm:flex">
      <div
        className="flex h-30 w-22 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm transition-transform hover:scale-95 dark:border-[#2b2b2b] dark:bg-[#181818]/95 dark:shadow-white/10"
        onClick={increment}
      >
        <div className="flex select-none flex-col items-center gap-2">
          <div className="text-gray-400 text-xs uppercase dark:text-gray-400">
            {t.score} {score}
          </div>
          <div className="mb-1 text-xl leading-none tracking-widest">
            {stars}
          </div>
          <div className="text-gray-500 text-xs dark:text-gray-500">
            {t.clickMe}
          </div>
        </div>
      </div>
    </div>
  );
}

// 代码展示组件
function CodeDisplay({ lang }: { lang: string }) {
  const t = i18nText[lang as keyof typeof i18nText] || i18nText.en;

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white dark:border-[#2b2b2b] dark:bg-[#181818]">
      {/* 浮动计数器 */}
      <FloatingCounter lang={lang} />

      {/* 代码窗口头部 */}
      <div className="flex items-center justify-between border-gray-200 border-b px-4 py-3 dark:border-[#2b2b2b]">
        <div className="flex space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-400"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-400"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-gray-400"></div>
        </div>
        <span className="font-mono text-gray-500 text-xs dark:text-gray-400">
          counter.tsx
        </span>
      </div>

      {/* 代码内容 */}
      <div className="overflow-auto p-3 sm:p-4">
        <pre className="text-xs leading-5 sm:text-sm sm:leading-6">
          <code className="text-gray-900 dark:text-gray-100">
            <span className="text-purple-600 dark:text-purple-400">import</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'{'}</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">
              createStore
            </span>
            <span className="text-gray-900 dark:text-gray-100">,</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">
              useComputed
            </span>
            <span className="text-gray-900 dark:text-gray-100">,</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">useStore</span>
            <span className="text-gray-900 dark:text-gray-100">,</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">useWatch</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'}'}</span>{' '}
            <span className="text-purple-600 dark:text-purple-400">from</span>{' '}
            <span className="text-green-600 dark:text-green-400">"zenbox"</span>
            <span className="text-gray-900 dark:text-gray-100">;</span>
            {'  '}
            {'\n\n'}
            <span className="text-gray-500 dark:text-gray-400">
              {`// ${t.typeIsAutoInferred}`}
            </span>
            {'\n'}
            <span className="text-purple-600 dark:text-purple-400">const</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">store</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">=</span>{' '}
            <span className="text-yellow-600 dark:text-yellow-400">
              createStore
            </span>
            <span className="text-gray-900 dark:text-gray-100">(</span>
            <span className="text-gray-900 dark:text-gray-100">{'{'}</span>
            {'\n  '}
            <span className="text-red-600 dark:text-red-400">count</span>
            <span className="text-gray-900 dark:text-gray-100">:</span>{' '}
            <span className="text-orange-600 dark:text-orange-400">1</span>
            <span className="text-gray-900 dark:text-gray-100">,</span>
            {'\n  '}
            <span className="text-red-600 dark:text-red-400">addStar</span>
            <span className="text-gray-900 dark:text-gray-100">:</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">()</span>{' '}
            <span className="text-purple-600 dark:text-purple-400">{'=>'}</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">store</span>
            <span className="text-gray-900 dark:text-gray-100">.</span>
            <span className="text-yellow-600 dark:text-yellow-400">
              setState
            </span>
            <span className="text-gray-900 dark:text-gray-100">(</span>
            <span className="text-blue-600 dark:text-blue-400">state</span>{' '}
            <span className="text-purple-600 dark:text-purple-400">{'=>'}</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'{'}</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">state</span>
            <span className="text-gray-900 dark:text-gray-100">.</span>
            <span className="text-red-600 dark:text-red-400">count</span>
            <span className="text-gray-900 dark:text-gray-100">++;</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'}'}</span>
            <span className="text-gray-900 dark:text-gray-100">),</span>
            {'\n'}
            <span className="text-gray-900 dark:text-gray-100">{'});'}</span>
            {'\n\n'}
            <span className="text-purple-600 dark:text-purple-400">
              function
            </span>{' '}
            <span className="text-yellow-600 dark:text-yellow-400">
              StarRating
            </span>
            <span className="text-gray-900 dark:text-gray-100">()</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'{'}</span>
            {'\n  '}
            <span className="text-purple-600 dark:text-purple-400">const</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'{'}</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">count</span>
            <span className="text-gray-900 dark:text-gray-100">,</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">addStar</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'}'}</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">=</span>{' '}
            <span className="text-yellow-600 dark:text-yellow-400">
              useStore
            </span>
            <span className="text-gray-900 dark:text-gray-100">(</span>
            <span className="text-blue-600 dark:text-blue-400">store</span>
            <span className="text-gray-900 dark:text-gray-100">);</span>
            {'\n\n  '}
            <span className="text-gray-500 dark:text-gray-400">
              {`// ${t.computedValuesThatJustWork}`}
            </span>
            {'\n  '}
            <span className="text-purple-600 dark:text-purple-400">const</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">score</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">=</span>{' '}
            <span className="text-yellow-600 dark:text-yellow-400">
              useComputed
            </span>
            <span className="text-gray-900 dark:text-gray-100">(</span>
            <span className="text-gray-900 dark:text-gray-100">()</span>{' '}
            <span className="text-purple-600 dark:text-purple-400">{'=>'}</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">store</span>
            <span className="text-gray-900 dark:text-gray-100">.</span>
            <span className="text-red-600 dark:text-red-400">value</span>
            <span className="text-gray-900 dark:text-gray-100">.</span>
            <span className="text-red-600 dark:text-red-400">count</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">*</span>{' '}
            <span className="text-orange-600 dark:text-orange-400">2</span>
            <span className="text-gray-900 dark:text-gray-100">);</span>
            {'\n\n  '}
            <span className="text-gray-500 dark:text-gray-400">
              {`// ${t.watchChangesLikeVue}`}
            </span>
            {'\n  '}
            <span className="text-yellow-600 dark:text-yellow-400">
              useWatch
            </span>
            <span className="text-gray-900 dark:text-gray-100">(</span>
            <span className="text-gray-900 dark:text-gray-100">()</span>{' '}
            <span className="text-purple-600 dark:text-purple-400">{'=>'}</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">store</span>
            <span className="text-gray-900 dark:text-gray-100">.</span>
            <span className="text-red-600 dark:text-red-400">value</span>
            <span className="text-gray-900 dark:text-gray-100">.</span>
            <span className="text-red-600 dark:text-red-400">count</span>
            <span className="text-gray-900 dark:text-gray-100">,</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">count</span>{' '}
            <span className="text-purple-600 dark:text-purple-400">{'=>'}</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'{'}</span>
            {'\n    '}
            <span className="text-purple-600 dark:text-purple-400">if</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">(</span>
            <span className="text-blue-600 dark:text-blue-400">count</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">{'=== '}</span>
            <span className="text-orange-600 dark:text-orange-400">3</span>
            <span className="text-gray-900 dark:text-gray-100">)</span>{' '}
            <span className="text-yellow-600 dark:text-yellow-400">alert</span>
            <span className="text-gray-900 dark:text-gray-100">(</span>
            <span className="text-green-600 dark:text-green-400">
              'Already 3 stars!'
            </span>
            <span className="text-gray-900 dark:text-gray-100">);</span>
            {'\n  '}
            <span className="text-gray-900 dark:text-gray-100">{'});'}</span>
            {'\n\n  '}
            <span className="text-purple-600 dark:text-purple-400">return</span>{' '}
            <span className="text-gray-900 dark:text-gray-100">(</span>
            {'\n    '}
            <span className="text-gray-900 dark:text-gray-100">{'<'}</span>
            <span className="text-red-600 dark:text-red-400">div</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">onClick</span>
            <span className="text-gray-900 dark:text-gray-100">=</span>
            <span className="text-gray-900 dark:text-gray-100">{'{'}</span>
            <span className="text-blue-600 dark:text-blue-400">addStar</span>
            <span className="text-gray-900 dark:text-gray-100">{'}'}</span>
            <span className="text-gray-900 dark:text-gray-100">{'>'}</span>
            {'\n      '}
            <span className="text-gray-900 dark:text-gray-100">{'<'}</span>
            <span className="text-red-600 dark:text-red-400">p</span>
            <span className="text-gray-900 dark:text-gray-100">{'>'}</span>
            <span className="text-gray-900 dark:text-gray-100">{'{'}</span>
            <span className="text-green-600 dark:text-green-400">'⭐️'</span>
            <span className="text-gray-900 dark:text-gray-100">.</span>
            <span className="text-yellow-600 dark:text-yellow-400">repeat</span>
            <span className="text-gray-900 dark:text-gray-100">(</span>
            <span className="text-blue-600 dark:text-blue-400">count</span>
            <span className="text-gray-900 dark:text-gray-100">)</span>
            <span className="text-gray-900 dark:text-gray-100">{'}'}</span>
            <span className="text-gray-900 dark:text-gray-100">{'</'}</span>
            <span className="text-red-600 dark:text-red-400">p</span>
            <span className="text-gray-900 dark:text-gray-100">{'>'}</span>
            {'\n      '}
            <span className="text-gray-900 dark:text-gray-100">{'<'}</span>
            <span className="text-red-600 dark:text-red-400">p</span>
            <span className="text-gray-900 dark:text-gray-100">{'>'}</span>
            <span className="text-gray-900 dark:text-gray-100">
              Score: {'{'}
            </span>
            <span className="text-blue-600 dark:text-blue-400">score</span>
            <span className="text-gray-900 dark:text-gray-100">{'}'}</span>
            <span className="text-gray-900 dark:text-gray-100">{'</'}</span>
            <span className="text-red-600 dark:text-red-400">p</span>
            <span className="text-gray-900 dark:text-gray-100">{'>'}</span>
            {'\n    '}
            <span className="text-gray-900 dark:text-gray-100">{'</'}</span>
            <span className="text-red-600 dark:text-red-400">div</span>
            <span className="text-gray-900 dark:text-gray-100">{'>'}</span>
            {'\n  '}
            <span className="text-gray-900 dark:text-gray-100">);</span>
            {'\n'}
            <span className="text-gray-900 dark:text-gray-100">{'}'}</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

// 主 Demo 组件
export function InteractiveDemo({ lang }: DemoProps) {
  return (
    <section className="mx-auto max-w-4xl p-4 py-8 sm:p-8 sm:pt-16">
      {/* 代码展示区域，右上角有浮动的交互组件 */}
      <CodeDisplay lang={lang} />
    </section>
  );
}
