import Link from 'next/link'

import { Img } from '@/components/Img'
import { Nav } from '@/components/layout/Nav'
import { getKopfzeile, getVereinsdaten } from '@/lib/globals'
import { resolveLinks } from '@/lib/resolveLink'

export async function Header() {
  const [kopf, verein] = await Promise.all([getKopfzeile(), getVereinsdaten()])
  return (
    <header className="relative border-b border-earth-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold text-brand-900">
          {typeof verein.logo === 'object' && verein.logo && (
            <Img media={verein.logo} className="h-10 w-auto" sizes="40px" size="thumbnail" />
          )}
          <span>{verein.name}</span>
        </Link>
        <Nav items={resolveLinks(kopf.items)} />
      </div>
    </header>
  )
}
