import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_CALCULATORS, CATEGORIES, calculatorsInCategory } from '@/calculators';

export const metadata: Metadata = {
  title: 'Calculators',
  description:
    'Every calculator in EleEngWiki: DC and AC circuits, filters, decibels, transmission lines, matching, antennas, noise and propagation.',
};

export default function CalculatorIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-line pb-7">
        <h1 className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.3rem]">
          Calculators
        </h1>
        <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted">
          {ALL_CALCULATORS.length} calculators with unit handling built in. Each one also lives
          inside the wiki page that explains it, and every result can be exported as a PDF or
          copied as Markdown.
        </p>
      </header>

      <div className="mt-10 space-y-14">
        {CATEGORIES.map((cat) => {
          const calcs = calculatorsInCategory(cat.id);
          if (calcs.length === 0) return null;
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="text-[1.25rem] font-semibold tracking-tight text-ink">
                  {cat.title}
                </h2>
                <span className="shrink-0 font-mono text-[0.72rem] text-faint">
                  {calcs.length}
                </span>
              </div>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {calcs.map((calc) => (
                  <li key={calc.id}>
                    <Link
                      href={`/calculators/${calc.id}`}
                      className="flex h-full flex-col rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/40"
                    >
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-[0.95rem] font-medium tracking-tight text-ink">
                          {calc.title}
                        </span>
                        {calc.modes.length > 1 && (
                          <span className="shrink-0 rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.62rem] text-accent">
                            {calc.modes.length} modes
                          </span>
                        )}
                      </span>
                      <span className="mt-1.5 flex-1 text-[0.83rem] leading-relaxed text-muted">
                        {calc.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
