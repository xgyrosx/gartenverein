import config from '@payload-config'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPayload } from 'payload'

import type { Redirect } from '@/payload-types'

const normalize = (p: string) => {
  const x = p.split('?')[0].split('#')[0].toLowerCase()
  return x.length > 1 ? x.replace(/\/+$/, '') : x
}

const prefix: Record<string, (slug: string) => string> = {
  seiten: (s) => (s === 'start' ? '/' : `/${s}`),
  news: (s) => `/news/${s}`,
  termine: (s) => `/termine/${s}`,
  ratgeber: (s) => `/gartenwissen/${s}`,
  areale: (s) => `/areale/${s}`,
}

function targetOf(r: Redirect): string | null {
  if (r.to?.type === 'custom') return r.to.url ?? null
  const ref = r.to?.reference
  if (ref && typeof ref.value === 'object' && ref.value && 'slug' in ref.value) {
    const make = prefix[ref.relationTo]
    return make ? make(String((ref.value as { slug: string }).slug)) : null
  }
  return null
}

/**
 * Wird aufgerufen, wenn eine Adresse nicht existiert: leitet dauerhaft um, falls eine Weiterleitung
 * eingetragen ist (Einstellungen → Weiterleitungen), sonst 404.
 */
export async function redirectOrNotFound(pathname: string): Promise<never> {
  const path = normalize(pathname)
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'redirects',
    where: { from: { in: [path, `${path}/`] } },
    limit: 1,
    depth: 1,
    pagination: false,
    overrideAccess: false,
  })
  const target = docs[0] ? targetOf(docs[0]) : null
  if (target && normalize(target) !== path) permanentRedirect(target)
  notFound()
}
