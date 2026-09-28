'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

export type GlossaryRow = {
  term: string;
  expansion?: string;
  definition: string;
  category: string;
  categoryTitle: string;
  href?: string;
  see?: string[];
  initial: string;
  haystack: string;
};

const anchorFor = (term: string) => `term-${term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

/**
 * A glossary is looked things up in, not read through, so the controls come
 * first: a filter, category chips and an A–Z index. Definitions stay expanded
 * — hiding them behind a click would add a step to the only thing anyone
 * comes here to do.
 *
 * The control bar is sticky. It is the entire navigation of the page, and
 * letting it scroll away meant that by the time you had found the letter you
 * wanted you could no longer change the filter or jump anywhere else.
 */
export default function GlossaryBrowser({
  rows,
  categories,
}: {
  rows: GlossaryRow[];
  categories: { id: string; title: string; count: number }[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) => (category === 'all' || r.category === category) && (!q || r.haystack.includes(q))
    );
  }, [rows, query, category]);

  const groups = useMemo(() => {
    const map = new Map<string, GlossaryRow[]>();
    for (const row of filtered) {
      const list = map.get(row.initial);
      if (list) list.push(row);
      else map.set(row.initial, [row]);
    }
    return [...map.entries()];
  }, [filtered]);

  const present = new Set(groups.map(([letter]) => letter));
  const alphabet = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  /**
   * Anchors have to clear the sticky bar, and the bar's height is not a
   * constant: the chips wrap onto a second row on a narrow desktop window and
   * collapse to one scrollable row on a phone. A hard-coded scroll-margin was
   * out by 8px at 1280px and would have been out by a whole row elsewhere, so
   * the bar measures itself and the entries read the result.
   */
  const barRef = useRef<HTMLDivElement>(null);
  const [anchorOffset, setAnchorOffset] = useState('12rem');

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    // Where the bar sits once stuck — its CSS `top` plus its height. Reading
    // the bounding rect instead would measure wherever it happens to be at a
    // scroll position of zero.
    //
    // globals.css already sets scroll-padding-top on the document, and the two
    // add up, so subtract it or every jump lands a further 5rem down the page.
    const measure = () => {
      const top = parseFloat(getComputedStyle(bar).top) || 0;
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const target = top + bar.offsetHeight + 16 - padding;
      setAnchorOffset(`${Math.max(0, Math.round(target))}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  /**
   * A see-also may point at a term the current filter has hidden, in which case
   * a plain anchor jumps nowhere at all. Clear the filter first, then scroll
   * once the target has been rendered.
   */
  const jumpToTerm = (term: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setQuery('');
    setCategory('all');
    requestAnimationFrame(() => {
      const el = document.getElementById(anchorFor(term));
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (el) history.replaceState(null, '', `#${anchorFor(term)}`);
    });
  };

  const chip = (id: string, title: string, count: number) => {
    const active = category === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => setCategory(id)}
        aria-pressed={active}
        className={`shrink-0 rounded-md px-2.5 py-1.5 text-[0.82rem] font-medium transition-colors ${
          active ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-raised hover:text-ink'
        }`}
      >
        {title}{' '}
        <span className={`font-mono text-[0.7rem] ${active ? 'text-accent/70' : 'text-faint'}`}>
          {count}
        </span>
      </button>
    );
  };

  return (
    <div>
      {/* ---- Sticky control bar ---------------------------------------- */}
      <div
        ref={barRef}
        data-glossary-bar=""
        className="sticky top-[5.4rem] z-30 -mx-4 border-b border-line bg-bg/95 px-4 pb-2 pt-3 backdrop-blur-md sm:top-14 sm:-mx-6 sm:px-6"
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter terms…"
              aria-label="Filter terms"
              className="min-w-0 flex-1 rounded-md border border-line bg-surface px-3 py-2 font-mono text-[0.88rem] text-ink transition-colors placeholder:text-faint hover:border-faint/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:max-w-xs"
            />
            <span className="shrink-0 font-mono text-[0.72rem] text-faint">
              {filtered.length} of {rows.length}
            </span>
          </div>

          {/*
            One scrollable row on a phone rather than three wrapped ones —
            a sticky bar that tall would swallow the screen.
          */}
          <div className="scroll-slim mt-2 flex gap-1 overflow-x-auto sm:flex-wrap sm:overflow-visible">
            {chip('all', 'All', rows.length)}
            {categories.map((c) => chip(c.id, c.title, c.count))}
          </div>

          <div className="scroll-slim mt-1.5 flex gap-0.5 overflow-x-auto">
            {alphabet.map((letter) => {
              const has = present.has(letter);
              return has ? (
                <a
                  key={letter}
                  href={`#letter-${letter === '#' ? 'symbol' : letter}`}
                  className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[0.76rem] text-muted transition-colors hover:bg-raised hover:text-accent"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  aria-hidden="true"
                  className="shrink-0 px-1.5 py-0.5 font-mono text-[0.76rem] text-faint/40"
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- Entries --------------------------------------------------- */}
      {groups.length === 0 && (
        <p className="py-16 text-center text-[0.9rem] text-muted">Nothing matches that filter.</p>
      )}

      <div className="mt-8 space-y-10">
        {groups.map(([letter, entries]) => (
          <section
            key={letter}
            id={`letter-${letter === '#' ? 'symbol' : letter}`}
            style={{ scrollMarginTop: anchorOffset }}
          >
            <h2 className="mb-4 flex items-baseline gap-3 border-b border-line pb-2">
              <span className="font-mono text-[1.3rem] font-semibold text-accent">{letter}</span>
              <span className="font-mono text-[0.7rem] text-faint">
                {entries.length} {entries.length === 1 ? 'term' : 'terms'}
              </span>
            </h2>

            <dl className="space-y-5">
              {entries.map((entry) => (
                <div
                  key={entry.term}
                  id={anchorFor(entry.term)}
                  style={{ scrollMarginTop: anchorOffset }}
                >
                  <dt className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="text-[1rem] font-semibold tracking-tight text-ink">
                      {entry.term}
                    </span>
                    {entry.expansion && (
                      <span className="text-[0.85rem] text-muted">{entry.expansion}</span>
                    )}
                    <span className="rounded border border-line bg-raised/60 px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-faint">
                      {entry.categoryTitle}
                    </span>
                  </dt>
                  <dd className="mt-1 max-w-3xl text-[0.9rem] leading-relaxed text-ink/85">
                    {entry.definition}
                    {(entry.href || entry.see?.length) && (
                      <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem]">
                        {entry.href && (
                          <Link
                            href={entry.href}
                            className="font-medium text-accent transition-opacity hover:opacity-75"
                          >
                            Read the page →
                          </Link>
                        )}
                        {entry.see && entry.see.length > 0 && (
                          <span className="text-faint">
                            See also{' '}
                            {entry.see.map((s, i) => (
                              <span key={s}>
                                {i > 0 && ', '}
                                <a
                                  href={`#${anchorFor(s)}`}
                                  onClick={jumpToTerm(s)}
                                  className="text-muted underline decoration-line underline-offset-2 transition-colors hover:text-ink"
                                >
                                  {s}
                                </a>
                              </span>
                            ))}
                          </span>
                        )}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
