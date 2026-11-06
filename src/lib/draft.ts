import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { getPayload } from 'payload'

/**
 * Im Vorschau-Modus (Draft Mode) dürfen angemeldete Redaktions-User Entwürfe sehen.
 * Ohne gültigen Login fällt die Website auf den veröffentlichten Stand zurück.
 */
export async function getDraftContext() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return { draft: false as const, user: undefined }
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return user ? { draft: true as const, user } : { draft: false as const, user: undefined }
}
