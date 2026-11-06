import { type Ctx, paragraph, richText } from './helpers'

const artikel = [
  { title: 'Boden im Herbst vorbereiten', category: 'boden-duengen', months: ['10', '11'], teaser: 'Mit wenigen Handgriffen überwintert der Boden gesund und ist im Frühling schnell bereit.', text: 'Lockern Sie abgeerntete Beete grob und decken Sie sie mit Laub oder Mulch ab. So bleibt das Bodenleben aktiv und Nährstoffe werden nicht ausgewaschen.', key: 'a' },
  { title: 'Kompost richtig anlegen', category: 'boden-duengen', months: ['3', '4', '5'], teaser: 'Ein guter Kompost liefert über Jahre kostenlosen Dünger für den ganzen Garten.', text: 'Mischen Sie feuchte und trockene Abfälle und halten Sie den Haufen locker. Nach etwa einem Jahr ist die Erde dunkel, krümelig und riecht nach Wald.', key: 'b' },
  { title: 'Tomaten giessen und stützen', category: 'pflanzen-ernte', months: ['6', '7', '8'], teaser: 'Regelmässiges Giessen am Fuss der Pflanze und ein stabiler Stab sorgen für gesunde Tomaten.', text: 'Giessen Sie lieber seltener und durchdringend, am besten am Morgen. Binden Sie die Triebe locker an einen Stab und entfernen Sie überflüssige Geiztriebe.', key: 'c' },
  { title: 'Kartoffeln ernten und lagern', category: 'pflanzen-ernte', months: ['8', '9'], teaser: 'Der richtige Zeitpunkt und ein dunkler, kühler Lagerplatz halten Kartoffeln lange frisch.', text: 'Ernten Sie, wenn das Kraut abgestorben ist, und lassen Sie die Knollen kurz abtrocknen. Lagern Sie sie dunkel, kühl und luftig.', key: 'd' },
  { title: 'Unkraut jäten ohne Chemie', category: 'unkraut', months: ['4', '5', '6'], teaser: 'Mit Mulch, Hacke und etwas Regelmässigkeit bleibt das Unkraut im Zaum.', text: 'Jäten Sie, solange die Pflanzen klein sind, und decken Sie den Boden mit Mulch ab. Ein dichter Pflanzenbestand lässt Unkraut ebenfalls weniger Platz.', key: 'e' },
  { title: 'Schnecken natürlich fernhalten', category: 'tiere-insekten', months: ['4', '5', '6'], teaser: 'Schneckenfrass lässt sich ohne Gift begrenzen, wenn man ihre Verstecke kennt.', text: 'Sammeln Sie Schnecken am Abend ab und halten Sie feuchte Verstecke wie Bretter oder hohes Gras kurz. Auch Igel und Laufenten helfen mit.', key: 'f' },
  { title: 'Wildbienen im Garten fördern', category: 'tiere-insekten', months: ['3', '4', '5'], teaser: 'Blühende Pflanzen und ein paar Nisthilfen machen den Garten zum Bienenparadies.', text: 'Setzen Sie auf ungefüllte Blüten, die von März bis Oktober Nahrung bieten. Eine offene Erdstelle und ein Insektenhotel bieten Nistplätze.', key: 'g' },
  { title: 'Himbeeren schneiden', category: 'beeren', months: ['2', '3', '11'], teaser: 'Wer Himbeeren richtig schneidet, erntet mehr und gesündere Früchte.', text: 'Schneiden Sie abgetragene Ruten bodennah ab und lassen Sie pro Meter etwa zehn kräftige Jungruten stehen. Binden Sie sie an einem Draht auf.', key: 'h' },
  { title: 'Johannisbeeren vermehren', category: 'beeren', months: ['1', '2', '11'], teaser: 'Aus einem gesunden Strauch lassen sich im Winter leicht neue Pflanzen gewinnen.', text: 'Schneiden Sie bleistiftdicke, verholzte Triebe in handlange Stücke und stecken Sie sie halb in lockere Erde. Bis zum Sommer bilden sie Wurzeln.', key: 'i' },
  { title: 'Gartengeräte winterfest machen', category: 'allgemein', months: ['11', '12'], teaser: 'Gepflegte Werkzeuge halten länger und sind im Frühling sofort einsatzbereit.', text: 'Reinigen Sie Spaten und Scheren, ölen Sie bewegliche Teile leicht und lagern Sie alles trocken. Wasserleitungen und Schläuche sollten entleert werden.', key: 'j' },
] as const

/** 10 Pilotartikel über alle Kategorien (Platzhaltertexte). */
export async function seedGartenwissen({ payload, create, upload, count }: Ctx) {
  if ((await count('ratgeber')) > 0) return
  const bild = await upload('beispiel-gartenwissen.png', 'Gezeichnete Beete mit Gemüsepflanzen (Platzhalterbild)', ['#a7c957', '#6a994e', '#386641'])
  const ids: Record<string, number> = {}
  for (const a of artikel) {
    const doc = await create(
      'ratgeber',
      {
        title: a.title,
        category: a.category,
        months: [...a.months],
        teaser: a.teaser,
        image: ['a', 'c', 'f'].includes(a.key) ? bild.id : undefined,
        content: richText(paragraph(a.teaser), paragraph(a.text)),
        _status: 'published',
      },
      { draft: false },
    )
    ids[a.key] = doc.id
  }
  const link = async (k: string, others: string[]) =>
    payload.update({ collection: 'ratgeber', id: ids[k], data: { related: others.map((o) => ids[o]) } as never, context: { disableRevalidate: true }, draft: false })
  await link('a', ['b'])
  await link('b', ['a'])
  await link('e', ['f'])
  await link('f', ['e'])
  await link('h', ['i'])
  await link('i', ['h'])
  payload.logger.info('Ratgeber angelegt.')
}
