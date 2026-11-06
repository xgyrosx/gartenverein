import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Klassen zusammenführen (Tailwind-Konflikte werden aufgelöst). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
