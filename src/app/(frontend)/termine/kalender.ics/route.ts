import { getUpcomingTermine } from '@/lib/content'
import { buildIcs } from '@/lib/ics'
import { getVereinsdaten } from '@/lib/globals'

/** Kalender-Abo mit allen kommenden Terminen. */
export async function GET() {
  const [termine, verein] = await Promise.all([getUpcomingTermine(500), getVereinsdaten()])
  return new Response(buildIcs(termine, `${verein.name} – Termine`), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'public, max-age=900' },
  })
}
