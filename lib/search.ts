/**
 * Client-safe half of the search system: the document shape and the ranking
 * function. Index construction lives in `search-index.ts`, which reads the
 * content directory and therefore must stay on the server.
 */
export type SearchDoc = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  kind: 'page' | 'calculator';
  category: string;
  /** Lower-cased haystack: tags, summary and body text. */
  text: string;
};

/**
 * Small, dependency-free ranking. Exact and prefix matches on the title
 * dominate; body matches only break ties. Every query term must appear
 * somewhere, so multi-word queries narrow rather than widen.
 */
export function searchDocs(docs: SearchDoc[], query: string, limit = 12): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored: { doc: SearchDoc; score: number }[] = [];

  for (const doc of docs) {
    const title = doc.title.toLowerCase();
    let score = 0;
    let missing = false;

    for (const term of terms) {
      let termScore = 0;
      if (title === term) termScore += 120;
      else if (title.startsWith(term)) termScore += 70;
      else if (title.includes(term)) termScore += 45;

      if (doc.subtitle.toLowerCase().includes(term)) termScore += 12;
      if (doc.text.includes(term)) termScore += 6;

      if (termScore === 0) {
        missing = true;
        break;
      }
      score += termScore;
    }

    if (missing) continue;
    // Calculators edge out prose when the scores are otherwise level —
    // someone typing "vswr" usually wants the tool.
    if (doc.kind === 'calculator') score += 3;
    if (title.startsWith(q)) score += 25;
    scored.push({ doc, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .slice(0, limit)
    .map((s) => s.doc);
}
