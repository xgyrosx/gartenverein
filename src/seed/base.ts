import type { Ctx } from './helpers'

/** Vereinsdaten, Hinweisbanner, Fusszeile (nur, wenn noch leer). */
export async function seedBase({ payload, seite }: Ctx) {
  const ctx = { disableRevalidate: true }

  const verein = await payload.findGlobal({ slug: 'vereinsdaten' })
  if (!verein.street) {
    await payload.updateGlobal({
      slug: 'vereinsdaten',
      context: ctx,
      data: {
        name: 'Familiengartenverein Zürich-Affoltern',
        street: 'Hangstrasse 12',
        zip: '8000',
        city: 'Zürich-Affoltern',
        email: 'info@example.ch',
        phone: '+41 00 000 00 00',
      },
    })
    payload.logger.info('Vereinsdaten angelegt.')
  }

  const banner = await payload.findGlobal({ slug: 'hinweisbanner' })
  if (!banner.text) {
    await payload.updateGlobal({
      slug: 'hinweisbanner',
      context: ctx,
      data: { enabled: false, type: 'info', text: 'Beispiel: Der nächste Arbeitseinsatz findet bei jeder Witterung statt.' },
    })
  }

  const fuss = await payload.findGlobal({ slug: 'fusszeile' })
  if (!fuss.text) {
    await payload.updateGlobal({
      slug: 'fusszeile',
      context: ctx,
      data: {
        text: 'Der Garten ist von März bis Oktober täglich von 8 bis 20 Uhr geöffnet.',
        legalLinks: [await seite('Impressum', 'impressum'), await seite('Datenschutz', 'datenschutz')],
        partnerLinks: [{ label: 'Dachverband (Beispiel)', linkType: 'adresse' as const, url: 'https://example.org' }],
      },
    })
    payload.logger.info('Fusszeile angelegt.')
  }
}
