import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPages, getPage } from '@/lib/content';
import { CATEGORIES, categoryTitle, getCalculator } from '@/calculators';
import CalculatorBlock from '@/components/CalculatorBlock';
import Sidebar, { type SidebarSection } from '@/components/Sidebar';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return { title: 'Not found' };
  return {
    title: page.title,
    description: page.summary,
    openGraph: { title: page.title, description: page.summary },
  };
}

function sidebarSections(): SidebarSection[] {
  return CATEGORIES.map((cat) => ({
    id: cat.id,
    title: cat.title,
    items: getAllPages()
      .filter((p) => p.category === cat.id)
      .map((p) => ({ slug: p.slug, title: p.title })),
  })).filter((s) => s.items.length > 0);
}

export default async function WikiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const all = getAllPages();
  const index = all.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  const related = page.related
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[14rem_minmax(0,1fr)_12rem] xl:gap-12">
        {/* ---- Left nav ------------------------------------------------ */}
        <div className="no-print">
          <Sidebar sections={sidebarSections()} />
        </div>

        {/* ---- Article ------------------------------------------------- */}
        <article className="min-w-0">
          <nav className="no-print mb-4 flex items-center gap-1.5 text-[0.78rem] text-faint">
            <Link href="/wiki" className="transition-colors hover:text-ink">
              Wiki
            </Link>
            <span aria-hidden="true">/</span>
            <span>{categoryTitle(page.category)}</span>
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

          <div className="prose-wiki mt-8">
            {page.segments.map((segment, i) =>
              segment.type === 'html' ? (
                <div key={i} dangerouslySetInnerHTML={{ __html: segment.html }} />
              ) : (
                <CalculatorBlock key={i} id={segment.id} />
              )
            )}
          </div>

          {/* ---- Related ----------------------------------------------- */}
          {related.length > 0 && (
            <section className="no-print mt-14 border-t border-line pt-7">
              <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                Related pages
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/wiki/${r.slug}`}
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

          {/* ---- Prev / next -------------------------------------------- */}
          <nav className="no-print mt-10 flex gap-3 border-t border-line pt-6">
            {prev && (
              <Link
                href={`/wiki/${prev.slug}`}
                className="group flex-1 rounded-lg border border-line p-3.5 transition-colors hover:border-accent/40"
              >
                <span className="block text-[0.7rem] text-faint">← Previous</span>
                <span className="mt-0.5 block text-[0.88rem] font-medium text-ink">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/wiki/${next.slug}`}
                className="group flex-1 rounded-lg border border-line p-3.5 text-right transition-colors hover:border-accent/40"
              >
                <span className="block text-[0.7rem] text-faint">Next →</span>
                <span className="mt-0.5 block text-[0.88rem] font-medium text-ink">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </article>

        {/* ---- On this page -------------------------------------------- */}
        <div className="no-print hidden xl:block">
          <div className="sticky top-24 space-y-6">
            {page.headings.length > 1 && (
              <div>
                <h2 className="mb-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-faint">
                  On this page
                </h2>
                <ul className="space-y-1 border-l border-line">
                  {page.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`-ml-px block border-l border-transparent py-0.5 text-[0.78rem] leading-snug text-muted transition-colors hover:border-faint/60 hover:text-ink ${
                          h.depth === 3 ? 'pl-5' : 'pl-3'
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {page.calculators.length > 0 && (
              <div>
                <h2 className="mb-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-faint">
                  Calculators here
                </h2>
                <ul className="space-y-1">
                  {page.calculators.map((id) => {
                    const calc = getCalculator(id);
                    if (!calc) return null;
                    return (
                      <li key={id}>
                        <a
                          href={`#calc-${id}`}
                          className="block text-[0.78rem] leading-snug text-accent transition-opacity hover:opacity-75"
                        >
                          {calc.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
