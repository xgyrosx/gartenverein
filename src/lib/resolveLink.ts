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
