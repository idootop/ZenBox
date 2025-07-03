import { createTokenizer } from '@orama/tokenizers/mandarin';
import { createFromSource } from 'fumadocs-core/search/server';
import { source } from 'lib/source';

export const { GET } = createFromSource(source, {
  localeMap: {
    en: { language: 'english' },
    cn: {
      components: {
        tokenizer: createTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
  },
});
