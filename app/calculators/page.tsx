import type { Metadata } from 'next';
import { ALL_CALCULATORS, CATEGORIES, categoryTitle } from '@/calculators';
import CalculatorTable, { type CalcRow } from '@/components/CalculatorTable';

export const metadata: Metadata = {
  title: 'Calculators',
  description:
    'Every calculator in EleEngWiki: DC and AC circuits, filters, decibels, transmission lines, matching, antennas, noise and propagation.',
};

/** The headline results a calculator produces, for the "gives you" column. */
function primaryResults(calc: (typeof ALL_CALCULATORS)[number]): string {
  const labels = new Set<string>();
  for (const mode of calc.modes) {
    for (const out of mode.outputs) {
      if (out.primary) labels.add(out.label);
    }
  }
  if (labels.size === 0) {
    // Fall back to the first output of the first mode.
    const first = calc.modes[0]?.outputs[0];
    if (first) labels.add(first.label);
  }
  const list = [...labels];
  return list.length <= 3 ? list.join(', ') : `${list.slice(0, 3).join(', ')} +${list.length - 3}`;
}

export default function CalculatorIndex() {
  const rows: CalcRow[] = ALL_CALCULATORS.map((calc) => {
    const result = primaryResults(calc);
    return {
      id: calc.id,
      title: calc.title,
      categoryId: calc.category,
      category: categoryTitle(calc.category),
      result,
      modes: calc.modes.length,
      haystack: [calc.title, calc.summary, result, calc.tags?.join(' ') ?? '']
        .join(' ')
        .toLowerCase(),
    };
  });

  const usedCategories = CATEGORIES.filter((c) =>
    ALL_CALCULATORS.some((calc) => calc.category === c.id)
  ).map((c) => ({ id: c.id, title: c.title }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-line pb-7">
        <h1 className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.3rem]">
          Calculators
        </h1>
        <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted">
          {ALL_CALCULATORS.length} calculators with unit handling built in. Filter the list, or open
          one to use it — each also sits inside the wiki page that explains it, and every result can
          be exported as a PDF or copied as Markdown.
        </p>
      </header>

      <div className="mt-8">
        <CalculatorTable rows={rows} categories={usedCategories} />
      </div>

      <p className="mt-8 text-[0.82rem] leading-relaxed text-muted">
        The modes column counts the ways a calculator can be rearranged — solving for frequency
        rather than capacitance, say. A dash means there is only one.
      </p>
    </div>
  );
}
