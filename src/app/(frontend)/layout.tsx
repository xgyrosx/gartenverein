import type { Metadata } from 'next'
import React from 'react'

import { Banner } from '@/components/layout/Banner'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { sourceSans } from '@/fonts'
import { getVereinsdaten } from '@/lib/globals'
import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getVereinsdaten()
  return { title: { default: name, template: `%s – ${name}` }, description: `Website von ${name}` }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={sourceSans.variable}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
        >
          Zum Inhalt springen
        </a>
        <Banner />
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
