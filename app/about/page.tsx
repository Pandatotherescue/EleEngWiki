import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_CALCULATORS } from '@/calculators';
import { getAllPages } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'What EleEngWiki is, how the calculators work, and how to add to it.',
};

export default function AboutPage() {
  const pages = getAllPages();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.3rem]">About</h1>

      <div className="prose-wiki mt-8">
        <p>
          EleEngWiki is a reference for electrical and RF engineering. It currently holds{' '}
          {pages.length} concept pages and {ALL_CALCULATORS.length} calculators. The idea is
          simple: the explanation and the working arithmetic belong on the same page, so you can
          read why a formula holds and immediately put numbers through it.
        </p>

        <h2>How the calculators work</h2>
        <p>
          Every calculator is a declaration — a list of inputs, a list of outputs, and a function
          in between. One component renders all of them, so they all behave identically: the same
          unit dropdowns, the same engineering-notation results, the same export buttons.
        </p>
        <p>
          Values are converted to SI base units before they reach the maths, and formatted back
          into a sensible prefix on the way out. That is why you can type a capacitance in
          picofarads and a frequency in gigahertz and get an answer in nanohenries without
          thinking about it.
        </p>
        <p>
          Several calculators offer multiple modes. These are usually the same relationship
          rearranged — find the cut-off frequency, or find the capacitor that gives you the
          cut-off you want.
        </p>

        <h2>Accuracy and limits</h2>
        <p>
          The formulas here are the standard closed-form approximations. Where a model has known
          limits — the Hammerstad microstrip equations, IPC-2221 trace widths, the annulus
          approximation for skin effect — those limits are listed under{' '}
          <em>Assumptions &amp; caveats</em> on the calculator itself and carried into any PDF you
          export.
        </p>
        <p>
          The calculator library ships with a verification suite that checks every mode against
          hand-worked reference cases. Run it with:
        </p>
        <pre>
          <code>npm run verify</code>
        </pre>
        <p>
          That said: this is a reference, not an authority. Anything safety-related, regulatory or
          expensive deserves a primary source and a second opinion.
        </p>

        <h2>Adding a page</h2>
        <p>
          Pages are plain Markdown files in <code>content/&lt;category&gt;/&lt;slug&gt;.md</code>{' '}
          with a little frontmatter. To drop a calculator into the middle of a page, put its id on
          a line of its own:
        </p>
        <pre>
          <code>{`---
title: Ohm's Law
category: fundamentals
summary: The relationship between voltage, current and resistance.
tags: [ohm, voltage, current]
order: 1
related: [dc-power, voltage-divider]
---

Some prose, and inline maths like $V = IR$.

[[calc:ohms-law]]

More prose after the calculator.`}</code>
        </pre>
        <p>
          Adding a calculator means adding one object to a file in <code>calculators/</code> — it
          shows up in the index, the search and the category listing on its own.
        </p>

        <h2>Built with</h2>
        <p>
          Next.js and Tailwind CSS, rendered to static pages at build time. Maths is typeset with
          KaTeX on the server, so no maths library is shipped to your browser. PDF export happens
          entirely client-side; nothing you type is sent anywhere.
        </p>
      </div>

      <div className="mt-10 flex gap-3 border-t border-line pt-7">
        <Link href="/wiki" className="btn">
          Browse the wiki
        </Link>
        <Link href="/calculators" className="btn">
          All calculators
        </Link>
      </div>
    </div>
  );
}
