import type { Ctx } from './helpers'

/** Zwei Beispiel-Alben mit Platzhalterbildern. */
export async function seedGalerie({ payload, create, upload, count }: Ctx) {
  if ((await count('alben')) > 0) return
  const palettes: [string, string, string][] = [
    ['#a7c957', '#6a994e', '#386641'],
    ['#b5c99a', '#87a96b', '#4f772d'],
    ['#7fb069', '#5a9a4a', '#3f7d3a'],
    ['#cad2c5', '#84a98c', '#52796f'],
  ]
  const alben = [
    { title: 'Sommerfest 2026 (Beispiel)', year: 2026, description: 'Platzhalter: Eindrücke vom Sommerfest im Vereinsgarten.', key: 'sommerfest' },
    { title: 'Arbeitseinsatz Frühling 2025 (Beispiel)', year: 2025, description: 'Platzhalter: Bilder vom gemeinsamen Arbeitseinsatz.', key: 'arbeitseinsatz' },
  ]
  for (const a of alben) {
    const images: number[] = []
    for (let i = 0; i < 4; i++) {
      const m = await upload(`beispiel-${a.key}-${i + 1}.png`, `Gezeichnete Gartenszene ${i + 1} zum Album «${a.title}» (Platzhalterbild)`, palettes[i], 'Foto: Beispiel')
      images.push(m.id)
    }
    await create('alben', { title: a.title, year: a.year, description: a.description, images, _status: 'published' }, { draft: false })
  }
  payload.logger.info('Alben angelegt.')
}
