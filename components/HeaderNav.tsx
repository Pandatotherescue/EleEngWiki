'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavItem = { href: string; label: string };

/**
 * The header nav, with the current section marked. Without this the only
 * "where am I" cue was the breadcrumb on article pages — the index pages
 * (/calculators, /glossary) gave the reader nothing at all.
 */
export default function HeaderNav({
  items,
  variant,
}: {
  items: NavItem[];
  /** 'bar' is the desktop row; 'strip' is the scrollable one below sm. */
  variant: 'bar' | 'strip';
}) {
  const pathname = usePathname() ?? '/';

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  if (variant === 'strip') {
    return (
      <nav
        aria-label="Sections"
        className="scroll-slim -mt-1 flex gap-1 overflow-x-auto border-t border-line/70 px-4 py-1.5 sm:hidden"
      >
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`shrink-0 rounded-md px-2.5 py-1 text-[0.82rem] transition-colors ${
                active
                  ? 'bg-accent-soft font-medium text-accent'
                  : 'text-muted hover:bg-raised hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Sections" className="ml-3 hidden items-center gap-1 sm:flex">
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`rounded-md px-2.5 py-1.5 text-[0.85rem] transition-colors ${
              active
                ? 'bg-accent-soft font-medium text-accent'
                : 'text-muted hover:bg-raised hover:text-ink'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
