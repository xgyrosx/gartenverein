import type { Metadata } from 'next'

import { TerminListe } from '@/components/TerminListe'
import { TerminTabs } from '@/components/TerminTabs'
import { getUpcomingTermine } from '@/lib/content'

export const metadata: Metadata = { title: 'Termine' }

export default async function TerminePage() {
  const termine = await getUpcomingTermine()
  return (
    <div className="mx-auto max-w-content px-4 py-12">
      <h1 className="text-4xl font-bold text-brand-900">Termine</h1>
      <div className="mt-6">
        <TerminTabs active="anstehend" />
      </div>
      <p className="mt-6">
        <a className="font-medium text-brand-800 underline hover:text-brand-950" href="/termine/kalender.ics">
          Alle Termine als Kalender abonnieren (ICS)
        </a>
      </p>
      <div className="mt-8">
        <TerminListe termine={termine} byMonth headingLevel={2} />
      </div>
    </div>
  )
}
