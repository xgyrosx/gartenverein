import Link from 'next/link'

import { TerminListe } from '@/components/TerminListe'
import { getUpcomingTermine } from '@/lib/content'
import type { Seiten } from '@/payload-types'

type Block = Extract<NonNullable<Seiten['layout']>[number], { blockType: 'naechsteTermine' }>

export async function NaechsteTermineBlock({ block }: { block: Block }) {
  const termine = await getUpcomingTermine(block.count)
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold text-brand-900">{block.title || 'Nächste Termine'}</h2>
      <TerminListe termine={termine} />
      <p className="mt-4">
        <Link className="font-medium text-brand-800 underline hover:text-brand-950" href="/termine">
          Alle Termine
        </Link>
      </p>
    </section>
  )
}
