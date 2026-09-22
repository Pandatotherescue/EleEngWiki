import type { MetadataRoute } from 'next';
import { getAllPages } from '@/lib/content';
import { ALL_CALCULATORS } from '@/calculators';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eleengwiki.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, priority: 1 },
    { url: `${BASE}/wiki`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/calculators`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, priority: 0.5 },
    ...getAllPages().map((p) => ({
      url: `${BASE}/wiki/${p.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...ALL_CALCULATORS.map((c) => ({
      url: `${BASE}/calculators/${c.id}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
