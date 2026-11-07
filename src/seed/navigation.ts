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
        {
          ...(await seite('Verein', 'verein')),
          children: [
            await seite('Über uns', 'ueber-uns'),
            await seite('Vorstand und Ansprechpersonen', 'vorstand'),
            { label: 'Areale', linkType: 'adresse' as const, url: '/areale' },
            await seite('Materialhütte', 'materialhuette'),
            await seite('Vereinshütte', 'vereinshuette'),
            { label: 'Galerie', linkType: 'adresse' as const, url: '/galerie' },
            await seite('Kontakt', 'kontakt'),
          ],
        },
        {
          ...(await seite('Aktuelles und Termine', 'aktuelles')),
          children: [
            { label: 'News', linkType: 'adresse' as const, url: '/news' },
            { label: 'Termine', linkType: 'adresse' as const, url: '/termine' },
          ],
        },
        {
          ...(await seite('Für Pächter:innen', 'fuer-paechter')),
          children: [
            await seite('Gartenordnung', 'gartenordnung'),
            await seite('Parkplätze und Bussen', 'parkplaetze-bussen'),
            await seite('Bauen und Baugesuche', 'bauen-baugesuche'),
            await seite('Formulare und Downloads', 'formulare-downloads'),
            await seite('Materialhütte-Infos', 'materialhuette-infos'),
          ],
        },
        {
          label: 'Gartenwissen',
          linkType: 'adresse' as const,
          url: '/gartenwissen',
          children: [
            { label: 'Alle Artikel', linkType: 'adresse' as const, url: '/gartenwissen' },
            { label: 'Das Gartenjahr', linkType: 'adresse' as const, url: '/gartenwissen/gartenjahr' },
          ],
        },
        { ...(await seite('Garten anfragen', 'garten-pachten')), highlight: true },
      ],
    },
  })
  payload.logger.info('Navigation angelegt.')
}
