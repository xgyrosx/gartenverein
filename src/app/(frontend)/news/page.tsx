import type { Metadata } from 'next'

import { NewsArchiv } from '@/components/NewsArchiv'

export const metadata: Metadata = { title: 'News' }

export default function NewsPage() {
  return <NewsArchiv page={1} />
}
