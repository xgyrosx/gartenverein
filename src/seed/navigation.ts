import type { Ctx } from './helpers'

/** Hauptmenü (nur, wenn noch leer). */
export async function seedNavigation({ payload, seite }: Ctx) {
  const nav = await payload.findGlobal({ slug: 'navigation' })
  if (nav.items?.length) return
  await payload.updateGlobal({
    slug: 'navigation',
    context: { disableRevalidate: true },
    data: {
      items: [
        { ...(await seite('Verein', 'verein')), children: [await seite('Über uns', 'ueber-uns')] },
        {
          ...(await seite('Aktuelles und Termine', 'aktuelles')),
          children: [
            { label: 'News', linkType: 'adresse' as const, url: '/news' },
            { label: 'Termine', linkType: 'adresse' as const, url: '/termine' },
          ],
        },
        await seite('Für Pächter:innen', 'fuer-paechter'),
        { label: 'Gartenwissen', linkType: 'adresse' as const, url: '/gartenwissen' },
        { ...(await seite('Garten pachten', 'garten-pachten')), highlight: true },
      ],
    },
  })
  payload.logger.info('Navigation angelegt.')
}
