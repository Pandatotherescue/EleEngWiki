import type { Metadata } from 'next';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import './globals.css';
import HeaderNav from '@/components/HeaderNav';
import SearchDialog from '@/components/SearchDialog';
import ThemeToggle from '@/components/ThemeToggle';
import { buildSearchIndex } from '@/lib/search-index';
import { BUILD_YEAR, COPYRIGHT_HOLDER } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: 'EleEngWiki — Electrical & RF Engineering Reference',
    template: '%s — EleEngWiki',
  },
  description:
    'A reference for electrical and RF engineering: concept pages with working calculators, and catalogues of professional radio hardware.',
  // Set NEXT_PUBLIC_SITE_URL in the Vercel project settings so canonical URLs,
  // the sitemap and social previews point at the deployment's real hostname.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eleengwiki.vercel.app'),
  openGraph: {
    title: 'EleEngWiki',
    description:
      'Electrical and RF engineering concepts with interactive calculators and exportable results.',
    type: 'website',
  },
};

/**
 * Applied before first paint so a dark-mode visitor never sees a white flash.
 * Kept deliberately tiny and dependency-free.
 */
const THEME_SCRIPT = `
(function(){
  try {
    var stored = localStorage.getItem('eew-theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

const NAV = [
  { href: '/wiki', label: 'Wiki' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/equipment', label: 'Equipment' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/about', label: 'About' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = buildSearchIndex();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-bg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>

        <header className="no-print sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
            <Link href="/" className="group flex shrink-0 items-center gap-2">
              <WaveMark />
              <span className="text-[0.95rem] font-semibold tracking-tight text-ink">
                EleEng<span className="text-accent">Wiki</span>
              </span>
            </Link>

            <HeaderNav items={NAV} variant="bar" />

            <div className="ml-auto flex items-center gap-2">
              <SearchDialog docs={searchIndex} />
              <ThemeToggle />
            </div>
          </div>

          {/*
            Below sm the nav above is hidden, so the sections get their own
            scrollable strip. Without it there is no way to reach them on a
            phone except through search.
          */}
          <HeaderNav items={NAV} variant="strip" />
        </header>

        <main id="main">{children}</main>

        <footer className="no-print mt-20 border-t border-line bg-surface/50">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-sm">
                <div className="flex items-center gap-2">
                  <WaveMark />
                  <span className="text-[0.9rem] font-semibold text-ink">EleEngWiki</span>
                </div>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">
                  A reference for electrical and RF engineering. Every calculation is a
                  simplified model — check anything that matters against a primary source.
                </p>
              </div>
              <nav className="flex gap-10 text-[0.82rem]">
                <div>
                  <h4 className="mb-2 font-mono text-[0.64rem] uppercase tracking-wider text-faint">
                    Browse
                  </h4>
                  <ul className="space-y-1.5">
                    {NAV.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 text-[0.75rem] text-faint sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <p className="max-w-xl">
                Content is provided as-is for reference and study. Not a substitute for the
                relevant standards or a qualified engineer&apos;s judgement.
              </p>
              <p className="shrink-0 sm:text-right">
                &copy; {BUILD_YEAR} {COPYRIGHT_HOLDER}.
                <br className="hidden sm:block" />{' '}
                <Link
                  href="/about#licence"
                  className="underline decoration-line underline-offset-2 transition-colors hover:text-muted"
                >
                  Free to use with attribution
                </Link>
                .
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function WaveMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c2.2 0 2.2-6 4.4-6s2.2 12 4.4 12 2.2-9 4.4-9 2.2 3 4.4 3" />
    </svg>
  );
}
