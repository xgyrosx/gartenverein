import localFont from 'next/font/local'

/** Source Sans 3 (SIL OFL), selbst gehostet – keine Verbindung zu Google zur Laufzeit. */
export const sourceSans = localFont({
  src: [
    { path: './source-sans-3-latin-wght-normal.woff2', style: 'normal', weight: '200 900' },
    { path: './source-sans-3-latin-wght-italic.woff2', style: 'italic', weight: '200 900' },
  ],
  variable: '--font-source-sans',
  display: 'swap',
})
