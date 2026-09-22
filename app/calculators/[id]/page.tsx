import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_CALCULATORS, calculatorsInCategory, categoryTitle, getCalculator } from '@/calculators';
import { getAllPages } from '@/lib/content';
import CalculatorBlock from '@/components/CalculatorBlock';

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_CALCULATORS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const calc = getCalculator(id);
  if (!calc) return { title: 'Not found' };
  return {
    title: calc.title,
    description: calc.summary,
    openGraph: { title: calc.title, description: calc.summary },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const calc = getCalculator(id);
  if (!calc) notFound();

  // Wiki pages that embed this calculator.
  const pages = getAllPages().filter((p) => p.calculators.includes(id));
  const siblings = calculatorsInCategory(calc.category).filter((c) => c.id !== id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="no-print mb-4 flex items-center gap-1.5 text-[0.78rem] text-faint">
        <Link href="/calculators" className="transition-colors hover:text-ink">
          Calculators
        </Link>
        <span aria-hidden="true">/</span>
        <span>{categoryTitle(calc.category)}</span>
      </nav>

      <header className="border-b border-line pb-6">
        <h1 className="text-balance text-[1.9rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.2rem]">
          {calc.title}
        </h1>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{calc.summary}</p>
      </header>

      <CalculatorBlock id={calc.id} />

      {pages.length > 0 && (
        <section className="no-print mt-8 rounded-lg border border-line bg-raised/40 p-5">
          <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
            Read the theory
          </h2>
          <ul className="mt-3 space-y-2.5">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link href={`/wiki/${p.slug}`} className="group block">
                  <span className="text-[0.92rem] font-medium text-accent transition-opacity group-hover:opacity-75">
                    {p.title} →
                  </span>
                  <span className="mt-0.5 block text-[0.82rem] leading-snug text-muted">
                    {p.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {calc.tags && calc.tags.length > 0 && (
        <ul className="no-print mt-7 flex flex-wrap gap-1.5">
          {calc.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-raised/60 px-2.5 py-0.5 font-mono text-[0.68rem] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {siblings.length > 0 && (
        <section className="no-print mt-12 border-t border-line pt-7">
          <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
            More in {categoryTitle(calc.category)}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {siblings.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/calculators/${s.id}`}
                  className="block rounded-md border border-line bg-surface px-3 py-2 text-[0.86rem] text-muted transition-colors hover:border-accent/40 hover:text-ink"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
