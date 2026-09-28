import Link from 'next/link';
import type { Page } from '@/lib/content';
import { categoryTitle, getCalculator } from '@/calculators';
import CalculatorBlock from './CalculatorBlock';
import Sidebar, { type SidebarSection } from './Sidebar';
import TableOfContents from './TableOfContents';

/**
 * The article page, shared by the wiki and the equipment section. Both render
 * the same way; they differ only in which pages are in the sidebar, which
 * pages the previous/next links walk through, and the URL prefix.
 */
export default function ArticleLayout({
  page,
  siblings,
  sections,
  basePath,
  areaLabel,
  areaHref,
}: {
  page: Page;
  /** Pages of this area, in reading order, for the previous/next links. */
  siblings: Page[];
  sections: SidebarSection[];
  basePath: string;
  areaLabel: string;
  areaHref: string;
}) {
  const index = siblings.findIndex((p) => p.slug === page.slug);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  const related = page.related
    .map((slug) => siblings.find((p) => p.slug === slug))
    .filter((p): p is Page => Boolean(p));

  const calculators = page.calculators
    .map((id) => {
      const calc = getCalculator(id);
      return calc ? { id, title: calc.title } : null;
    })
    .filter((c): c is { id: string; title: string } => Boolean(c));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[14rem_minmax(0,1fr)_12rem] xl:gap-12">
        <div className="no-print">
          <Sidebar sections={sections} />
        </div>

        <article className="min-w-0">
          <nav className="no-print mb-4 flex items-center gap-1.5 text-[0.78rem] text-faint">
            <Link href={areaHref} className="transition-colors hover:text-ink">
              {areaLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{categoryTitle(page.category)}</span>
            {page.group && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-muted">{page.group}</span>
              </>
            )}
          </nav>

          <header className="border-b border-line pb-6">
            <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.3rem]">
              {page.title}
            </h1>
            {page.summary && (
              <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted">
                {page.summary}
              </p>
            )}
            {page.tags.length > 0 && (
              <ul className="no-print mt-4 flex flex-wrap gap-1.5">
                {page.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-raised/60 px-2.5 py-0.5 font-mono text-[0.68rem] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          {/* Below xl the contents sit above the article instead of in a rail. */}
          <div className="mt-7 xl:hidden">
            <TableOfContents
              headings={page.headings}
              calculators={calculators}
              variant="disclosure"
            />
          </div>

          <div className="prose-wiki">
            {page.segments.map((segment, i) =>
              segment.type === 'html' ? (
                <div key={i} dangerouslySetInnerHTML={{ __html: segment.html }} />
              ) : (
                <CalculatorBlock key={i} id={segment.id} />
              )
            )}
          </div>

          {related.length > 0 && (
            <section className="no-print mt-14 border-t border-line pt-7">
              <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                Related pages
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`${basePath}/${r.slug}`}
                      className="block rounded-lg border border-line bg-surface p-3.5 transition-colors hover:border-accent/40"
                    >
                      <span className="block text-[0.9rem] font-medium text-ink">{r.title}</span>
                      <span className="mt-1 block line-clamp-2 text-[0.8rem] leading-snug text-muted">
                        {r.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav className="no-print mt-10 flex gap-3 border-t border-line pt-6">
            {prev && (
              <Link
                href={`${basePath}/${prev.slug}`}
                className="flex-1 rounded-lg border border-line p-3.5 transition-colors hover:border-accent/40"
              >
                <span className="block text-[0.7rem] text-faint">← Previous</span>
                <span className="mt-0.5 block text-[0.88rem] font-medium text-ink">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`${basePath}/${next.slug}`}
                className="flex-1 rounded-lg border border-line p-3.5 text-right transition-colors hover:border-accent/40"
              >
                <span className="block text-[0.7rem] text-faint">Next →</span>
                <span className="mt-0.5 block text-[0.88rem] font-medium text-ink">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </article>

        <div className="no-print hidden xl:block">
          <TableOfContents headings={page.headings} calculators={calculators} variant="rail" />
        </div>
      </div>
    </div>
  );
}
