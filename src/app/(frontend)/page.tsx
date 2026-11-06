export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-green-800">Gartenverein</h1>
      <p className="mt-4 text-lg leading-relaxed">
        Die Website ist im Aufbau. Die Verwaltung der Inhalte finden Sie unter{' '}
        <a className="text-green-800 underline hover:text-green-900" href="/admin">
          /admin
        </a>
        .
      </p>
    </div>
  )
}
