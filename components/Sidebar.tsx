'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export type SidebarItem = { slug: string; title: string; href: string };
export type SidebarGroup = { name: string; items: SidebarItem[] };
export type SidebarSection = { id: string; title: string; groups: SidebarGroup[] };

/**
 * Section navigation.
 *
 * Only the section containing the current page is expanded; the others collapse
 * to a single clickable heading. With 38 pages in the wiki, showing them all at
 * once buried the few that were relevant.
 */
export default function Sidebar({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeSectionId =
    sections.find((s) => s.groups.some((g) => g.items.some((i) => i.href === pathname)))?.id ??
    sections[0]?.id;

  const [openIds, setOpenIds] = useState<string[]>(activeSectionId ? [activeSectionId] : []);

  // Follow the reader: navigating into another section opens it.
  useEffect(() => {
    if (activeSectionId) {
      setOpenIds((prev) => (prev.includes(activeSectionId) ? prev : [...prev, activeSectionId]));
    }
  }, [activeSectionId]);

  const toggle = (id: string) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const nav = (
    <nav className="space-y-1">
      {sections.map((section) => {
        const open = openIds.includes(section.id);
        const count = section.groups.reduce((n, g) => n + g.items.length, 0);
        const isActive = section.id === activeSectionId;

        return (
          <div key={section.id}>
            <button
              type="button"
              onClick={() => toggle(section.id)}
              aria-expanded={open}
              className={`flex w-full items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left transition-colors hover:bg-raised ${
                isActive ? 'text-ink' : 'text-muted'
              }`}
            >
              <svg
                viewBox="0 0 12 12"
                className={`h-2.5 w-2.5 shrink-0 text-faint transition-transform ${open ? 'rotate-90' : ''}`}
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
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em]">
                {section.title}
              </span>
              <span className="ml-auto font-mono text-[0.62rem] text-faint">{count}</span>
            </button>

            {open && (
              <div className="mb-3 mt-1 space-y-3">
                {section.groups.map((group, gi) => (
                  <div key={group.name || gi}>
                    {group.name && (
                      <h4 className="mb-1 pl-3 text-[0.7rem] font-medium text-faint">
                        {group.name}
                      </h4>
                    )}
                    <ul className="space-y-px border-l border-line pl-0">
                      {group.items.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <li key={item.slug}>
                            <Link
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              aria-current={active ? 'page' : undefined}
                              className={`-ml-px block border-l py-[0.28rem] pl-3 text-[0.82rem] leading-snug transition-colors ${
                                active
                                  ? 'border-accent font-medium text-accent'
                                  : 'border-transparent text-muted hover:border-faint/60 hover:text-ink'
                              }`}
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="btn mb-4 w-full justify-between lg:hidden"
        aria-expanded={mobileOpen}
      >
        <span>Browse sections</span>
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="mb-6 rounded-lg border border-line bg-surface p-3 lg:hidden">{nav}</div>
      )}

      <aside className="scroll-slim hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
        {nav}
      </aside>
    </>
  );
}
