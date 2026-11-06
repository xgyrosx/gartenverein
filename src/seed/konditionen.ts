import type { Ctx } from './helpers'

/** Beispielwerte – müssen vom Verein bestätigt werden. */
export async function seedKonditionen({ payload, create, count }: Ctx) {
  const k = await payload.findGlobal({ slug: 'konditionen' })
  if (!k.pachtarten?.length) {
    await payload.updateGlobal({
      slug: 'konditionen',
      context: { disableRevalidate: true },
      data: {
        pachtarten: [
          { name: 'Parzelle klein (ca. 150 m²)', from: 250, to: 350, note: 'Beispielwert' },
          { name: 'Parzelle gross (ca. 300 m²)', from: 400, to: 550, note: 'Beispielwert' },
          { name: 'Gemeinschaftsgarten (Mitgliedschaft)', from: 80, note: 'Beispielwert' },
        ],
        entryFee: 100,
        deposit: 300,
        note: 'Alle Beträge in Schweizer Franken. Die definitiven Preise nennt der Vorstand auf Anfrage.',
        isExample: true,
      },
    })
    payload.logger.info('Konditionen angelegt.')
  }

  if ((await count('gartenangebote')) === 0) {
    const items = [
      { title: 'Parzelle mit Gartenhaus (Beispiel)', type: 'parzelle-miete', status: 'verfuegbar', area: 200, hinweis: 'Besichtigung nach Absprache.' },
      { title: 'Haus zum Kauf (Beispiel)', type: 'haus-kauf', status: 'warteliste', area: 150, hinweis: 'Interessenten werden in der Reihenfolge der Anmeldung berücksichtigt.' },
      { title: 'Platz im Gemeinschaftsgarten (Beispiel)', type: 'gemeinschaftsgarten', status: 'ausgebucht' },
    ]
    for (const a of items) await create('gartenangebote', { ...a, _status: 'published' }, { draft: false })
    payload.logger.info('Gartenangebote angelegt.')
  }
}
