import { Button } from '@/components/ui/button'

/**
 * Newsletter-Anmeldung. Platzhalter: Der Versand ist noch nicht Teil der Website (siehe docs/entwicklung.md),
 * deshalb ist das Formular sichtbar, aber deaktiviert.
 */
export function NewsletterForm({ id = 'newsletter' }: { id?: string }) {
  return (
    <form aria-describedby={`${id}-hinweis`}>
      <label htmlFor={`${id}-email`} className="block text-[15px] font-semibold text-white">
        E-Mail-Adresse für den Newsletter
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@beispiel.ch"
          disabled
          className="min-h-11 w-full flex-1 rounded-xl border border-white/30 bg-white px-4 text-base text-ink placeholder:text-ink-soft disabled:opacity-80"
        />
        <Button type="submit" disabled>
          Anmelden
        </Button>
      </div>
      <p id={`${id}-hinweis`} className="mt-3 text-sm text-on-dark-soft">
        Platzhalter: Die Newsletter-Anmeldung folgt.
      </p>
    </form>
  )
}
