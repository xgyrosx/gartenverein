import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="text-4xl font-bold text-green-900">Seite nicht gefunden</h1>
      <p className="mt-4 text-lg">
        Diese Seite gibt es leider nicht (mehr). Vielleicht hilft ein Blick auf die{' '}
        <Link className="text-green-800 underline hover:text-green-950" href="/">
          Startseite
        </Link>
        .
      </p>
    </div>
  )
}
