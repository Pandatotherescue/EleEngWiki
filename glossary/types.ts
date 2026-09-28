/**
 * Glossary entries are structured data rather than prose, so the page can
 * filter, group and index them, and so each term can point at the page that
 * explains it properly.
 */
export const GLOSSARY_CATEGORIES = [
  {
    id: 'fundamentals',
    title: 'Electrical',
    blurb: 'Circuit quantities, components and the vocabulary of electrical engineering.',
  },
  {
    id: 'rf',
    title: 'RF & Microwave',
    blurb: 'Transmission lines, antennas, propagation and the measurements that describe them.',
  },
  {
    id: 'modulation',
    title: 'Signals & Modulation',
    blurb: 'How information is impressed on a carrier, and how the result is measured.',
  },
  {
    id: 'systems',
    title: 'Systems & Networks',
    blurb: 'Radio architectures, access schemes, digital standards and security terms.',
  },
  {
    id: 'operations',
    title: 'Operating & Regulatory',
    blurb: 'Operating practice, procedure, maritime and aeronautical services, and the bodies that regulate them.',
  },
] as const;

export type GlossaryCategoryId = (typeof GLOSSARY_CATEGORIES)[number]['id'];

export type GlossaryEntry = {
  /** The term as it is normally written, acronym included. */
  term: string;
  /** What an acronym stands for. */
  expansion?: string;
  category: GlossaryCategoryId;
  /** One to three sentences. Plain, concrete, and honest about limits. */
  definition: string;
  /** Slug of the wiki or equipment page that covers this properly. */
  page?: string;
  /** Other glossary terms worth reading alongside this one. */
  see?: string[];
};

export function categoryTitle(id: string): string {
  return GLOSSARY_CATEGORIES.find((c) => c.id === id)?.title ?? id;
}

/** First character used for the A–Z grouping. Digits and symbols collect under '#'. */
export function initialOf(term: string): string {
  const c = term.trim()[0]?.toUpperCase() ?? '#';
  return /[A-Z]/.test(c) ? c : '#';
}
