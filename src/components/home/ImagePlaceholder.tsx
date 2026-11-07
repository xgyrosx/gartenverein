import { cn } from '@/lib/utils'

/** Bildplatzhalter (sage-200) – nur bis zum Einsetzen echter Fotos. */
export function ImagePlaceholder({ label = 'Bildplatzhalter', className }: { label?: string; className?: string }) {
  return (
    <div className={cn('flex size-full min-h-24 items-center justify-center bg-sage-200 p-4 text-center text-sm font-medium text-ink-soft', className)}>
      {label}
    </div>
  )
}
