import type { Metadata } from 'next'

import { Gartenjahr } from '@/components/gartenwissen/Gartenjahr'

export const metadata: Metadata = { title: 'Das Gartenjahr' }

export default function GartenjahrPage() {
  return <Gartenjahr monat={null} />
}
