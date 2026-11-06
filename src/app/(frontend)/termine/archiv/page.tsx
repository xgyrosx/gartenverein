import type { Metadata } from 'next'

import { TerminArchiv } from '@/components/TerminArchiv'

export const metadata: Metadata = { title: 'Termine – Archiv' }

export default function ArchivPage() {
  return <TerminArchiv jahr={null} />
}
