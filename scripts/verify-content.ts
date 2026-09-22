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

  // Internal links written as /wiki/<slug> must resolve.
  const linkPattern = /\/wiki\/([a-z0-9-]+)/g;
  const body = page.segments
    .filter((s): s is { type: 'html'; html: string } => s.type === 'html')
    .map((s) => s.html)
    .join(' ');
  let m: RegExpExecArray | null;
  while ((m = linkPattern.exec(body)) !== null) {
    if (!slugs.has(m[1])) fail(`${page.slug}: broken internal link to /wiki/${m[1]}`);
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
}

for (const cat of CATEGORIES) {
  const n = pages.filter((p) => p.category === cat.id).length;
  if (n === 0) fail(`category "${cat.id}" has no pages`);
  else console.log(`  ok    ${cat.title}: ${n} pages`);
}

console.log(
  `\n${pages.length} pages, ${usedCalcs.size}/${ALL_CALCULATORS.length} calculators embedded, ` +
    `${failures} failures, ${warnings} warnings\n`
);

process.exit(failures > 0 ? 1 : 0);
