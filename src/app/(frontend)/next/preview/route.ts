import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

/** Schaltet den Vorschau-Modus ein (nur für angemeldete User) und leitet auf die Seite weiter. */
export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path') ?? '/'
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) {
    return new Response('Ungültiger Pfad', { status: 400 })
  }
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Bitte zuerst im Verwaltungsbereich anmelden.', { status: 403 })

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
