'use client';

/**
 * Article tags, as buttons that open the search pre-filled.
 *
 * These used to be styled as pills but did nothing at all — the standard visual
 * language for a filter, attached to no behaviour, on all 48 pages. A dedicated
 * tag index was the obvious alternative, but the vocabulary is 335 tags across
 * 374 uses: over 300 appear on exactly one page, so almost every tag page would
 * have listed the single page the reader had just left. Search is the honest
 * destination — it matches the tag against titles, summaries, body text,
 * calculators and glossary terms as well.
 */
export default function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <ul className="no-print mt-4 flex flex-wrap gap-1.5" aria-label="Topics on this page">
      {tags.map((tag) => (
        <li key={tag}>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('eew:search', { detail: tag }))}
            title={`Search for “${tag}”`}
            className="rounded-full border border-line bg-raised/60 px-2.5 py-0.5 font-mono text-[0.68rem] text-muted transition-colors hover:border-accent/50 hover:bg-accent-soft hover:text-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
}
