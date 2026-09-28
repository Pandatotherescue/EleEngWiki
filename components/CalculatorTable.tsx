'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type CalcRow = {
  id: string;
  title: string;
  categoryId: string;
  category: string;
  result: string;
  modes: number;
  haystack: string;
};

/**
 * The calculator index is a tool drawer rather than something to browse: you
 * usually know what you want. So it is a dense table with a filter, not a grid
 * of cards — 34 rows fit in about one screen instead of three.
 */
export default function CalculatorTable({
  rows,
  categories,
}: {
  rows: CalcRow[];
  categories: { id: string; title: string }[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (category === 'all' || r.categoryId === category) &&
        (!q || r.haystack.includes(q))
    );
  }, [rows, query, category]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter calculators…"
          aria-label="Filter calculators"
          className="min-w-0 flex-1 rounded-md border border-line bg-surface px-3 py-2 font-mono text-[0.88rem] text-ink transition-colors placeholder:text-faint hover:border-faint/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:flex-none sm:w-60"
        />
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
            className={`rounded-md px-2.5 py-1.5 text-[0.82rem] font-medium transition-colors ${
              category === 'all'
                ? 'bg-accent-soft text-accent'
                : 'text-muted hover:bg-raised hover:text-ink'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={`rounded-md px-2.5 py-1.5 text-[0.82rem] font-medium transition-colors ${
                category === c.id
                  ? 'bg-accent-soft text-accent'
                  : 'text-muted hover:bg-raised hover:text-ink'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
        <span className="ml-auto shrink-0 font-mono text-[0.72rem] text-faint">
          {filtered.length} of {rows.length}
        </span>
      </div>

      {/*
        Below sm the four-column table clipped mid-word and pushed Section and
        Modes off-screen entirely, so it becomes a stacked list there. The whole
        card is the hit target, which a table row cannot be.
      */}
      <ul className="mt-5 space-y-2 sm:hidden">
        {filtered.map((row) => (
          <li key={row.id}>
            <Link
              href={`/calculators/${row.id}`}
              className="block rounded-lg border border-line bg-surface p-3.5 transition-colors hover:border-accent/40"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-[0.92rem] font-medium text-ink">{row.title}</span>
                <span className="shrink-0 font-mono text-[0.68rem] text-faint">{row.category}</span>
              </span>
              <span className="mt-1 block text-[0.82rem] leading-snug text-muted">
                {row.result}
              </span>
              {row.modes > 1 && (
                <span className="mt-1.5 block font-mono text-[0.68rem] text-faint">
                  {row.modes} modes
                </span>
              )}
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-12 text-center text-[0.88rem] text-muted">
            Nothing matches that filter.
          </li>
        )}
      </ul>

      <div className="scroll-slim mt-5 hidden overflow-x-auto rounded-lg border border-line bg-surface sm:block">
        <table className="w-full border-collapse text-[0.88rem]">
          <thead>
            <tr className="border-b border-line bg-raised/60">
              <th className="px-4 py-2.5 text-left font-mono text-[0.64rem] uppercase tracking-[0.1em] text-faint">
                Calculator
              </th>
              <th className="px-4 py-2.5 text-left font-mono text-[0.64rem] uppercase tracking-[0.1em] text-faint">
                Gives you
              </th>
              <th className="px-4 py-2.5 text-left font-mono text-[0.64rem] uppercase tracking-[0.1em] text-faint">
                Section
              </th>
              <th className="whitespace-nowrap px-4 py-2.5 text-right font-mono text-[0.64rem] uppercase tracking-[0.1em] text-faint">
                Modes
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="group border-b border-line/60 transition-colors last:border-b-0 hover:bg-raised/60"
              >
                <td className="px-4 py-2.5">
                  <Link
                    href={`/calculators/${row.id}`}
                    className="font-medium text-ink transition-colors group-hover:text-accent"
                  >
                    {row.title}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-muted">{row.result}</td>
                <td className="whitespace-nowrap px-4 py-2.5 text-[0.82rem] text-faint">
                  {row.category}
                </td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums text-muted">
                  {row.modes > 1 ? row.modes : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="px-4 py-12 text-center text-[0.88rem] text-muted">
            Nothing matches that filter.
          </p>
        )}
      </div>
    </div>
  );
}
