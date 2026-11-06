import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TerminArchiv } from '@/components/TerminArchiv'
import { getTerminJahre } from '@/lib/content'

type Args = { params: Promise<{ jahr: string }> }

export async function generateStaticParams() {
  return (await getTerminJahre()).map((j) => ({ jahr: String(j) }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { jahr } = await params
  return { title: `Termine – Archiv ${jahr}` }
}

export default async function ArchivJahrPage({ params }: Args) {
  const { jahr } = await params
  const year = Number(jahr)
  if (!Number.isInteger(year) || year < 1990 || year > 2100) notFound()
  return <TerminArchiv jahr={year} />
}
