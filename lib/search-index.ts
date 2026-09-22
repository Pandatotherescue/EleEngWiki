import { getAllPages } from './content';
import type { SearchDoc } from './search';
import { ALL_CALCULATORS, categoryTitle } from '@/calculators';

/** Built once at build time and serialised into the page. */
export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const page of getAllPages()) {
    docs.push({
      id: `page:${page.slug}`,
      title: page.title,
      subtitle: page.summary,
      href: `/wiki/${page.slug}`,
      kind: 'page',
      category: categoryTitle(page.category),
      text: `${page.tags.join(' ')} ${page.summary} ${page.plain}`.toLowerCase().slice(0, 4000),
    });
  }

  for (const calc of ALL_CALCULATORS) {
    docs.push({
      id: `calc:${calc.id}`,
      title: calc.title,
      subtitle: calc.summary,
      href: `/calculators/${calc.id}`,
      kind: 'calculator',
      category: categoryTitle(calc.category),
      text: [
        calc.tags?.join(' ') ?? '',
        calc.summary,
        calc.modes.map((m) => m.label).join(' '),
        calc.modes.flatMap((m) => m.outputs.map((o) => o.label)).join(' '),
        calc.modes.flatMap((m) => m.fields.map((f) => f.label)).join(' '),
      ]
        .join(' ')
        .toLowerCase(),
    });
  }

  return docs;
}

