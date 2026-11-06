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
        withImage: true,
      },
      {
        title: 'Neue Kompostplätze eingerichtet',
        teaser: 'Dank vieler fleissiger Hände stehen jetzt drei zusätzliche Kompostplätze am unteren Ende des Areals bereit.',
        text: 'Bitte trennen Sie Gartenabfälle sorgfältig: Rasenschnitt und Laub gehören auf getrennte Plätze. Eine Beschriftung hilft bei der Orientierung.',
        days: -14,
        withImage: false,
      },
      {
        title: 'Rückblick auf den Arbeitseinsatz im Frühling',
        teaser: 'Über 25 Mitglieder haben beim Frühlingseinsatz Wege gejätet, Beete vorbereitet und das Gewächshaus repariert.',
        text: 'Herzlichen Dank allen, die mitangepackt haben. Der nächste Arbeitseinsatz findet im Herbst statt, das Datum finden Sie bei den Terminen.',
        days: -35,
        withImage: true,
      },
    ]
    for (const n of items) {
      await create(
        'news',
        {
          title: n.title,
          teaser: n.teaser,
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
    const termine = [
      { title: 'Arbeitseinsatz im Herbst', days: 9, hour: 7, location: 'Vereinsgarten', text: 'Wir räumen Beete ab, schneiden Sträucher und bereiten den Winter vor. Bitte Arbeitshandschuhe mitbringen. Zum Abschluss gibt es eine Suppe.' },
      { title: 'Gartenkurs: Obstbäume schneiden', days: 16, hour: 8, location: 'Vereinshaus', text: 'Ein erfahrenes Mitglied zeigt, wie Obstbäume richtig geschnitten werden. Anmeldung nicht nötig.' },
      { title: 'Vorstandssitzung', days: 23, hour: 17, location: 'Vereinshaus', text: '' },
      { title: 'Generalversammlung', days: 60, hour: 18, location: 'Vereinshaus', text: 'Die Einladung mit der Traktandenliste erhalten alle Mitglieder per Post.' },
    ]
    for (const t of termine) {
      await create(
        'termine',
        {
          title: t.title,
          startDate: inDays(t.days, t.hour),
          location: t.location,
          description: t.text ? richText(paragraph(t.text)) : undefined,
          _status: 'published',
        },
        { draft: false },
      )
    }
    payload.logger.info('Termine angelegt.')
  }
}
