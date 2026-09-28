import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/content';
import { EQUIPMENT_AREA, pagesInArea, sidebarForArea } from '@/lib/navigation';
import ArticleLayout from '@/components/ArticleLayout';

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesInArea(EQUIPMENT_AREA).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return { title: 'Not found' };
  return {
    title: page.title,
    description: page.summary,
    openGraph: { title: page.title, description: page.summary },
  };
}

export default async function EquipmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page || page.category !== 'equipment') notFound();

  return (
    <ArticleLayout
      page={page}
      siblings={pagesInArea(EQUIPMENT_AREA)}
      sections={sidebarForArea(EQUIPMENT_AREA)}
      basePath={EQUIPMENT_AREA.basePath}
      areaLabel={EQUIPMENT_AREA.label}
      areaHref="/equipment"
    />
  );
}
