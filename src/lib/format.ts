const TZ = 'Europe/Zurich'

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('de-CH', { dateStyle: 'long', timeZone: TZ }).format(new Date(iso))

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat('de-CH', { dateStyle: 'full', timeStyle: 'short', timeZone: TZ }).format(new Date(iso))

export const formatTime = (iso: string) =>
  new Intl.DateTimeFormat('de-CH', { timeStyle: 'short', timeZone: TZ }).format(new Date(iso))

export const formatMonthYear = (iso: string) =>
  new Intl.DateTimeFormat('de-CH', { month: 'long', year: 'numeric', timeZone: TZ }).format(new Date(iso))

export const formatChf = (n: number) =>
  `CHF ${new Intl.NumberFormat('de-CH', { maximumFractionDigits: 2 }).format(n)}`

/** Aktueller Monat (1–12) in Schweizer Zeit. */
export const currentMonth = () =>
  Number(new Intl.DateTimeFormat('en-US', { month: 'numeric', timeZone: TZ }).format(new Date()))

export const monthNames = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

export function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
}
