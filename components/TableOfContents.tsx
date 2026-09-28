'use client';

import { useState } from 'react';

export type Heading = { id: string; text: string; depth: number };

/**
 * On-page navigation.
 *
 * The sticky rail only fits from xl upwards. Below that it becomes a
 * disclosure above the article rather than disappearing — the longest pages on
 * the site are the ones most likely to be read on a narrow screen.
 */
export default function TableOfContents({
  headings,
  calculators,
  variant,
}: {
  headings: Heading[];
  calculators: { id: string; title: string }[];
  /** 'disclosure' sits above the article below xl; 'rail' is the sticky column at xl. */
  variant: 'disclosure' | 'rail';
}) {
  const [open, setOpen] = useState(false);

  if (headings.length < 2 && calculators.length === 0) return null;

  const list = (
    <>
      {headings.length > 1 && (
        <ul className="space-y-1 border-l border-line">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={() => setOpen(false)}
                className={`-ml-px block border-l border-transparent py-0.5 text-[0.78rem] leading-snug text-muted transition-colors hover:border-faint/60 hover:text-ink ${
                  h.depth === 3 ? 'pl-5' : 'pl-3'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}

      {calculators.length > 0 && (
        <div className={headings.length > 1 ? 'mt-5' : ''}>
          <h3 className="mb-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
            Calculators here
          </h3>
          <ul className="space-y-1">
            {calculators.map((c) => (
              <li key={c.id}>
                <a
                  href={`#calc-${c.id}`}
                  onClick={() => setOpen(false)}
                  className="block text-[0.78rem] leading-snug text-accent transition-opacity hover:opacity-75"
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  if (variant === 'rail') {
    return (
      <div className="sticky top-24">
        <h2 className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
          On this page
        </h2>
        {list}
      </div>
    );
  }

  return (
    <div className="no-print mb-7">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-left text-[0.82rem] text-muted transition-colors hover:border-faint/70 hover:text-ink"
      >
        <svg
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
          aria-hidden="true"
        >
          <path
            d="M4 2l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        On this page
        <span className="ml-auto font-mono text-[0.68rem] text-faint">
          {headings.length} sections
        </span>
      </button>
      {open && <div className="mt-3 px-1">{list}</div>}
    </div>
  );
}
