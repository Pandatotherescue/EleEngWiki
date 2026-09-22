import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings, {
  type Options as AutolinkOptions,
} from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * A page is a Markdown file. A line of the form
 *
 *     [[calc:ohms-law]]
 *
 * on its own splits the page and drops a live calculator in at that point.
 * Plain Markdown is used rather than MDX so that ordinary engineering prose —
 * inequalities, braces, stray angle brackets — never breaks the build.
 */
const CALC_MARKER = /^\[\[calc:([a-z0-9-]+)\]\]$/i;

export type PageSegment =
  | { type: 'html'; html: string }
  | { type: 'calculator'; id: string };

export type PageMeta = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  order: number;
  related: string[];
  /** Calculator ids embedded in the body, in order of appearance. */
  calculators: string[];
};

export type Page = PageMeta & {
  segments: PageSegment[];
  headings: { id: string; text: string; depth: number }[];
  /** Body text with markup stripped, for the search index. */
  plain: string;
};

/**
 * Appends a "#" anchor to every heading. Declared separately and annotated so
 * unified's `.use()` overloads resolve to the options form rather than the
 * boolean one.
 */
const autolinkOptions: AutolinkOptions = {
  behavior: 'append',
  properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
  content: { type: 'text', value: '#' },
};

function markdownProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeKatex, { throwOnError: false, strict: false })
    .use(rehypeAutolinkHeadings, autolinkOptions)
    .use(rehypeStringify, { allowDangerousHtml: true });
}

function renderMarkdown(md: string): string {
  return String(markdownProcessor().processSync(md));
}

/** Slugify a heading the same way rehype-slug does, for the on-page nav. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function listContentFiles(): { slug: string; file: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const out: { slug: string; file: string }[] = [];
  for (const dir of fs.readdirSync(CONTENT_DIR)) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;
    for (const file of fs.readdirSync(dirPath)) {
      if (!file.endsWith('.md')) continue;
      out.push({ slug: file.replace(/\.md$/, ''), file: path.join(dirPath, file) });
    }
  }
  return out;
}

function parsePage(slug: string, file: string): Page {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);

  // Split the body into Markdown runs and calculator markers.
  const segments: PageSegment[] = [];
  const calculators: string[] = [];
  let buffer: string[] = [];

  const flush = () => {
    const md = buffer.join('\n').trim();
    if (md) segments.push({ type: 'html', html: renderMarkdown(md) });
    buffer = [];
  };

  for (const line of content.split(/\r?\n/)) {
    const match = line.trim().match(CALC_MARKER);
    if (match) {
      flush();
      const id = match[1].toLowerCase();
      segments.push({ type: 'calculator', id });
      calculators.push(id);
    } else {
      buffer.push(line);
    }
  }
  flush();

  // Headings for the on-page table of contents.
  const headings: Page['headings'] = [];
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^(#{2,3})\s+(.*)$/);
    if (m) {
      const text = m[2].replace(/[*_`$]/g, '').trim();
      headings.push({ id: slugify(text), text, depth: m[1].length });
    }
  }

  const plain = content
    .replace(CALC_MARKER, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]*\$/g, ' ')
    .replace(/[#*_`>|\-]/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    slug,
    title: String(data.title ?? slug),
    category: String(data.category ?? 'fundamentals'),
    summary: String(data.summary ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    order: Number(data.order ?? 999),
    related: Array.isArray(data.related) ? data.related.map(String) : [],
    calculators,
    segments,
    headings,
    plain,
  };
}

let cache: Page[] | null = null;

export function getAllPages(): Page[] {
  if (cache) return cache;
  cache = listContentFiles()
    .map(({ slug, file }) => parsePage(slug, file))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  return cache;
}

export function getPage(slug: string): Page | undefined {
  return getAllPages().find((p) => p.slug === slug);
}

export function getPagesInCategory(category: string): Page[] {
  return getAllPages().filter((p) => p.category === category);
}

export function pageMeta(p: Page): PageMeta {
  const { segments, headings, plain, ...meta } = p;
  return meta;
}
