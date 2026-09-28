# EleEngWiki

A reference wiki for electrical and RF engineering where every concept page carries
the working calculator for that concept, and every result can be exported as a PDF
or copied as a Markdown table.

**38 concept pages · 10 equipment catalogues · 180 glossary terms · 34 calculators · 51 solve-for modes**

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
app/                  routes
  page.tsx            home
  wiki/               /wiki and /wiki/[slug]      — concept pages
  equipment/          /equipment and /[slug]      — hardware catalogues
  glossary/           /glossary                   — terms and definitions
  calculators/        /calculators and /[id]      — the tool index
calculators/          the calculator definitions, grouped by category
  fundamentals.ts  ac.ts  rf.ts
  index.ts            registry and category list
glossary/             glossary entries, grouped by category
  entries-*.ts        electrical, rf, signals, operations
  types.ts            entry shape and category list
  index.ts            sorted registry
components/
  ArticleLayout.tsx   the article page, shared by wiki and equipment
  Calculator.tsx      one client component that renders every calculator
  CalculatorBlock.tsx server wrapper; pre-renders formulas with KaTeX
  CalculatorTable.tsx the filterable calculator index
  GlossaryBrowser.tsx the filterable glossary with its A-Z index
  HeaderNav.tsx       the header links, marking the active section
  Sidebar.tsx         section nav; collapses everything but the active section
  TableOfContents.tsx sticky rail at xl, disclosure below it
  JumpNav.tsx         sticky section links for the long index pages
  TagList.tsx         article tags; open the search pre-filled
  SearchDialog.tsx    ⌘K search over pages, calculators and glossary terms
content/              all article content, as plain Markdown
  fundamentals/  ac/  rf/  equipment/
lib/
  units.ts            quantities, unit ladders, physical constants
  format.ts           engineering-notation formatting
  calculator-types.ts the calculator definition format
  content.ts          Markdown loader: frontmatter, KaTeX, calculator embedding
  navigation.ts       which pages belong to which area, and their URLs
  export.ts           PDF and Markdown export
  pdf-fonts.ts        Unicode font embedding for PDF export
  search.ts           ranking (client) / search-index.ts (build time)
public/fonts/         subset DejaVu fonts used in exported PDFs
scripts/              verification suites and the font subsetter
```

### Two areas, one article layout

Articles live in two browsable areas. **Wiki** explains how things work; **Equipment**
catalogues what hardware exists. They render through the same `ArticleLayout` and
differ only in which pages populate the sidebar and previous/next links.

A page's `category` decides its area — `equipment` goes to `/equipment/<slug>`,
everything else to `/wiki/<slug>`. `lib/navigation.ts` owns that mapping, so
adding a category to one area or the other is a one-line change there.

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
group: Circuit theory
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
page. `group` is optional: categories that declare it get sub-headings in the
sidebar and on the index, and categories that leave it out render as one flat
list. Keep `order` contiguous within a group, since groups are emitted in the
order their first page appears. Pages are **plain Markdown rather than MDX** deliberately: engineering prose is
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

`verify-content.ts` also checks the glossary: no duplicate terms, no definition that
is missing, stubby or overlong, no `page` pointing at a slug that does not exist, and
no `see` reference to a term that is not defined.

It checks the content directory for: no broken `[[calc:...]]` markers, no
`related:` slug that does not exist, no broken internal link in any page body — including
that a link points at the area the target actually lives in — no duplicate slugs, no
orphaned calculators, and warns about ordering clashes and missing tags.

Two checks exist because the mistakes they catch had already been made. Within a
category, pages either all carry a `group` or none do, because one page arriving
without one renders an unlabelled orphan block in the sidebar. And no two outputs of
a calculator mode may share a label: the link budget once listed "Received power"
twice, in dBm and in watts, several rows apart, and the ambiguity survived into the
PDF and Markdown exports. Adding that second check immediately found two more
calculators doing the same thing.

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

© Jakob Persson. Free to use, adapt and redistribute, including commercially, as long
as you give credit. Two licences, because it is two kinds of work — see `LICENSE` for
the full text:

- **Code** — everything outside `content/` and `glossary/` — under the MIT licence.
- **Content** — the articles and the glossary — under CC BY 4.0. MIT is written for
  software and reads oddly applied to prose, so the writing is licensed separately.
  The condition is the same either way: attribution.

The holder's name lives in `lib/site.ts` alongside the copyright year, which is fixed
at build time and refreshes on every deploy. The footer and the About page both read
it from there, so changing it in one place changes it everywhere.

The fonts in `public/fonts/` are subsets of DejaVu Sans, derived from Bitstream Vera
under a permissive licence — see `public/fonts/LICENSE.txt`, which must be kept if you
redistribute them.
