import type { Metadata } from 'next';
import {
  ALL_TERMS,
  GLOSSARY_CATEGORIES,
  categoryTitle,
  initialOf,
} from '@/glossary';
import { getAllPages } from '@/lib/content';
import { hrefForPage } from '@/lib/navigation';
import GlossaryBrowser, { type GlossaryRow } from '@/components/GlossaryBrowser';

export const metadata: Metadata = {
  title: 'Glossary',
  description:
    'Definitions of the terms used in electrical engineering, RF engineering and radio operation — from admittance to waveform.',
};

export default function GlossaryPage() {
  const pages = getAllPages();

  const rows: GlossaryRow[] = ALL_TERMS.map((entry) => {
    const page = entry.page ? pages.find((p) => p.slug === entry.page) : undefined;
    return {
      term: entry.term,
      expansion: entry.expansion,
      definition: entry.definition,
      category: entry.category,
      categoryTitle: categoryTitle(entry.category),
      href: page ? hrefForPage(page) : undefined,
      see: entry.see,
      initial: initialOf(entry.term),
      haystack: [entry.term, entry.expansion ?? '', entry.definition].join(' ').toLowerCase(),
    };
  });

  const counts = GLOSSARY_CATEGORIES.map((c) => ({
    ...c,
    count: ALL_TERMS.filter((e) => e.category === c.id).length,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-line pb-7">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
          Terms &amp; definitions
        </p>
        <h1 className="mt-3 text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.3rem]">
          Glossary
        </h1>
        <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted">
          {ALL_TERMS.length} terms from electrical engineering, RF engineering and radio operation.
          Acronyms are expanded, and anything with a page of its own links to it.
        </p>
      </header>

      {/*
        The per-category counts used to sit here as their own block. They now
        ride on the filter chips instead: same information, one row rather than
        two, and on a phone it removes about a screenful of scrolling before the
        first definition.
      */}
      <GlossaryBrowser rows={rows} categories={counts} />


      <p className="mt-12 border-t border-line pt-6 text-[0.82rem] leading-relaxed text-muted">
        Definitions here aim to be short and usable rather than rigorous. Where a term has a page of
        its own, that page carries the caveats — and for anything that has to be right, the relevant
        standard is the authority rather than a glossary entry.
      </p>
    </div>
  );
}
