import type { CollectionSlug, Payload } from 'payload'
import sharp from 'sharp'

import type { Media, Seiten } from '@/payload-types'

export type Layout = NonNullable<Seiten['layout']>
export type RichTextData = Extract<Layout[number], { blockType: 'text' }>['content']

const textNode = (text: string) => ({
  type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1,
})
export const paragraph = (text: string) => ({
  type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0,
  children: [textNode(text)],
})
export const heading = (text: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading', tag, format: '', indent: 0, version: 1, direction: 'ltr',
  children: [textNode(text)],
})
export const bulletList = (items: string[]) => ({
  type: 'list', listType: 'bullet', start: 1, tag: 'ul', format: '', indent: 0, version: 1, direction: 'ltr',
  children: items.map((t, i) => ({
    type: 'listitem', value: i + 1, format: '', indent: 0, version: 1, direction: 'ltr',
    children: [textNode(t)],
  })),
})
export const richText = (...children: object[]): RichTextData =>
  ({
    root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
  }) as unknown as RichTextData

/** Einfaches Platzhalterbild (Hügel, Sonne), damit die Seiten nicht leer sind. */
export async function placeholderImage(colors: [string, string, string], sun = true) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <rect width="1600" height="900" fill="#dcefd9"/>
    ${sun ? '<circle cx="1250" cy="200" r="90" fill="#f4d35e"/>' : ''}
    <path d="M0 620 Q400 440 800 600 T1600 560 V900 H0Z" fill="${colors[0]}"/>
    <path d="M0 720 Q500 580 900 700 T1600 680 V900 H0Z" fill="${colors[1]}"/>
    <path d="M0 820 Q600 740 1000 810 T1600 790 V900 H0Z" fill="${colors[2]}"/>
  </svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

export type Ctx = {
  payload: Payload
  /** Legt einen Eintrag an (ohne Revalidierung, veröffentlicht). */
  create: (collection: CollectionSlug, data: Record<string, unknown>, extra?: Record<string, unknown>) => Promise<{ id: number }>
  /** Lädt ein Platzhalter-PDF hoch. */
  uploadPdf: (filename: string, title: string, category: 'formular' | 'reglement' | 'information', version: string, lines: string[]) => Promise<{ id: number }>
  /** Lädt ein Platzhalterbild hoch. */
  upload: (name: string, alt: string, colors: [string, string, string], credit?: string) => Promise<Media>
  count: (collection: CollectionSlug, where?: Record<string, unknown>) => Promise<number>
  /** Legt eine Seite an, falls es den Slug noch nicht gibt. */
  page: (slug: string, title: string, layout: Layout) => Promise<void>
  pageId: (slug: string) => Promise<number>
  /** Link-Feld auf eine Seite der Website. */
  seite: (label: string, slug: string) => Promise<{ label: string; linkType: 'seite'; page: number }>
}

export function makeCtx(payload: Payload): Ctx {
  const create: Ctx['create'] = async (collection, data, extra = {}) =>
    (await payload.create({
      collection,
      data: data as never,
      context: { disableRevalidate: true },
      ...extra,
    })) as { id: number }

  const count: Ctx['count'] = async (collection, where) =>
    (await payload.count({ collection, where: where as never })).totalDocs

  const upload: Ctx['upload'] = async (name, alt, colors, credit) => {
    const data = await placeholderImage(colors)
    return (await payload.create({
      collection: 'media',
      data: { alt, ...(credit ? { credit } : {}) } as never,
      file: { data, mimetype: 'image/png', name, size: data.length },
      context: { disableRevalidate: true },
    })) as Media
  }

  const pageId: Ctx['pageId'] = async (slug) => {
    const { docs } = await payload.find({ collection: 'seiten', where: { slug: { equals: slug } }, limit: 1 })
    return docs[0]?.id as number
  }

  const page: Ctx['page'] = async (slug, title, layout) => {
    if ((await count('seiten', { slug: { equals: slug } })) > 0) return
    await create('seiten', { title, slug, _status: 'published', layout }, { draft: false })
    payload.logger.info(`Seite «${slug}» angelegt.`)
  }

  const seite: Ctx['seite'] = async (label, slug) => ({ label, linkType: 'seite', page: await pageId(slug) })

  const uploadPdf: Ctx['uploadPdf'] = async (filename, title, category, version, lines) => {
    const data = makePdf(title, lines)
    return (await payload.create({
      collection: 'dokumente',
      data: { title, category, version, _status: 'published' } as never,
      file: { data, mimetype: 'application/pdf', name: filename, size: data.length },
      context: { disableRevalidate: true },
      draft: false,
    })) as { id: number }
  }

  return { payload, create, upload, uploadPdf, count, page, pageId, seite }
}

/** Minimales, gültiges 1-seitiges PDF (nur Latin-1-Zeichen, Standardschrift Helvetica) für Platzhalter-Dokumente. */
export function makePdf(title: string, lines: string[]): Buffer {
  const esc = (t: string) => t.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
  const content = ['BT', '/F1 18 Tf', '72 780 Td', `(${esc(title)}) Tj`, '/F1 12 Tf', ...lines.flatMap((l) => ['0 -22 Td', `(${esc(l)}) Tj`]), 'ET'].join('\n')
  const contentBuf = Buffer.from(content, 'latin1')
  const objects: Buffer[] = [
    Buffer.from('<< /Type /Catalog /Pages 2 0 R >>'),
    Buffer.from('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'),
    Buffer.from('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>'),
    Buffer.concat([Buffer.from(`<< /Length ${contentBuf.length} >>\nstream\n`), contentBuf, Buffer.from('\nendstream')]),
    Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'),
  ]
  const parts: Buffer[] = [Buffer.from('%PDF-1.4\n')]
  const offsets: number[] = []
  let pos = parts[0].length
  objects.forEach((obj, i) => {
    offsets.push(pos)
    const chunk = Buffer.concat([Buffer.from(`${i + 1} 0 obj\n`), obj, Buffer.from('\nendobj\n')])
    parts.push(chunk)
    pos += chunk.length
  })
  const xref = ['xref', `0 ${objects.length + 1}`, '0000000000 65535 f ', ...offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n `)].join('\n')
  parts.push(Buffer.from(`${xref}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${pos}\n%%EOF\n`))
  return Buffer.concat(parts)
}
