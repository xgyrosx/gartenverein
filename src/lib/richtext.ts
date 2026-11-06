type Node = { type?: string; text?: string; children?: Node[] }

/** Reiner Text aus einem Lexical-Inhalt (für Beschreibungen, ICS, JSON-LD). */
export function lexicalToPlainText(data: unknown): string {
  const root = (data as { root?: Node } | null | undefined)?.root
  if (!root) return ''
  const lines: string[] = []
  const walk = (node: Node): string => {
    if (node.type === 'text') return node.text ?? ''
    if (node.type === 'linebreak') return '\n'
    return (node.children ?? []).map(walk).join('')
  }
  for (const block of root.children ?? []) {
    if (block.type === 'list') {
      for (const item of block.children ?? []) lines.push(`- ${walk(item)}`)
    } else {
      lines.push(walk(block))
    }
  }
  return lines.filter(Boolean).join('\n')
}
