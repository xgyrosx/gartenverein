import { Fraunces, Inter } from 'next/font/google'

/**
 * Schriften gemäss DESIGN.md 2.2. `next/font/google` lädt die Dateien beim Build herunter und liefert sie
 * von der eigenen Domain aus – zur Laufzeit gibt es keine Verbindung zu Google.
 */
export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})
