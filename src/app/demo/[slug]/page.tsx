import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demosData } from '@/lib/demos';
import DemoPageClient from './DemoPageClient';

export const metadata: Metadata = { title: 'Demo — AION SITE BUILDER' };

export function generateStaticParams() {
  return Object.keys(demosData).map(slug => ({ slug }));
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = demosData[slug];
  if (!demo) notFound();
  return <DemoPageClient demo={demo} />;
}
