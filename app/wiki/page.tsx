import type { Metadata } from 'next';
import Link from 'next/link';
import { groupsInCategory } from '@/lib/content';
import { CATEGORIES, getCalculator } from '@/calculators';
import { WIKI_CATEGORIES } from '@/lib/navigation';
import JumpNav from '@/components/JumpNav';

export const metadata: Metadata = {
  title: 'Wiki',
  description:
    'Every concept page in EleEngWiki, grouped by fundamentals, AC theory and RF engineering.',
};

export default function WikiIndex() {
  const sections = WIKI_CATEGORIES.map((id) => {
    const category = CATEGORIES.find((c) => c.id === id)!;
    const groups = groupsInCategory(id);
    const count = groups.reduce((n, g) => n + g.pages.length, 0);
    return { category, groups, count };
  });

  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-14">
        <header className="pb-7">
          <h1 className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.3rem]">
            Wiki
          </h1>
          <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted">
            Concept pages with the formulas written out and the calculator embedded where it
            belongs. Press{' '}
            <kbd className="rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[0.72rem]">
              ⌘K
            </kbd>{' '}
            to jump straight to anything.
          </p>
        </header>
      </div>

      <JumpNav
        items={sections.map((s) => ({
          id: s.category.id,
          label: s.category.title,
          count: s.count,
        }))}
      />

      <div className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
        <div className="space-y-14 pt-10">
          {sections.map(({ category, groups, count }) => (
            <section key={category.id} id={category.id} className="scroll-mt-[8.5rem]">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="text-[1.25rem] font-semibold tracking-tight text-ink">
                  {category.title}
                </h2>
                <span className="shrink-0 font-mono text-[0.72rem] text-faint">{count} pages</span>
              </div>
              <p className="mt-2.5 text-[0.88rem] text-muted">{category.blurb}</p>

              <div className="mt-6 space-y-8">
                {groups.map((group, gi) => (
                  <div key={group.name || gi}>
                    {group.name && (
                      <h3 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                        {group.name}
                      </h3>
                    )}
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {group.pages.map((page) => {
                        const calcs = page.calculators
                          .map((id) => getCalculator(id))
                          .filter(Boolean);
                        return (
                          <li key={page.slug}>
                            <Link
                              href={`/wiki/${page.slug}`}
                              className="flex h-full flex-col rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/40"
                            >
                              <span className="flex items-baseline justify-between gap-2">
                                <span className="text-[0.95rem] font-medium tracking-tight text-ink">
                                  {page.title}
                                </span>
                                {calcs.length > 0 && (
                                  <span className="shrink-0 rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.62rem] text-accent">
                                    {calcs.length === 1 ? '1 calculator' : `${calcs.length} calcs`}
                                  </span>
                                )}
                              </span>
                              <span className="mt-1.5 flex-1 text-[0.83rem] leading-relaxed text-muted">
                                {page.summary}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
