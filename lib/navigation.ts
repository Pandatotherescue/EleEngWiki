import { getAllPages, getPagesInCategory, groupsInCategory, type Page } from './content';
import { CATEGORIES } from '@/calculators';
import type { SidebarSection } from '@/components/Sidebar';

/**
 * The site has two browsable areas of articles. The wiki explains how things
 * work; equipment catalogues what hardware exists. They are separated because
 * readers arrive at them with different questions, and mixing a 5-page
 * catalogue into a 38-page theory sidebar helped neither.
 */
export const WIKI_CATEGORIES = ['fundamentals', 'ac', 'rf'] as const;
export const EQUIPMENT_CATEGORY = 'equipment';

export type Area = {
  basePath: string;
  label: string;
  categories: readonly string[];
};

export const WIKI_AREA: Area = {
  basePath: '/wiki',
  label: 'Wiki',
  categories: WIKI_CATEGORIES,
};

export const EQUIPMENT_AREA: Area = {
  basePath: '/equipment',
  label: 'Equipment',
  categories: [EQUIPMENT_CATEGORY],
};

/** Which area a page belongs to, from its category. */
export function areaForCategory(category: string): Area {
  return category === EQUIPMENT_CATEGORY ? EQUIPMENT_AREA : WIKI_AREA;
}

/** Every page in an area, in reading order. */
export function pagesInArea(area: Area): Page[] {
  return area.categories.flatMap((c) => getPagesInCategory(c));
}

/** Sidebar data for an area, with sub-groups and resolved hrefs. */
export function sidebarForArea(area: Area): SidebarSection[] {
  return area.categories
    .map((categoryId) => {
      const category = CATEGORIES.find((c) => c.id === categoryId);
      const groups = groupsInCategory(categoryId).map((g) => ({
        name: g.name,
        items: g.pages.map((p) => ({
          slug: p.slug,
          title: p.title,
          href: `${area.basePath}/${p.slug}`,
        })),
      }));
      return {
        id: categoryId,
        title: category?.title ?? categoryId,
        groups,
      };
    })
    .filter((s) => s.groups.length > 0);
}

/** Href for a page, wherever it lives. */
export function hrefForPage(page: Pick<Page, 'slug' | 'category'>): string {
  return `${areaForCategory(page.category).basePath}/${page.slug}`;
}

/** Look up a page's href by slug — used when resolving `related` lists. */
export function hrefForSlug(slug: string): string | null {
  const page = getAllPages().find((p) => p.slug === slug);
  return page ? hrefForPage(page) : null;
}
