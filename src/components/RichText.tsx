import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc ?? {}
  if (relationTo === 'seiten' && typeof value === 'object' && value && 'slug' in value) {
    const slug = String(value.slug)
    return slug === 'start' ? '/' : `/${slug}`
  }
  return '/'
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

export function RichText({ data, className }: { data: SerializedEditorState; className?: string }) {
  return (
    <LexicalRichText
      className={`richtext ${className ?? ''}`}
      converters={jsxConverters}
      data={data}
    />
  )
}
