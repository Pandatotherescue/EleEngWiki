'use client';

import { useEffect, useState } from 'react';

/**
 * Sticky section links for the long index pages, with the section you are
 * currently looking at highlighted. The wiki index runs to several screens;
 * without this the category headings are only findable by scrolling.
 */
export default function JumpNav({
  items,
}: {
  items: { id: string; label: string; count: number }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const onScroll = () => {
      // The section whose top has most recently passed under the header.
      const line = 180;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <div className="no-print sticky top-14 z-30 border-y border-line bg-bg/90 backdrop-blur-md">
      <div className="scroll-slim mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? 'true' : undefined}
            className={`shrink-0 rounded-md px-2.5 py-1.5 text-[0.82rem] font-medium transition-colors ${
              active === item.id
                ? 'bg-accent-soft text-accent'
                : 'text-muted hover:bg-raised hover:text-ink'
            }`}
          >
            {item.label}
            <span className="ml-1.5 font-mono text-[0.68rem] text-faint">{item.count}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
