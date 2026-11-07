import { lexicalToPlainText } from '@/lib/richtext'

export function truncate(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

type LooseBlock = { blockType?: string; subtitle?: string; content?: unknown; image?: unknown }

/** Beschreibung einer Seite aus dem Inhalt: Hero-Untertitel oder erster Text. */
export function describeLayout(layout: unknown): string {
  const blocks = Array.isArray(layout) ? (layout as LooseBlock[]) : []
  for (const b of blocks) {
    if (b.blockType === 'hero' && b.subtitle) return truncate(b.subtitle)
    if (['text', 'bildText', 'hinweisbox'].includes(b.blockType ?? '') && b.content) {
      const t = lexicalToPlainText(b.content)
      if (t) return truncate(t)
    }
  }
  return ''
}

const idOf = (v: unknown): string => {
  if (v && typeof v === 'object' && 'id' in v) return String((v as { id: unknown }).id)
  return v == null || v === '' ? '' : String(v)
}

/** Vorschaubild: Titelbild bzw. erstes Bild bzw. Hero-Bild (Id). */
export function defaultSeoImage(doc: Record<string, unknown>): string {
  if (doc.image) return idOf(doc.image)
  if (Array.isArray(doc.images) && doc.images.length > 0) return idOf(doc.images[0])
  if (Array.isArray(doc.layout)) {
    const hero = (doc.layout as LooseBlock[]).find((b) => b.blockType === 'hero' && b.image)
    if (hero) return idOf(hero.image)
  }
  return ''
}
