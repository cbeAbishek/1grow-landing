import { Check } from 'lucide-react'
import { CodeBlock } from './code-block'
import { slugify } from '@/lib/content'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type Aspect = 'square' | 'wide' | 'tall'

const INLINE_TOKEN =
  /(`[^`]+`|!\[[^\]]*\]\([^)]*\)|\[[^\]]*\]\([^)]*\)|\*\*[^*]+\*\*|~~[^~]+~~|\*[^*]+\*)/g

function parseInline(text: string, key: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let index = 0

  text.replace(INLINE_TOKEN, (match, _group, offset) => {
    if (offset > lastIndex) {
      nodes.push(text.slice(lastIndex, offset))
    }
    const nodeKey = `${key}-${index++}`

    if (match.startsWith('`')) {
      nodes.push(
        <code
          key={nodeKey}
          className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {match.slice(1, -1)}
        </code>,
      )
    } else if (match.startsWith('![')) {
      const img = match.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)/)
      if (img) {
        nodes.push(
          <img
            key={nodeKey}
            src={img[2]}
            alt={img[1] || img[3] || ''}
            title={img[3]}
            loading="lazy"
            className="my-1 inline-block aspect-square w-20 rounded-lg border border-border object-cover align-middle sm:w-24"
          />,
        )
      } else {
        nodes.push(match)
      }
    } else if (match.startsWith('[')) {
      const link = match.match(/^\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)/)
      if (link) {
        nodes.push(
          <a
            key={nodeKey}
            href={link[2]}
            title={link[3]}
            className="font-medium text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:decoration-brand"
          >
            {parseInline(link[1] || link[2], `${nodeKey}-label`)}
          </a>,
        )
      } else {
        nodes.push(match)
      }
    } else if (match.startsWith('**')) {
      nodes.push(<strong key={nodeKey} className="font-semibold text-foreground">{match.slice(2, -2)}</strong>)
    } else if (match.startsWith('~~')) {
      nodes.push(
        <s key={nodeKey} className="text-muted-foreground line-through decoration-muted-foreground/40">
          {match.slice(2, -2)}
        </s>,
      )
    } else if (match.startsWith('*')) {
      nodes.push(<em key={nodeKey}>{match.slice(1, -1)}</em>)
    } else {
      nodes.push(match)
    }
    lastIndex = offset + match.length
    return match
  })

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function Figure({
  src,
  alt,
  caption,
  aspect,
  className,
}: {
  src: string
  alt: string
  caption?: string
  aspect: Aspect
  className?: string
}) {
  const ratio =
    aspect === 'wide' ? 'aspect-video' : aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-square'
  const widthClass =
    aspect === 'wide' ? 'w-full' : aspect === 'tall' ? 'mx-auto w-full max-w-sm' : 'mx-auto w-full max-w-xl'

  return (
    <figure className={cn('my-8', widthClass, className)}>
      <div className={cn('overflow-hidden rounded-2xl border border-border bg-muted shadow-sm', ratio)}>
        <img
          src={src}
          alt={alt || caption || ''}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
      {caption && (
        <figcaption className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-xs leading-relaxed text-muted-foreground">
          <span className="size-1 rounded-full bg-brand/60" aria-hidden="true" />
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function parseImageTitle(title?: string): { aspect: Aspect; caption?: string } {
  const [aspectToken, ...captionParts] = (title ?? '').split('|')
  const aspect: Aspect = aspectToken === 'wide' || aspectToken === 'tall' ? aspectToken : 'square'
  const caption = captionParts.length > 0 ? captionParts.join('|') : aspect === 'square' ? title || '' : ''
  return { aspect, caption: caption || undefined }
}

function parseImageOnly(block: string): { src: string; alt: string; caption?: string; aspect: Aspect } | null {
  const trimmed = block.trim()
  const standalone = trimmed.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)$/)
  if (!standalone) return null

  const [, alt, src, title] = standalone
  const { aspect, caption } = parseImageTitle(title)
  return { src, alt, caption, aspect }
}

function Heading({ level, text }: { level: number; text: string }) {
  const id = slugify(text)
  const base = 'font-heading scroll-mt-28 tracking-tight'
  switch (level) {
    case 1:
      return <h1 id={id} className={cn(base, 'mb-4 mt-2 text-3xl font-bold')}>{parseInline(text, `h1-${id}`)}</h1>
    case 3:
      return <h3 id={id} className={cn(base, 'mb-3 mt-8 text-xl font-semibold')}>{parseInline(text, `h3-${id}`)}</h3>
    case 4:
      return <h4 id={id} className={cn(base, 'mb-2 mt-6 text-lg font-semibold')}>{parseInline(text, `h4-${id}`)}</h4>
    default:
      return (
        <h2
          id={id}
          className={cn(
            base,
            'mb-4 mt-10 flex items-center gap-3 border-b border-border pb-3 text-2xl font-bold sm:text-[1.75rem] sm:leading-tight',
          )}
        >
          <span className="h-6 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-brand to-accent-red" aria-hidden="true" />
          <span>{parseInline(text, `h2-${id}`)}</span>
        </h2>
      )
  }
}

function TableBlock({ block }: { block: string }) {
  const rows = block
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => row.startsWith('|') && row.endsWith('|'))

  const cells = rows.map((row) =>
    row
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim()),
  )

  const isSeparatorRow = (row: string[]) =>
    row.length > 0 && row.every((cell) => /^:?-{2,}:?$/.test(cell))

  const headerIndex = 0
  const headers = cells[headerIndex] ?? []
  const bodyRows = cells.slice(1).filter((row) => !isSeparatorRow(row))

  return (
    <div className="my-7 overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/70">
            {headers.map((h, i) => (
              <th key={i} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">
                {parseInline(h, `th-${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri} className={cn('border-b border-border last:border-b-0', ri % 2 === 1 && 'bg-muted/30')}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={cn(
                    'px-4 py-3 align-top leading-relaxed text-muted-foreground',
                    ci === 0 && 'font-medium text-foreground',
                  )}
                >
                  {parseInline(cell, `td-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ListBlock({ block }: { block: string }) {
  const items = block.split('\n')
  const isOrdered = /^\d+\.\s+/.test(items[0] ?? '')
  const isTask = items.every((line) => /^[-*+]\s+\[[ xX]\]/.test(line.trim()))

  if (isTask) {
    return (
      <ul className="my-5 space-y-2">
        {items.map((line, i) => {
          const match = line.trim().match(/^[-*+]\s+\[([ xX])\]\s+(.*)$/)
          if (!match) return null
          const done = match[1].toLowerCase() === 'x'
          return (
            <li key={i} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className={cn(
                  'mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border',
                  done
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted text-transparent',
                )}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className={cn('leading-relaxed text-muted-foreground', done && 'text-muted-foreground/60 line-through')}>
                {parseInline(match[2], `task-${i}`)}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  if (isOrdered) {
    return (
      <ol className="my-5 space-y-2.5">
        {items.map((line, i) => {
          const content = line.replace(/^\d+\.\s+/, '')
          return (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <span className="leading-relaxed text-muted-foreground">{parseInline(content, `ol-${i}`)}</span>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ul className="my-5 space-y-2.5">
      {items.map((line, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          <span className="leading-relaxed text-muted-foreground">{parseInline(line.replace(/^[-*+]\s+/, ''), `ul-${i}`)}</span>
        </li>
      ))}
    </ul>
  )
}

const LIST_MARKER = /^(?:[-*+]\s+|\d+\.\s+)/

function buildBlocks(normalized: string): string[] {
  const lines = normalized.split('\n')
  const blocks: string[] = []
  let current: string[] = []
  let inFence = false

  const flush = () => {
    if (current.length > 0) {
      const block = current.join('\n').trim()
      if (block) blocks.push(block)
      current = []
    }
  }

  for (const line of lines) {
    if (inFence) {
      current.push(line)
      if (/^```/.test(line)) inFence = false
      continue
    }
    if (/^```/.test(line)) {
      flush()
      inFence = true
      current.push(line)
      continue
    }
    if (line.trim() === '') {
      flush()
      continue
    }
    const isHeading = /^#{1,4}\s+/.test(line)
    const isList = LIST_MARKER.test(line)
    const blockIsList = current.length > 0 && LIST_MARKER.test(current[0])
    if (isHeading || (isList && !blockIsList)) flush()
    current.push(line)
  }
  flush()

  return blocks
}

export function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  const normalized = content.replace(/\r\n/g, '\n').replace(/\\n/g, ' ')
  const blocks = buildBlocks(normalized)

  return (
    <div className={cn('text-[1.0625rem] leading-relaxed', className)}>
      {blocks.map((block, i) => {
        const key = `block-${i}`

        const imageOnly = parseImageOnly(block)
        if (imageOnly) {
          return <Figure key={key} src={imageOnly.src} alt={imageOnly.alt} caption={imageOnly.caption} aspect={imageOnly.aspect} />
        }

        const fence = block.match(/^```([\w+-]*)\s*\n([\s\S]*?)\n?```$/)
        if (fence) {
          return <CodeBlock key={key} code={fence[2]} language={fence[1] || 'text'} />
        }

        const heading = block.match(/^(#{1,4})\s+(.+)$/)
        if (heading) {
          return <Heading key={key} level={heading[1].length} text={heading[2]} />
        }

        if (/^[-*_]{3,}\s*$/.test(block)) {
          return <hr key={key} className="my-10 border-border" />
        }

        const lines = block.split('\n')
        if (block.includes('|') && lines.some((l) => /^\|[\s:|-]+\|$/.test(l) || /^[\s:|-]+\|$/.test(l))) {
          return <TableBlock key={key} block={block} />
        }

        if (lines.every((l) => /^[-*+]\s+/.test(l) || /^\d+\.\s+/.test(l) || /^[-*+]\s+\[[ xX]\]/.test(l))) {
          return <ListBlock key={key} block={block} />
        }

        if (lines.every((l) => l.startsWith('>'))) {
          return (
            <blockquote
              key={key}
              className="my-6 rounded-r-2xl border-l-4 border-brand/60 bg-surface-alt px-5 py-4 text-muted-foreground"
            >
              {lines.map((l, li) => (
                <p key={li} className={cn(li > 0 && 'mt-3')}>
                  {parseInline(l.replace(/^>\s?/, ''), `quote-${li}`)}
                </p>
              ))}
            </blockquote>
          )
        }

        return (
          <p key={key} className="my-5 leading-[1.85] text-muted-foreground">
            {parseInline(block, key)}
          </p>
        )
      })}
    </div>
  )
}
