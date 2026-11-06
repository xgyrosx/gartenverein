import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Website des Gartenvereins',
  title: 'Gartenverein',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH">
      <body className="bg-stone-50 text-stone-900 antialiased">
        <main id="inhalt">{children}</main>
      </body>
    </html>
  )
}
