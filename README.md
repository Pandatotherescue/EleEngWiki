# EleEngWiki

A reference wiki for electrical and RF engineering where every concept page carries
the working calculator for that concept, and every result can be exported as a PDF
or copied as a Markdown table.

**38 concept pages · 34 calculators · 51 solve-for modes**

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run verify       # check the calculator maths and the content structure
```

## Deploying to Vercel

The project is a stock Next.js app, so Vercel needs no configuration.

**Option A — from this folder, in about a minute:**

```bash
npx vercel
```

The first run asks you to log in (it opens a browser), then asks a few questions —
accept the defaults. A second run with `npx vercel --prod` promotes it to the
production URL.

**Option B — via GitHub, so every push redeploys:**

```bash
git remote add origin https://github.com/<you>/eleengwiki.git
git push -u origin main
```

Then import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects
Next.js, builds it, and rebuilds on every push.

Everything is statically generated and there is no backend, no database and no
server-side work at request time, so it runs comfortably inside the free tier.

If you use a custom domain, set `NEXT_PUBLIC_SITE_URL` in the Vercel project settings
so the sitemap and canonical URLs point at it.

---

## How it is put together

```
app/                  routes — home, /wiki, /wiki/[slug], /calculators, /calculators/[id]
calculators/          the calculator definitions, grouped by category
  fundamentals.ts
  ac.ts
  rf.ts
  index.ts            registry and category list
components/
  Calculator.tsx      one client component that renders every calculator
  CalculatorBlock.tsx server wrapper; pre-renders formulas with KaTeX
  SearchDialog.tsx    ⌘K search over pages and calculators
content/              the wiki, as plain Markdown
  fundamentals/  ac/  rf/
lib/
  units.ts            quantities, unit ladders, physical constants
  format.ts           engineering-notation formatting
  calculator-types.ts the calculator definition format
  content.ts          Markdown loader: frontmatter, KaTeX, calculator embedding
  export.ts           PDF and Markdown export
  pdf-fonts.ts        Unicode font embedding for PDF export
  search.ts           ranking (client) / search-index.ts (build time)
public/fonts/         subset DejaVu fonts used in exported PDFs
scripts/              verification suites and the font subsetter
```

### The calculator engine

Every calculator is a plain object — a list of inputs, a list of outputs, and a
function between them. A single component renders all of them, which is why they all
behave identically.

```ts
export const ohmsLaw: CalculatorDef = {
  id: 'ohms-law',
  title: "Ohm's Law",
  category: 'fundamentals',
  summary: '...',
  modes: [
    {
      id: 'voltage',
      label: 'Solve for voltage',
      formula: 'V = I \\cdot R',              // KaTeX, rendered on the server
      fields: [
        { kind: 'number', key: 'i', label: 'Current',
          quantity: 'current', default: 100, defaultUnit: 'mA' },
        { kind: 'number', key: 'r', label: 'Resistance',
          quantity: 'resistance', default: 220 },
      ],
      outputs: [
        { key: 'v', label: 'Voltage', quantity: 'voltage', primary: true },
        { key: 'p', label: 'Power dissipated', quantity: 'power' },
      ],
      compute: (v) => ({ v: num(v, 'i') * num(v, 'r'), p: ... }),
    },
  ],
  assumptions: ['Assumes a linear, ohmic resistance at a constant temperature.'],
};
```

**Units are handled outside `compute`.** Values arrive in SI base units — ohms, volts,
hertz, metres, seconds — whatever the user selected in the dropdown. Results are
formatted back into a readable engineering prefix on the way out. Calculator authors
never deal with prefixes.

Field kinds are `number` (with a unit dropdown), `select`, and `list` (a
comma-separated series, used for component networks and cascade stages).

`modes` are usually the same relationship rearranged. A single-mode calculator can be
declared more briefly with the `single()` helper.

### Adding a calculator

Add the object to `calculators/fundamentals.ts`, `ac.ts` or `rf.ts`, then append it to
that file's exported array. It appears in the index, the category listing and the
search automatically. Add a reference case to `scripts/verify-calculators.ts` while
the arithmetic is fresh in your mind.

### Adding a wiki page

Drop a Markdown file into `content/<category>/<slug>.md`:

```markdown
---
title: Ohm's Law
category: fundamentals
summary: The relationship between voltage, current and resistance.
tags: [ohm, voltage, current]
order: 1
related: [dc-power, voltage-divider]
---

Prose, with inline maths like $V = IR$ and display maths:

$$
R = \rho \frac{l}{A}
$$

[[calc:ohms-law]]

More prose after the calculator.
```

A line containing only `[[calc:<id>]]` embeds that calculator at that point in the
page. Pages are **plain Markdown rather than MDX** deliberately: engineering prose is
full of inequalities, braces and stray angle brackets, all of which break MDX parsing.

Display maths must use the fenced form (`$$` on its own line, content, `$$` on its own
line). A single-line `$$x$$` is parsed as *inline* maths by the CommonMark maths
extension.

---

## Verification

```bash
npm run verify           # both suites
npm run verify:calc      # maths only
npm run verify:content   # content structure only
```

`verify-calculators.ts` does two things: it runs every mode of every calculator on its
defaults and fails on `NaN`, a missing output key or an unused return key; then it
checks 34 hand-worked reference cases — Ohm's law, the WR-90 cut-off, a 6 dB
attenuator pad, copper skin depth at 10 MHz, a 50 Ω microstrip on 0.8 mm FR-4, and so
on — against expected values with a stated tolerance.

`verify-content.ts` checks the content directory: no broken `[[calc:...]]` markers, no
`related:` slug that does not exist, no broken `/wiki/...` link in any page body, no
duplicate slugs, no orphaned calculators, and warns about ordering clashes and missing
tags.

Both run in a second or two and are worth running before every commit.

---

## Notable implementation details

**KaTeX never reaches the browser.** Formulas are rendered to HTML on the server —
both in page content and in the calculator headers — so pages ship finished markup.
Only the KaTeX stylesheet is loaded client-side.

**PDF export embeds a Unicode font.** jsPDF's built-in fonts are WinAnsi-encoded and
render Ω, Γ, λ, δ, µ and ° as stray punctuation, which would ruin nearly every result
on this site. `public/fonts/` holds subsets of DejaVu Sans and DejaVu Sans Mono
(~40 KB each) covering Latin, Greek and the maths symbols used here. They are fetched
only when someone clicks Export, and there is an ASCII transliteration fallback if the
fetch fails. Regenerate them with `npm run fonts`.

**jsPDF is dynamically imported**, so it is not in the initial bundle.

**No webfonts.** The UI uses system font stacks — nothing to download, no layout shift,
and no build-time dependency on an external font service. Swap the stacks in
`tailwind.config.ts` if you want something else.

**Theming** is CSS custom properties on `:root` and `.dark`, with a small inline script
in `app/layout.tsx` applying the stored preference before first paint so there is no
flash. The choice persists in `localStorage`, and every read and write is wrapped in
`try/catch` for private-mode browsers.

**Search** is a prebuilt JSON index over page titles, summaries, tags, body text and
calculator field labels, ranked by a small dependency-free scoring function. Open it
with ⌘K, Ctrl+K, or `/`.

---

## Accuracy

The formulas here are the standard closed-form approximations, and several have
well-known limits — the Hammerstad–Wheeler microstrip equations, IPC-2221 trace
widths, the annulus approximation for skin effect. Those limits are stated under
*Assumptions & caveats* on each calculator and carried into every exported PDF.

It is a reference, not an authority. Anything safety-related, regulatory or expensive
deserves a primary source and a second opinion.

---

## Licence

Code and content: yours to do as you like with.

The fonts in `public/fonts/` are subsets of DejaVu Sans, derived from Bitstream Vera
under a permissive licence — see `public/fonts/LICENSE.txt`, which must be kept if you
redistribute them.
