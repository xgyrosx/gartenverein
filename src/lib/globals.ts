import config from '@payload-config'
import { getPayload } from 'payload'

import type { Fusszeile, Kopfzeile, Vereinsdaten } from '@/payload-types'

async function load<T extends 'kopfzeile' | 'fusszeile' | 'vereinsdaten'>(slug: T) {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug, depth: 1, overrideAccess: false })
}

export const getKopfzeile = (): Promise<Kopfzeile> => load('kopfzeile')
export const getFusszeile = (): Promise<Fusszeile> => load('fusszeile')
export const getVereinsdaten = (): Promise<Vereinsdaten> => load('vereinsdaten')
