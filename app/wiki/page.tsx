import type { Metadata } from 'next';
import Link from 'next/link';
import { getPagesInCategory } from '@/lib/content';
import { CATEGORIES, getCalculator } from '@/calculators';

export const metadata: Metadata = {
  title: 'Wiki',
  description:
    'Every reference page in EleEngWiki, grouped by fundamentals, AC theory and RF engineering.',
};

export default function WikiIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-line pb-7">
        <h1 className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.3rem]">Wiki</h1>
        <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted">
          Concept pages with the formulas written out and the calculator embedded where it
          belongs. Press <kbd className="rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[0.72rem]">⌘K</kbd> to
          jump straight to anything.
        </p>
      </header>

      <div className="mt-10 space-y-14">
        {CATEGORIES.map((cat) => {
          const pages = getPagesInCategory(cat.id);
          if (pages.length === 0) return null;
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="text-[1.25rem] font-semibold tracking-tight text-ink">
                  {cat.title}
                </h2>
                <span className="shrink-0 font-mono text-[0.72rem] text-faint">
                  {pages.length} pages
                </span>
              </div>
              <p className="mt-2.5 text-[0.88rem] text-muted">{cat.blurb}</p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/wiki/${page.slug}`}
                      className="flex h-full flex-col rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/40"
                    >
                      <span className="text-[0.95rem] font-medium tracking-tight text-ink">
                        {page.title}
                      </span>
                      <span className="mt-1.5 flex-1 text-[0.83rem] leading-relaxed text-muted">
                        {page.summary}
                      </span>
                      {page.calculators.length > 0 && (
                        <span className="mt-3 flex flex-wrap gap-1.5">
                          {page.calculators.map((id) => {
                            const calc = getCalculator(id);
                            if (!calc) return null;
                            return (
                              <span
                                key={id}
                                className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-accent"
                              >
                                {calc.title}
                              </span>
                            );
                          })}
                        </span>
                      )}
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
