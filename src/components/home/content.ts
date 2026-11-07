import type { IconName } from '@/lib/icons'
import { resolveLink } from '@/lib/resolveLink'
import { lexicalToPlainText } from '@/lib/richtext'
import type { Seiten, Startseite } from '@/payload-types'

/** Hilfsstrings: Alles, was hier als Rückfall steht, trägt den Zusatz «(Platzhalter)» und ist im CMS zu ersetzen. */
export const PH = '(Platzhalter)'

export type CardData = { icon: IconName; title: string; text?: string | null; href: string; external: boolean }

type LinkGroup = { label?: string | null; linkType?: 'seite' | 'adresse' | null; page?: unknown; url?: string | null } | null | undefined

/** Link aus einer Gruppe des Globals; fehlt oder ist das Ziel nicht verfügbar, gilt der Rückfall. */
export function pickLink(group: LinkGroup, fallback: { label: string; href: string }) {
  if (group?.label && group.linkType) {
    const r = resolveLink({ label: group.label, linkType: group.linkType, page: group.page as never, url: group.url })
    if (r) return r
  }
  return { ...fallback, external: false }
}

type CardRow = NonNullable<Startseite['quickLinks']>[number]

export function pickCards(rows: CardRow[] | null | undefined, fallback: CardData[]): CardData[] {
  const cards: CardData[] = []
  for (const r of rows ?? []) {
    const link = resolveLink({ label: r.title, linkType: r.linkType, page: r.page, url: r.url })
    if (link) cards.push({ icon: r.icon, title: r.title, text: r.text, href: link.href, external: link.external })
  }
  return cards.length > 0 ? cards : fallback
}

export const defaultQuickCards: CardData[] = [
  { icon: 'sprout', title: 'Garten pachten', text: `Ablauf, Kosten und freie Gärten ${PH}`, href: '/garten-pachten', external: false },
  { icon: 'calendar', title: 'Termine', text: `Kurse, Anlässe und Arbeitseinsätze ${PH}`, href: '/termine', external: false },
  { icon: 'document', title: 'Formulare', text: `Anmeldungen und Reglemente als PDF ${PH}`, href: '/formulare-downloads', external: false },
  { icon: 'house', title: 'Hütten', text: `Material- und Vereinshütte ${PH}`, href: '/vereinshuette', external: false },
]

export const defaultGardenCards: CardData[] = [
  { icon: 'book', title: 'Gut zu wissen', text: `Tipps und Ratgeber ${PH}`, href: '/gartenwissen', external: false },
  { icon: 'bug', title: 'Tiere im Garten', text: `Nützlinge und Gäste ${PH}`, href: '/gartenwissen/kategorie/tiere-insekten', external: false },
  { icon: 'images', title: 'Bildergalerie', text: `Fotos aus dem Vereinsleben ${PH}`, href: '/galerie', external: false },
  { icon: 'megaphone', title: 'Inserate und Dies und Das', text: `Seite folgt ${PH}`, href: '/news', external: false },
]

export const defaultSteps = [
  { title: `Kontakt aufnehmen ${PH}`, text: 'Sie melden sich beim Vorstand und nennen Ihren Wunsch.' },
  { title: `Garten ansehen ${PH}`, text: 'Wir zeigen Ihnen einen freien Garten.' },
  { title: `Vertrag abschliessen ${PH}`, text: 'Sie unterschreiben den Pachtvertrag und erhalten die Schlüssel.' },
]

type Block = NonNullable<Seiten['layout']>[number]

/** Einleitung und Schritte der Seite «Garten pachten» (erster Text- und Ablauf-Baustein). */
export function pachtFromPage(layout: Seiten['layout'] | undefined) {
  const blocks: Block[] = layout ?? []
  const ablauf = blocks.find((b): b is Extract<Block, { blockType: 'ablauf' }> => b.blockType === 'ablauf')
  const text = blocks.find((b): b is Extract<Block, { blockType: 'text' }> => b.blockType === 'text')
  const paragraphs = text ? lexicalToPlainText(text.content).split('\n').filter(Boolean) : []
  // Erste Zeile ist meist die Zwischenüberschrift – dann den folgenden Absatz nehmen.
  const intro = paragraphs.length > 1 ? paragraphs[1] : paragraphs[0]
  const steps = (ablauf?.steps ?? []).slice(0, 3).map((s) => ({ title: s.title, text: s.text }))
  return { intro: intro || undefined, steps: steps.length > 0 ? steps : undefined }
}
