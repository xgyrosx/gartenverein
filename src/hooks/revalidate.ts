import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
} from 'payload'

/**
 * Die Website ist klein: Nach jeder relevanten Änderung wird die ganze Website neu aufgebaut (beim nächsten Aufruf).
 * Der Seed setzt context.disableRevalidate, weil er ausserhalb von Next.js läuft.
 */
function revalidateSite(payload: Payload, what: string) {
  try {
    revalidatePath('/', 'layout')
    payload.logger.info(`Revalidierung ausgelöst (${what}).`)
  } catch (err) {
    payload.logger.warn(`Revalidierung nicht möglich (${what}): ${String(err)}`)
  }
}

/** Entwürfe lösen nichts aus – nur Veröffentlichen, Zurückziehen und Änderungen an veröffentlichten Inhalten. */
export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req, context, collection }) => {
  if (context.disableRevalidate) return doc
  const hasStatus = '_status' in doc
  if (!hasStatus || doc._status === 'published' || previousDoc?._status === 'published') {
    revalidateSite(req.payload, collection.slug)
  }
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req, context, collection }) => {
  if (!context.disableRevalidate) revalidateSite(req.payload, collection.slug)
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req, context, global }) => {
  if (!context.disableRevalidate) revalidateSite(req.payload, global.slug)
  return doc
}
