import Link from 'next/link'

import { Img } from '@/components/Img'
import { DesktopNav } from '@/components/layout/DesktopNav'
import { LogoPlaceholder } from '@/components/layout/Logo'
import { MobileNav } from '@/components/layout/MobileNav'
import { getNavigation, getVereinsdaten } from '@/lib/globals'
import { resolveNavigation } from '@/lib/resolveLink'

export async function Header() {
  const [nav, verein] = await Promise.all([getNavigation(), getVereinsdaten()])
  const items = resolveNavigation(nav.items)
  const hasLogo = typeof verein.logo === 'object' && verein.logo
  return (
    <header className="sticky top-0 z-40 border-b bg-card">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 rounded-md text-xl font-bold text-brand-900">
          {hasLogo ? (
            <Img media={verein.logo} className="h-10 w-auto" sizes="40px" size="thumbnail" />
          ) : (
            <LogoPlaceholder className="size-10" />
          )}
          <span>{verein.name}</span>
        </Link>
        <DesktopNav items={items} />
        <MobileNav items={items} />
      </div>
    </header>
  )
}
