import { type Ctx, paragraph, richText } from './helpers'

const day = 24 * 60 * 60 * 1000
const inDays = (d: number, hour = 12) => {
  const t = new Date(Date.now() + d * day)
  t.setUTCHours(hour, 0, 0, 0)
  return t.toISOString()
}

/** News und Termine. */
export async function seedAktuelles({ payload, create, upload, count }: Ctx) {
  if ((await count('news')) === 0) {
    const bild = await upload('beispiel-news.png', 'Gezeichnete Gartenbeete bei Sonnenschein', ['#a7c957', '#6a994e', '#386641'])
    const items = [
      {
        title: 'Sommerfest im Vereinsgarten',
        teaser: 'Am letzten Augustwochenende feiern wir wieder zusammen. Es gibt Grilladen, Salate aus dem eigenen Garten und Musik.',
        text: 'Das Sommerfest findet bei jedem Wetter statt. Bitte bringen Sie einen Salat oder ein Dessert mit. Getränke und Grillgut organisiert der Verein.',
        days: -3,
        category: 'vereinsleben',
        withImage: true,
      },
      {
        title: 'Neue Kompostplätze eingerichtet',
        teaser: 'Dank vieler fleissiger Hände stehen jetzt drei zusätzliche Kompostplätze am unteren Ende des Areals bereit.',
        text: 'Bitte trennen Sie Gartenabfälle sorgfältig: Rasenschnitt und Laub gehören auf getrennte Plätze. Eine Beschriftung hilft bei der Orientierung.',
        days: -14,
        category: 'garten',
        withImage: false,
      },
      {
        title: 'Rückblick auf den Arbeitseinsatz im Frühling',
        teaser: 'Über 25 Mitglieder haben beim Frühlingseinsatz Wege gejätet, Beete vorbereitet und das Gewächshaus repariert.',
        text: 'Herzlichen Dank allen, die mitangepackt haben. Der nächste Arbeitseinsatz findet im Herbst statt, das Datum finden Sie bei den Terminen.',
        days: -35,
        category: 'vereinsleben',
        withImage: true,
      },
    ]
    for (const n of items) {
      await create(
        'news',
        {
          title: n.title,
          teaser: n.teaser,
          category: n.category,
          publishedAt: inDays(n.days),
          image: n.withImage ? bild.id : undefined,
          imageCaption: n.withImage ? 'Beispielbild (Platzhalter)' : undefined,
          content: richText(paragraph(n.teaser), paragraph(n.text)),
          _status: 'published',
        },
        { draft: false },
      )
    }
    payload.logger.info('News angelegt.')
  }

  if ((await count('termine')) === 0) {
    const { docs: areale } = await payload.find({ collection: 'areale', limit: 1, sort: 'name' })
    const areal = areale[0]?.id
    const termine = [
      { title: 'Arbeitseinsatz im Herbst', category: 'arbeitseinsatz', days: 9, hour: 7, endHour: 11, areal, text: 'Wir räumen Beete ab, schneiden Sträucher und bereiten den Winter vor. Bitte Arbeitshandschuhe mitbringen. Zum Abschluss gibt es eine Suppe.' },
      { title: 'Gartenkurs: Obstbäume schneiden', category: 'kurs', days: 16, hour: 8, endHour: 10, location: 'Vereinshaus', registrationRequired: true, registrationText: 'Bitte bis drei Tage vorher beim Vorstand anmelden (Beispiel).', text: 'Ein erfahrenes Mitglied zeigt, wie Obstbäume richtig geschnitten werden.' },
      { title: 'Vorstandssitzung', category: 'betrieb', days: 23, hour: 17, location: 'Vereinshaus', text: '' },
      { title: 'Generalversammlung', category: 'anlass', days: 60, hour: 18, location: 'Vereinshaus', text: 'Die Einladung mit der Traktandenliste erhalten alle Mitglieder per Post.' },
      { title: 'Sommerfest (Rückblick)', category: 'anlass', days: -40, hour: 11, endHour: 18, areal, text: 'Das Sommerfest war gut besucht. Danke allen Helferinnen und Helfern.' },
      { title: 'Generalversammlung Vorjahr', category: 'anlass', days: -400, hour: 18, location: 'Vereinshaus', text: '' },
    ]
    for (const t of termine) {
      await create(
        'termine',
        {
          title: t.title,
          category: t.category,
          startDate: inDays(t.days, t.hour),
          endDate: t.endHour ? inDays(t.days, t.endHour) : undefined,
          areal: t.areal,
          location: t.location,
          registrationRequired: t.registrationRequired ?? false,
          registrationText: t.registrationText,
          description: t.text ? richText(paragraph(t.text)) : undefined,
          _status: 'published',
        },
        { draft: false },
      )
    }
    payload.logger.info('Termine angelegt.')
  }
}
