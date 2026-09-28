/**
 * Structural checks on the content directory.
 *
 * Catches the mistakes that a type system cannot: a typo in a [[calc:...]]
 * marker, a `related:` slug that does not exist, a calculator nobody links to,
 * a duplicate slug or order clash.
 *
 * Run with: npx tsx scripts/verify-content.ts
 */
import { getAllPages } from '../lib/content';
import { ALL_CALCULATORS, CATEGORIES } from '../calculators';
import { ALL_TERMS, GLOSSARY_CATEGORIES } from '../glossary';

let failures = 0;
let warnings = 0;

const fail = (msg: string) => {
  failures++;
  console.error(`  FAIL  ${msg}`);
};
const warn = (msg: string) => {
  warnings++;
  console.warn(`  warn  ${msg}`);
};

const pages = getAllPages();
const slugs = new Set<string>(pages.map((p) => p.slug));
const calcIds = new Set<string>(ALL_CALCULATORS.map((c) => c.id));
const categoryIds = new Set<string>(CATEGORIES.map((c) => c.id));
const usedCalcs = new Set<string>();

console.log(`\nChecking ${pages.length} pages and ${ALL_CALCULATORS.length} calculators\n`);

// --- Per-page checks -------------------------------------------------
const seenSlugs = new Set<string>();
const ordersByCategory = new Map<string, Map<number, string>>();

for (const page of pages) {
  if (seenSlugs.has(page.slug)) fail(`duplicate slug: ${page.slug}`);
  seenSlugs.add(page.slug);

  if (!page.title) fail(`${page.slug}: missing title`);
  if (!page.summary) fail(`${page.slug}: missing summary`);
  if (page.summary.length > 200) {
    warn(`${page.slug}: summary is ${page.summary.length} chars (cards look best under 200)`);
  }
  if (!categoryIds.has(page.category)) {
    fail(`${page.slug}: unknown category "${page.category}"`);
  }
  if (page.tags.length === 0) warn(`${page.slug}: no tags, so it is harder to find in search`);

  // Order clashes make the sidebar ordering arbitrary.
  const byOrder = ordersByCategory.get(page.category) ?? new Map();
  if (byOrder.has(page.order)) {
    warn(`${page.slug}: order ${page.order} clashes with ${byOrder.get(page.order)}`);
  }
  byOrder.set(page.order, page.slug);
  ordersByCategory.set(page.category, byOrder);

  for (const id of page.calculators) {
    if (!calcIds.has(id)) fail(`${page.slug}: embeds unknown calculator "${id}"`);
    usedCalcs.add(id);
  }

  for (const rel of page.related) {
    if (!slugs.has(rel)) fail(`${page.slug}: related page "${rel}" does not exist`);
    if (rel === page.slug) warn(`${page.slug}: lists itself as related`);
  }

  if (page.headings.length === 0) {
    warn(`${page.slug}: no headings, so it has no table of contents`);
  }

  // Internal links must resolve, and must point at the area the page lives in.
  const linkPattern = /\/(wiki|equipment)\/([a-z0-9-]+)/g;
  const body = page.segments
    .filter((s): s is { type: 'html'; html: string } => s.type === 'html')
    .map((s) => s.html)
    .join(' ');
  let m: RegExpExecArray | null;
  while ((m = linkPattern.exec(body)) !== null) {
    const [, area, slug] = m;
    const target = pages.find((p) => p.slug === slug);
    if (!target) {
      fail(`${page.slug}: broken internal link to /${area}/${slug}`);
    } else {
      const expected = target.category === 'equipment' ? 'equipment' : 'wiki';
      if (area !== expected) {
        fail(`${page.slug}: link to /${area}/${slug} should be /${expected}/${slug}`);
      }
    }
  }
}

// --- Sub-group consistency -------------------------------------------
/**
 * Within a category, pages either all carry a `group` or none do. A category
 * where only some pages are grouped renders an unlabelled orphan block in the
 * sidebar, and one page arriving without a group is the usual way that happens.
 * The equipment overview is the deliberate exception: it sits above the groups.
 */
for (const cat of CATEGORIES) {
  const inCategory = pages.filter((p) => p.category === cat.id);
  if (inCategory.length === 0) continue;
  const grouped = inCategory.filter((p) => p.group);
  const ungrouped = inCategory.filter((p) => !p.group);

  if (grouped.length > 0 && ungrouped.length > 0) {
    const exempt = cat.id === 'equipment' && ungrouped.length === 1;
    if (!exempt) {
      for (const p of ungrouped) {
        fail(`${p.slug}: no group, but ${grouped.length} other ${cat.title} pages are grouped`);
      }
    }
  }

  // A group of one reads as a mistake in a sidebar next to groups of four.
  const sizes = new Map<string, number>();
  for (const p of grouped) sizes.set(p.group, (sizes.get(p.group) ?? 0) + 1);
  for (const [name, n] of sizes) {
    if (n === 1) warn(`${cat.title}: group "${name}" has only one page`);
  }
}

// --- Coverage --------------------------------------------------------
for (const calc of ALL_CALCULATORS) {
  if (!usedCalcs.has(calc.id)) {
    warn(`calculator "${calc.id}" is not embedded in any wiki page`);
  }
  if (!categoryIds.has(calc.category)) {
    fail(`calculator "${calc.id}": unknown category "${calc.category}"`);
  }

  /**
   * Two outputs sharing a label render as the same row twice — the link budget
   * listed "Received power" in both dBm and watts, several rows apart, which
   * read as a bug rather than a convenience. Labels also become the row headings
   * in the PDF and Markdown exports, where the ambiguity survives the copy.
   */
  for (const mode of calc.modes) {
    const seen = new Map<string, number>();
    for (const out of mode.outputs) {
      seen.set(out.label, (seen.get(out.label) ?? 0) + 1);
    }
    for (const [label, n] of seen) {
      if (n > 1) {
        fail(`calculator "${calc.id}" (${mode.label}): ${n} outputs both labelled "${label}"`);
      }
    }
    if (mode.outputs.filter((o) => o.primary).length > 1) {
      warn(`calculator "${calc.id}" (${mode.label}): more than one primary output`);
    }
  }
}

// --- Glossary --------------------------------------------------------
const termNames = new Set<string>(ALL_TERMS.map((t) => t.term));
const glossaryCategoryIds = new Set<string>(GLOSSARY_CATEGORIES.map((c) => c.id));
const seenTerms = new Set<string>();

for (const entry of ALL_TERMS) {
  if (seenTerms.has(entry.term)) fail(`glossary: duplicate term "${entry.term}"`);
  seenTerms.add(entry.term);

  if (!glossaryCategoryIds.has(entry.category)) {
    fail(`glossary "${entry.term}": unknown category "${entry.category}"`);
  }
  if (!entry.definition || entry.definition.length < 30) {
    fail(`glossary "${entry.term}": definition is missing or too short`);
  }
  if (entry.definition.length > 400) {
    warn(`glossary "${entry.term}": definition is ${entry.definition.length} chars, consider trimming`);
  }
  if (entry.page && !slugs.has(entry.page)) {
    fail(`glossary "${entry.term}": links to page "${entry.page}" which does not exist`);
  }
  for (const ref of entry.see ?? []) {
    if (!termNames.has(ref)) {
      fail(`glossary "${entry.term}": see-also "${ref}" is not a term`);
    }
  }
}

for (const cat of GLOSSARY_CATEGORIES) {
  const n = ALL_TERMS.filter((t) => t.category === cat.id).length;
  if (n === 0) fail(`glossary category "${cat.id}" has no terms`);
  else console.log(`  ok    glossary / ${cat.title}: ${n} terms`);
}

for (const cat of CATEGORIES) {
  const n = pages.filter((p) => p.category === cat.id).length;
  if (n === 0) fail(`category "${cat.id}" has no pages`);
  else console.log(`  ok    ${cat.title}: ${n} pages`);
}

console.log(
  `\n${pages.length} pages, ${usedCalcs.size}/${ALL_CALCULATORS.length} calculators embedded, ` +
    `${ALL_TERMS.length} glossary terms, ${failures} failures, ${warnings} warnings\n`
);

process.exit(failures > 0 ? 1 : 0);
