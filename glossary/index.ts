import type { GlossaryEntry } from './types';
import { electricalTerms } from './entries-electrical';
import { rfTerms } from './entries-rf';
import { signalTerms } from './entries-signals';
import { operationsTerms } from './entries-operations';

export * from './types';

/** Case- and punctuation-insensitive sort, so "dBm" files under D. */
function sortKey(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

export const ALL_TERMS: GlossaryEntry[] = [
  ...electricalTerms,
  ...rfTerms,
  ...signalTerms,
  ...operationsTerms,
].sort((a, b) => sortKey(a.term).localeCompare(sortKey(b.term)));

const byTerm = new Map(ALL_TERMS.map((e) => [e.term.toLowerCase(), e]));

export function getTerm(term: string): GlossaryEntry | undefined {
  return byTerm.get(term.toLowerCase());
}

export function termsInCategory(category: string): GlossaryEntry[] {
  return ALL_TERMS.filter((e) => e.category === category);
}
