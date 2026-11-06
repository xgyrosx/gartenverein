import type { Ctx } from './helpers'

/** Platzhalter für Personen, Areale und Öffnungszeiten – keine echten Personendaten. */
export async function seedVerein({ payload, create, upload, count }: Ctx) {
  if ((await count('personen')) === 0) {
    const personen = [
      { name: 'Vorname Nachname (Beispiel)', role: 'Präsidium', group: 'vorstand', sort: 10 },
      { name: 'Vorname Nachname (Beispiel)', role: 'Kasse', group: 'vorstand', sort: 20 },
      { name: 'Vorname Nachname (Beispiel)', role: 'Aktuariat', group: 'vorstand', sort: 30 },
      { name: 'Vorname Nachname (Beispiel)', role: 'Ansprechperson Areal 1', group: 'ansprechperson', sort: 40 },
      { name: 'Vorname Nachname (Beispiel)', role: 'Ansprechperson Areal 2', group: 'ansprechperson', sort: 50 },
      { name: 'Vorname Nachname (Beispiel)', role: 'Ehrenmitglied', group: 'ehrenmitglied', sort: 60 },
    ]
    for (const p of personen) {
      await create('personen', { ...p, contact: 'Kontaktangabe folgt.', _status: 'published' }, { draft: false })
    }
    payload.logger.info('Personen angelegt.')
  }

  if ((await count('areale')) === 0) {
    const colors: [string, string, string][] = [
      ['#a7c957', '#6a994e', '#386641'],
      ['#b5c99a', '#87a96b', '#4f772d'],
      ['#7fb069', '#5a9a4a', '#3f7d3a'],
    ]
    for (let i = 1; i <= 6; i++) {
      const img = await upload(`beispiel-areal-${i}.png`, `Gezeichnete Gartenlandschaft zum Areal ${i} (Platzhalterbild)`, colors[i % 3])
      await create(
        'areale',
        {
          name: `Areal ${i} (Beispiel)`,
          summary: `Platzhalter: Kurzer Beschrieb von Areal ${i} mit Lage, Grösse und Besonderheiten.`,
          street: `Beispielweg ${i * 3}`,
          zip: '8046',
          city: 'Zürich',
          latitude: Number((47.4231 + i * 0.002).toFixed(4)),
          longitude: Number((8.4942 + i * 0.002).toFixed(4)),
          images: [img.id],
          parking: 'Platzhalter: Parkplätze beim Eingang, bitte Zufahrt freihalten.',
          _status: 'published',
        },
        { draft: false },
      )
    }
    payload.logger.info('Areale angelegt.')
  }

  const o = await payload.findGlobal({ slug: 'oeffnungszeiten' })
  if (!o.regular?.length) {
    const d = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString()
    await payload.updateGlobal({
      slug: 'oeffnungszeiten',
      context: { disableRevalidate: true },
      data: {
        regular: [
          { day: 'mi', from: '17:00', to: '19:00', note: 'Beispiel' },
          { day: 'sa', from: '09:00', to: '12:00', note: 'Beispiel' },
        ],
        exceptions: [{ date: d, closed: true, note: 'Beispiel: Betriebsferien' }],
        generalNote: 'Platzhalter – die Zeiten sind vom Verein zu bestätigen.',
      },
    })
    payload.logger.info('Öffnungszeiten angelegt.')
  }
}
