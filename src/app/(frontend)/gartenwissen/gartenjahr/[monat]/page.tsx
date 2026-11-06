import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Gartenjahr } from '@/components/gartenwissen/Gartenjahr'
import { monthNames } from '@/lib/format'

type Args = { params: Promise<{ monat: string }> }

export function generateStaticParams() {
  return monthNames.map((_, i) => ({ monat: String(i + 1) }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { monat } = await params
  return { title: `Gartenjahr: ${monthNames[Number(monat) - 1] ?? ''}` }
}

export default async function GartenjahrMonat({ params }: Args) {
  const { monat } = await params
  const m = Number(monat)
  if (!Number.isInteger(m) || m < 1 || m > 12) notFound()
  return <Gartenjahr monat={m} />
}
