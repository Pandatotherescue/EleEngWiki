import Link from 'next/link';
import { getAllPages, getPagesInCategory } from '@/lib/content';
import { ALL_CALCULATORS, CATEGORIES, calculatorsInCategory } from '@/calculators';

export default function HomePage() {
  const pages = getAllPages();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ---- Hero ------------------------------------------------------ */}
      <section className="border-b border-line py-16 sm:py-20">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
          Electrical &amp; RF engineering
        </p>
        <h1 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.7rem]">
          The concept, the formula, and a calculator that actually runs it.
        </h1>
        <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
          {pages.length} reference pages across fundamentals, AC theory and RF, each with the
          working maths embedded in the page. Change the numbers, read the answer, export it as a
          PDF or drop it into your notes as Markdown.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/wiki"
            className="rounded-md bg-accent px-4 py-2 text-[0.9rem] font-medium text-white transition-opacity hover:opacity-90"
          >
            Browse the wiki
          </Link>
          <Link href="/calculators" className="btn px-4 py-2 text-[0.9rem]">
            {ALL_CALCULATORS.length} calculators
          </Link>
        </div>

        <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6">
          <Stat value={String(pages.length)} label="Reference pages" />
          <Stat value={String(ALL_CALCULATORS.length)} label="Calculators" />
          <Stat
            value={String(ALL_CALCULATORS.reduce((n, c) => n + c.modes.length, 0))}
            label="Solve-for modes"
          />
        </dl>
      </section>

      {/* ---- Categories ------------------------------------------------ */}
      <section className="py-14">
        <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-faint">
          Sections
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const catPages = getPagesInCategory(cat.id);
            const catCalcs = calculatorsInCategory(cat.id);
            return (
              <div
                key={cat.id}
                className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-faint/60"
              >
                <h3 className="text-[1.05rem] font-semibold tracking-tight text-ink">
                  {cat.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[0.86rem] leading-relaxed text-muted">
                  {cat.blurb}
                </p>
                <p className="mt-3 font-mono text-[0.72rem] text-faint">
                  {catPages.length} pages · {catCalcs.length} calculators
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {catPages.slice(0, 5).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/wiki/${p.slug}`}
                        className="text-[0.85rem] text-muted transition-colors hover:text-accent"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {catPages.length > 5 && (
                  <Link
                    href={`/wiki#${cat.id}`}
                    className="mt-3 text-[0.8rem] font-medium text-accent transition-opacity hover:opacity-75"
                  >
                    All {catPages.length} pages →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- How it works ---------------------------------------------- */}
      <section className="border-t border-line py-14">
        <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-faint">
          How it works
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <Feature
            title="Units are handled for you"
            body="Every numeric input has a unit dropdown, from picofarads to gigahertz. Results come back in whichever engineering prefix keeps them readable, so you are never counting zeroes."
          />
          <Feature
            title="Solve in either direction"
            body="Most calculators offer several modes — find the cut-off frequency, or find the capacitor that gives you the cut-off you want. The formula on screen updates with the mode."
          />
          <Feature
            title="Take the result with you"
            body="Export any calculation as a tidy PDF with its inputs, results and caveats, or copy it as a Markdown table for a design log or an email."
          />
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-mono text-2xl font-semibold tracking-tight text-ink">
          {value}
        </span>
        <span className="mt-0.5 block text-[0.78rem] text-faint">{label}</span>
      </dd>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-[0.95rem] font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-[0.87rem] leading-relaxed text-muted">{body}</p>
    </div>
  );
}
