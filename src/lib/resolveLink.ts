import type { Seiten } from '@/payload-types'

type LinkData = {
  label: string
  linkType: 'seite' | 'adresse'
  page?: number | Seiten | null
  url?: string | null
}

export type ResolvedLink = { label: string; href: string; external: boolean }

/** Wandelt ein Link-Feld in eine Adresse um. Gibt null zurück, wenn das Ziel nicht verfügbar ist. */
export function resolveLink(item: LinkData): ResolvedLink | null {
  if (item.linkType === 'seite') {
    if (!item.page || typeof item.page !== 'object') return null
    return { label: item.label, href: item.page.slug === 'start' ? '/' : `/${item.page.slug}`, external: false }
  }
  if (!item.url) return null
  return { label: item.label, href: item.url, external: !item.url.startsWith('/') }
}

export function resolveLinks(items: LinkData[] | null | undefined): ResolvedLink[] {
  return (items ?? []).map(resolveLink).filter((l): l is ResolvedLink => l !== null)
}

export type NavItem = ResolvedLink & { highlight: boolean; children: ResolvedLink[] }

type NavData = LinkData & { highlight?: boolean | null; children?: LinkData[] | null }

/** Hauptmenü auflösen: Punkte ohne verfügbares Ziel (z. B. nicht veröffentlichte Seite) entfallen. */
export function resolveNavigation(items: NavData[] | null | undefined): NavItem[] {
  const out: NavItem[] = []
  for (const item of items ?? []) {
    const link = resolveLink(item)
    if (!link) continue
    out.push({ ...link, highlight: Boolean(item.highlight), children: item.highlight ? [] : resolveLinks(item.children) })
  }
  return out
}
