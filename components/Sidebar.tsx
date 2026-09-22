'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export type SidebarSection = {
  id: string;
  title: string;
  items: { slug: string; title: string }[];
};

export default function Sidebar({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="space-y-6">
      {sections.map((section) => (
        <div key={section.id}>
          <h3 className="mb-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-faint">
            {section.title}
          </h3>
          <ul className="space-y-px border-l border-line">
            {section.items.map((item) => {
              const href = `/wiki/${item.slug}`;
              const active = pathname === href;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`-ml-px block border-l py-[0.3rem] pl-3 text-[0.83rem] leading-snug transition-colors ${
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
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="btn mb-4 w-full justify-between lg:hidden"
        aria-expanded={mobileOpen}
      >
        <span>Browse topics</span>
        <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="mb-6 rounded-lg border border-line bg-surface p-4 lg:hidden">{nav}</div>
      )}

      <aside className="scroll-slim hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
        {nav}
      </aside>
    </>
  );
}
