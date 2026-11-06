const TZ = 'Europe/Zurich'

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('de-CH', { dateStyle: 'long', timeZone: TZ }).format(new Date(iso))

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat('de-CH', { dateStyle: 'full', timeStyle: 'short', timeZone: TZ }).format(new Date(iso))
