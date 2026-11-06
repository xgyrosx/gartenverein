import type { Metadata } from 'next'

import { TerminListe } from '@/components/TerminListe'
import { getUpcomingTermine } from '@/lib/content'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Termine' }

export default async function TerminePage() {
  const termine = await getUpcomingTermine()
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">Termine</h1>
      <div className="mt-8">
        <TerminListe termine={termine} />
      </div>
    </div>
  )
}
