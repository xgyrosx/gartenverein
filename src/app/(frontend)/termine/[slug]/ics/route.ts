import { buildIcs } from '@/lib/ics'
import { getTermin } from '@/lib/content'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = await getTermin(slug)
  if (!t) return new Response('Termin nicht gefunden', { status: 404 })
  return new Response(buildIcs([t], t.title), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${t.slug}.ics"`,
    },
  })
}
