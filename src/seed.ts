import config from '@payload-config'
import { getPayload } from 'payload'
import sharp from 'sharp'

import type { Media, Seiten } from '@/payload-types'

type Layout = NonNullable<Seiten['layout']>
type RichTextData = Extract<Layout[number], { blockType: 'text' }>['content']

const textNode = (text: string) => ({
  type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1,
})
const paragraph = (text: string) => ({
  type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0,
  children: [textNode(text)],
})
const heading = (text: string) => ({
  type: 'heading', tag: 'h2', format: '', indent: 0, version: 1, direction: 'ltr',
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
      collection: 'seiten',
      draft: false,
      data: {
        title: 'Startseite',
        slug: 'start',
        _status: 'published',
        layout: [
          {
            blockType: 'hero',
            title: 'Willkommen im Gartenverein Sonnenhalde',
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
                'Der Gartenverein Sonnenhalde besteht seit über 50 Jahren. Heute bewirtschaften rund 40 Mitglieder die Parzellen am Hang oberhalb des Dorfes.',
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
