/** Platzhalter-Logo (Blatt im Kreis), bis ein echtes Logo in den Vereinsdaten hochgeladen wird. */
export function LogoPlaceholder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="19" className="fill-brand-700" />
      <path d="M12 27C10 16 21 11 29 12c1 8-4 15-17 15Z" className="fill-brand-100" />
      <path d="M13 26c4-6 8-10 14-13" className="stroke-brand-700" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
