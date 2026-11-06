import type { Areale } from '@/payload-types'

/** Link zu OpenStreetMap (keine Einbettung, keine Daten an Dritte beim Seitenaufruf). */
export function osmLink(a: Pick<Areale, 'latitude' | 'longitude' | 'street' | 'zip' | 'city' | 'name'>): string {
  if (a.latitude != null && a.longitude != null) {
    return `https://www.openstreetmap.org/?mlat=${a.latitude}&mlon=${a.longitude}#map=17/${a.latitude}/${a.longitude}`
  }
  const query = [a.street, a.zip, a.city].filter(Boolean).join(' ') || a.name
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`
}
