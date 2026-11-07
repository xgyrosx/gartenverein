import Link from 'next/link'

import { Img } from '@/components/Img'
import { DesktopNav } from '@/components/layout/DesktopNav'
import { LogoPlaceholder } from '@/components/layout/Logo'
import { MobileNav } from '@/components/layout/MobileNav'
import { getNavigation, getVereinsdaten } from '@/lib/globals'
import { resolveNavigation } from '@/lib/resolveLink'

/** «Familiengartenverein Zürich-Affoltern» → Hauptname und Zusatz (Grossbuchstaben) für die Wortmarke. */
function wordmark(name: string) {
  const [main, ...rest] = name.trim().split(/\s+/)
  return { main, sub: rest.join(' ').toUpperCase() }
}

export async function Header() {
  const [nav, verein] = await Promise.all([getNavigation(), getVereinsdaten()])
  const items = resolveNavigation(nav.items)
  const logo = typeof verein.logo === 'object' ? verein.logo : null
  const { main, sub } = wordmark(verein.name)
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 rounded-lg">
          {logo ? (
            <Img media={logo} className="h-11 w-auto lg:h-[52px]" sizes="52px" size="thumbnail" />
          ) : (
            // Platzhalter, bis das Wappen (siehe DESIGN.md, Abschnitt 3) in den Vereinsdaten hochgeladen ist
            <LogoPlaceholder className="size-11 lg:size-[52px]" />
          )}
          <span className="block leading-tight">
            <span className="block font-display text-[17px] font-semibold text-forest lg:text-[22px]">{main}</span>
            {sub && <span className="block text-[11px] font-semibold tracking-[0.12em] text-ink-soft lg:text-sm">{sub}</span>}
            <span className="sr-only"> – zur Startseite</span>
          </span>
        </Link>
        <DesktopNav items={items} />
        <MobileNav items={items} />
      </div>
    </header>
  )
}
