import type { Metadata } from 'next';
import Link from 'next/link';
import { getPagesInCategory } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Equipment',
  description:
    'Reference catalogues of professional radio hardware — Rohde & Schwarz, Furuno, Thales and L3Harris — organised by manufacturer and role.',
};

export default function EquipmentIndex() {
  const pages = getPagesInCategory('equipment');
  const [overview, ...makers] = pages;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-line pb-7">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
          Hardware reference
        </p>
        <h1 className="mt-3 text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.3rem]">
          Equipment
        </h1>
        <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted">
          What hardware actually exists, as opposed to how it works. Catalogues of professional
          radio equipment by manufacturer, with the designation systems decoded and the
          specifications that matter separated from the ones that do not.
        </p>
      </header>

      {overview && (
        <Link
          href={`/equipment/${overview.slug}`}
          className="mt-10 block rounded-xl border border-accent/30 bg-accent-soft p-6 transition-colors hover:border-accent/60"
        >
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-accent">
            Start here
          </span>
          <span className="mt-2 block text-[1.15rem] font-semibold tracking-tight text-ink">
            {overview.title}
          </span>
          <span className="mt-1.5 block max-w-2xl text-[0.88rem] leading-relaxed text-muted">
            {overview.summary}
          </span>
        </Link>
      )}

      <section className="mt-10">
        <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
          By manufacturer
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {makers.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/equipment/${page.slug}`}
                className="flex h-full flex-col rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/40"
              >
                <span className="text-[0.95rem] font-medium tracking-tight text-ink">
                  {page.title}
                </span>
                <span className="mt-1.5 flex-1 text-[0.83rem] leading-relaxed text-muted">
                  {page.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 border-t border-line pt-6 text-[0.82rem] leading-relaxed text-muted">
        Specifications here come from manufacturer product pages and are indicative. For anything
        consequential, work from the datasheet — and note that most defence equipment is subject to
        export control, so the published variant may not be the one available to a given buyer.
      </p>
    </div>
  );
}
