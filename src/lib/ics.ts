import { lexicalToPlainText } from '@/lib/richtext'
import { serverUrl } from '@/lib/url'
import type { Areale, Termine } from '@/payload-types'

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const escape = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

/** Zeilen auf maximal 75 Byte umbrechen (RFC 5545). */
function fold(line: string): string {
  const out: string[] = []
  let cur = ''
  let bytes = 0
  for (const ch of line) {
    const b = Buffer.byteLength(ch)
    if (bytes + b > (out.length === 0 ? 75 : 74)) {
      out.push(cur)
      cur = ''
      bytes = 0
    }
    cur += ch
    bytes += b
  }
  out.push(cur)
  return out.join('\r\n ')
}

export function terminOrt(t: Termine): string {
  const areal = typeof t.areal === 'object' && t.areal ? (t.areal as Areale) : null
  return [areal?.name, t.location].filter(Boolean).join(', ')
}

function vevent(t: Termine): string[] {
  const start = new Date(t.startDate)
  const end = t.endDate ? new Date(t.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000)
  const description = [lexicalToPlainText(t.description), t.registrationRequired ? `Anmeldung nötig. ${t.registrationText ?? ''}`.trim() : '']
    .filter(Boolean)
    .join('\n\n')
  return [
    'BEGIN:VEVENT',
    `UID:termin-${t.id}@${new URL(serverUrl).hostname}`,
    `DTSTAMP:${stamp(new Date(t.updatedAt))}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escape(t.title)}`,
    ...(terminOrt(t) ? [`LOCATION:${escape(terminOrt(t))}`] : []),
    ...(description ? [`DESCRIPTION:${escape(description)}`] : []),
    `URL:${serverUrl}/termine/${t.slug}`,
    'END:VEVENT',
  ]
}

export function buildIcs(termine: Termine[], calendarName: string): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gartenverein//Website//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escape(calendarName)}`,
    ...termine.flatMap(vevent),
    'END:VCALENDAR',
  ]
  return lines.map(fold).join('\r\n') + '\r\n'
}
