'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchDocs, type SearchDoc } from '@/lib/search';

export default function SearchDialog({ docs }: { docs: SearchDoc[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => searchDocs(docs, query), [docs, query]);

  // Cmd/Ctrl+K anywhere, and "/" when not already typing somewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      // Focus after the dialog has painted.
      const t = setTimeout(() => inputRef.current?.focus(), 10);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (doc: SearchDoc | undefined) => {
    if (!doc) return;
    setOpen(false);
    router.push(doc.href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1.5 text-[0.82rem] text-muted transition-colors hover:border-faint/70 hover:text-ink sm:w-60"
      >
        <SearchIcon />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="ml-auto hidden rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[0.66rem] text-faint sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
            <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, results.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    go(results[active]);
                  }
                }}
                placeholder="Search concepts and calculators…"
                className="w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-faint"
              />
              <kbd className="rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[0.66rem] text-faint">
                esc
              </kbd>
            </div>

            <ul ref={listRef} className="scroll-slim max-h-[52vh] overflow-y-auto p-1.5">
              {query && results.length === 0 && (
                <li className="px-3 py-8 text-center text-[0.85rem] text-muted">
                  Nothing matches “{query}”.
                </li>
              )}
              {!query && (
                <li className="px-3 py-8 text-center text-[0.85rem] text-faint">
                  Type to search {docs.length} pages and calculators.
                </li>
              )}
              {results.map((doc, i) => (
                <li key={doc.id} data-index={i}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(doc)}
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      i === active ? 'bg-accent-soft' : 'hover:bg-raised'
                    }`}
                  >
                    <span
                      className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider ${
                        doc.kind === 'calculator'
                          ? 'bg-accent/15 text-accent'
                          : 'bg-line/60 text-muted'
                      }`}
                    >
                      {doc.kind === 'calculator' ? 'calc' : 'wiki'}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.88rem] font-medium text-ink">
                        {doc.title}
                      </span>
                      <span className="mt-0.5 block line-clamp-2 text-[0.76rem] leading-snug text-muted">
                        {doc.subtitle}
                      </span>
                    </span>
                    <span className="mt-0.5 hidden shrink-0 text-[0.68rem] text-faint sm:block">
                      {doc.category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-line bg-raised/50 px-4 py-2 text-[0.7rem] text-faint">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span className="ml-auto">{results.length > 0 && `${results.length} results`}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}
