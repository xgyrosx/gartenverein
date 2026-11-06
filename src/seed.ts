import config from '@payload-config'
import { getPayload } from 'payload'
import sharp from 'sharp'

import type { Media, Seiten } from '@/payload-types'

type Layout = NonNullable<Seiten['layout']>
type RichTextData = Extract<Layout[number], { blockType: 'text' }>['content']

const textNode = (text: string) => ({
  type: 'text',
  text,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})
const paragraph = (text: string) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  children: [textNode(text)],
})
const heading = (text: string) => ({
  type: 'heading',
  tag: 'h2',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [textNode(text)],
})
const richText = (...children: object[]): RichTextData =>
  ({
    root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
  }) as unknown as RichTextData

/** Einfaches Platzhalterbild (Hügel, Sonne), damit die Seiten nicht leer sind. */
async function placeholderImage(colors: [string, string, string]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <rect width="1600" height="900" fill="#dcefd9"/>
    <circle cx="1250" cy="200" r="90" fill="#f4d35e"/>
    <path d="M0 620 Q400 440 800 600 T1600 560 V900 H0Z" fill="${colors[0]}"/>
    <path d="M0 720 Q500 580 900 700 T1600 680 V900 H0Z" fill="${colors[1]}"/>
    <path d="M0 820 Q600 740 1000 810 T1600 790 V900 H0Z" fill="${colors[2]}"/>
  </svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function main() {
  const payload = await getPayload({ config })

  const upload = async (name: string, alt: string, colors: [string, string, string]) => {
    const data = await placeholderImage(colors)
    return payload.create({
      context: { disableRevalidate: true },
      collection: 'media',
      data: { alt },
      file: { data, mimetype: 'image/png', name, size: data.length },
    }) as Promise<Media>
  }

  const exists = async (slug: string) =>
    (await payload.count({ collection: 'seiten', where: { slug: { equals: slug } } })).totalDocs > 0

  if (!(await exists('start'))) {
    const hero = await upload(
      'beispiel-garten-hero.png',
      'Gezeichnete Hügellandschaft mit Sonne über den Gartenparzellen',
      ['#7fb069', '#5a9a4a', '#3f7d3a'],
    )
    const beet = await upload(
      'beispiel-gemeinschaftsgarten.png',
      'Gezeichnete Gartenbeete in verschiedenen Grüntönen',
      ['#a7c957', '#6a994e', '#386641'],
    )
    await payload.create({
      context: { disableRevalidate: true },
      collection: 'seiten',
      draft: false,
      data: {
        title: 'Startseite',
        slug: 'start',
        _status: 'published',
        layout: [
          {
            blockType: 'hero',
            title: 'Willkommen im Familiengartenverein Zürich-Affoltern',
            subtitle: 'Gemeinsam gärtnern, ernten und feiern – mitten im Quartier.',
            image: hero.id,
          },
          {
            blockType: 'text',
            content: richText(
              heading('Unser Verein'),
              paragraph(
                'Bei uns finden Sie Parzellen, Gartentipps und nette Nachbarschaft. Ob Gemüse, Blumen oder einfach ein ruhiger Platz an der Sonne: Alle sind willkommen, die Freude an der Natur haben.',
              ),
            ),
          },
          {
            blockType: 'bildText',
            image: beet.id,
            imagePosition: 'rechts',
            content: richText(
              heading('Gärtnern in Gemeinschaft'),
              paragraph(
                'Neben den privaten Parzellen pflegen wir einen Gemeinschaftsgarten mit Kräutern, Beeren und einem kleinen Gewächshaus. Wer mithilft, darf miternten.',
              ),
            ),
          },
          { blockType: 'neueNews', title: 'Neueste News', count: 3 },
          { blockType: 'naechsteTermine', title: 'Nächste Termine', count: 3 },
          {
            blockType: 'hinweisbox',
            variant: 'hinweis',
            title: 'Schnuppergärtnern',
            content: richText(
              paragraph(
                'Interessiert? Kommen Sie an einem Samstagvormittag im Garten vorbei und schauen Sie sich in Ruhe um. Wir zeigen Ihnen gerne alles.',
              ),
            ),
          },
        ],
      },
    })
    payload.logger.info('Seite «start» angelegt.')
  }

  if (!(await exists('ueber-uns'))) {
    const bild = await upload(
      'beispiel-ueber-uns.png',
      'Gezeichnete Wiese mit Gartenhäuschen im Hintergrund',
      ['#b5c99a', '#87a96b', '#4f772d'],
    )
    await payload.create({
      context: { disableRevalidate: true },
      collection: 'seiten',
      draft: false,
      data: {
        title: 'Über uns',
        slug: 'ueber-uns',
        _status: 'published',
        layout: [
          {
            blockType: 'text',
            content: richText(
              heading('Wer wir sind'),
              paragraph(
                'Der Familiengartenverein Zürich-Affoltern besteht seit über 50 Jahren. Heute bewirtschaften rund 40 Mitglieder die Parzellen am Hang oberhalb des Dorfes.',
              ),
              paragraph(
                'Der Vorstand organisiert Arbeitseinsätze, Gartenkurse und das jährliche Sommerfest. Alle Aufgaben im Verein werden freiwillig übernommen.',
              ),
            ),
          },
          {
            blockType: 'bildText',
            image: bild.id,
            imagePosition: 'links',
            content: richText(
              heading('Das Areal'),
              paragraph(
                'Auf dem Areal gibt es Parzellen in drei Grössen, ein Vereinshaus mit Küche, Kompostplätze und eine Wasserstelle für alle.',
              ),
            ),
          },
          {
            blockType: 'hinweisbox',
            variant: 'info',
            title: 'Mitglied werden',
            content: richText(
              paragraph(
                'Freie Parzellen vergeben wir nach Warteliste. Sprechen Sie uns bei einem Besuch im Garten an, dann nehmen wir Sie gerne auf.',
              ),
            ),
          },
        ],
      },
    })
    payload.logger.info('Seite «ueber-uns» angelegt.')
  }

  // Globals: nur befüllen, wenn noch leer.
  const verein = await payload.findGlobal({ slug: 'vereinsdaten' })
  if (!verein.street) {
    await payload.updateGlobal({
      context: { disableRevalidate: true },
      slug: 'vereinsdaten',
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

  // Platzhalter-Seiten für alle Hauptpunkte der Navigation
  const platzhalter = (text: string): Layout => [
    { blockType: 'text', content: richText(paragraph(text)) },
  ]
  const placeholders: { slug: string; title: string; layout: Layout }[] = [
    {
      slug: 'garten-pachten',
      title: 'Garten pachten',
      layout: platzhalter(
        'Hier erfahren Sie bald, wie Sie bei uns einen Garten pachten können. Dieser Bereich wird noch ausgebaut.',
      ),
    },
    {
      slug: 'verein',
      title: 'Verein',
      layout: platzhalter(
        'Informationen zum Verein, zum Vorstand und zu den Arealen. Dieser Bereich wird noch ausgebaut.',
      ),
    },
    {
      slug: 'aktuelles',
      title: 'Aktuelles und Termine',
      layout: [
        { blockType: 'neueNews', title: 'Neueste News', count: 3 },
        { blockType: 'naechsteTermine', title: 'Nächste Termine', count: 4 },
      ],
    },
    {
      slug: 'fuer-paechter',
      title: 'Für Pächter:innen',
      layout: platzhalter(
        'Reglemente, Formulare und praktische Informationen für Pächterinnen und Pächter. Dieser Bereich wird noch ausgebaut.',
      ),
    },
    {
      slug: 'gartenwissen',
      title: 'Gartenwissen',
      layout: platzhalter(
        'Tipps und Ratgeber rund um den Garten. Dieser Bereich wird noch ausgebaut.',
      ),
    },
    {
      slug: 'impressum',
      title: 'Impressum',
      layout: platzhalter('Platzhalter – das Impressum ist vom Verein zu ergänzen.'),
    },
    {
      slug: 'datenschutz',
      title: 'Datenschutz',
      layout: platzhalter('Platzhalter – die Datenschutzerklärung ist vom Verein zu ergänzen.'),
    },
  ]
  for (const ph of placeholders) {
    if (await exists(ph.slug)) continue
    await payload.create({
      context: { disableRevalidate: true },
      collection: 'seiten',
      draft: false,
      data: { title: ph.title, slug: ph.slug, _status: 'published', layout: ph.layout },
    })
    payload.logger.info(`Seite «${ph.slug}» angelegt.`)
  }

  const pageId = async (slug: string) => {
    const { docs } = await payload.find({
      collection: 'seiten',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return docs[0]?.id as number
  }
  const seite = async (label: string, slug: string) => ({
    label,
    linkType: 'seite' as const,
    page: await pageId(slug),
  })

  const nav = await payload.findGlobal({ slug: 'navigation' })
  if (!nav.items?.length) {
    await payload.updateGlobal({
      context: { disableRevalidate: true },
      slug: 'navigation',
      data: {
        items: [
          {
            ...(await seite('Verein', 'verein')),
            children: [await seite('Über uns', 'ueber-uns')],
          },
          {
            ...(await seite('Aktuelles und Termine', 'aktuelles')),
            children: [
              { label: 'News', linkType: 'adresse' as const, url: '/news' },
              { label: 'Termine', linkType: 'adresse' as const, url: '/termine' },
            ],
          },
          await seite('Für Pächter:innen', 'fuer-paechter'),
          await seite('Gartenwissen', 'gartenwissen'),
          { ...(await seite('Garten pachten', 'garten-pachten')), highlight: true },
        ],
      },
    })
    payload.logger.info('Navigation angelegt.')
  }

  const banner = await payload.findGlobal({ slug: 'hinweisbanner' })
  if (!banner.text) {
    await payload.updateGlobal({
      context: { disableRevalidate: true },
      slug: 'hinweisbanner',
      data: {
        enabled: false,
        type: 'info',
        text: 'Beispiel: Der nächste Arbeitseinsatz findet bei jeder Witterung statt.',
      },
    })
  }

  const fuss = await payload.findGlobal({ slug: 'fusszeile' })
  if (!fuss.text) {
    await payload.updateGlobal({
      context: { disableRevalidate: true },
      slug: 'fusszeile',
      data: {
        text: 'Der Garten ist von März bis Oktober täglich von 8 bis 20 Uhr geöffnet.',
        legalLinks: [
          await seite('Impressum', 'impressum'),
          await seite('Datenschutz', 'datenschutz'),
        ],
        partnerLinks: [
          {
            label: 'Dachverband (Beispiel)',
            linkType: 'adresse' as const,
            url: 'https://example.org',
          },
        ],
      },
    })
    payload.logger.info('Fusszeile angelegt.')
  }

  // News und Termine
  const day = 24 * 60 * 60 * 1000
  const inDays = (d: number, hour = 12) => {
    const t = new Date(Date.now() + d * day)
    t.setUTCHours(hour, 0, 0, 0)
    return t.toISOString()
  }

  if ((await payload.count({ collection: 'news' })).totalDocs === 0) {
    const bild = await upload('beispiel-news.png', 'Gezeichnete Gartenbeete bei Sonnenschein', [
      '#a7c957',
      '#6a994e',
      '#386641',
    ])
    const items = [
      {
        title: 'Sommerfest im Vereinsgarten',
        teaser:
          'Am letzten Augustwochenende feiern wir wieder zusammen. Es gibt Grilladen, Salate aus dem eigenen Garten und Musik.',
        text: 'Das Sommerfest findet bei jedem Wetter statt. Bitte bringen Sie einen Salat oder ein Dessert mit. Getränke und Grillgut organisiert der Verein.',
        days: -3,
        withImage: true,
      },
      {
        title: 'Neue Kompostplätze eingerichtet',
        teaser:
          'Dank vieler fleissiger Hände stehen jetzt drei zusätzliche Kompostplätze am unteren Ende des Areals bereit.',
        text: 'Bitte trennen Sie Gartenabfälle sorgfältig: Rasenschnitt und Laub gehören auf getrennte Plätze. Eine Beschriftung hilft bei der Orientierung.',
        days: -14,
        withImage: false,
      },
      {
        title: 'Rückblick auf den Arbeitseinsatz im Frühling',
        teaser:
          'Über 25 Mitglieder haben beim Frühlingseinsatz Wege gejätet, Beete vorbereitet und das Gewächshaus repariert.',
        text: 'Herzlichen Dank allen, die mitangepackt haben. Der nächste Arbeitseinsatz findet im Herbst statt, das Datum finden Sie bei den Terminen.',
        days: -35,
        withImage: true,
      },
    ]
    for (const n of items) {
      await payload.create({
      context: { disableRevalidate: true },
        collection: 'news',
        draft: false,
        data: {
          title: n.title,
          slug: undefined as unknown as string,
          teaser: n.teaser,
          publishedAt: inDays(n.days),
          image: n.withImage ? bild.id : undefined,
          content: richText(paragraph(n.teaser), paragraph(n.text)),
          _status: 'published',
        },
      })
    }
    payload.logger.info('News angelegt.')
  }

  if ((await payload.count({ collection: 'termine' })).totalDocs === 0) {
    const termine = [
      {
        title: 'Arbeitseinsatz im Herbst',
        days: 9,
        hour: 7,
        location: 'Vereinsgarten',
        text: 'Wir räumen Beete ab, schneiden Sträucher und bereiten den Winter vor. Bitte Arbeitshandschuhe mitbringen. Zum Abschluss gibt es eine Suppe.',
      },
      {
        title: 'Gartenkurs: Obstbäume schneiden',
        days: 16,
        hour: 8,
        location: 'Vereinshaus',
        text: 'Ein erfahrenes Mitglied zeigt, wie Obstbäume richtig geschnitten werden. Anmeldung nicht nötig.',
      },
      { title: 'Vorstandssitzung', days: 23, hour: 17, location: 'Vereinshaus', text: '' },
      {
        title: 'Generalversammlung',
        days: 60,
        hour: 18,
        location: 'Vereinshaus',
        text: 'Die Einladung mit der Traktandenliste erhalten alle Mitglieder per Post.',
      },
    ]
    for (const t of termine) {
      await payload.create({
      context: { disableRevalidate: true },
        collection: 'termine',
        draft: false,
        data: {
          title: t.title,
          startDate: inDays(t.days, t.hour),
          location: t.location,
          description: t.text ? richText(paragraph(t.text)) : undefined,
          _status: 'published',
        },
      })
    }
    payload.logger.info('Termine angelegt.')
  }

  payload.logger.info('Seed abgeschlossen.')
  process.exit(0)
}

// Top-Level-await, damit «payload run» auf das Ende des Seeds wartet.
try {
  await main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
