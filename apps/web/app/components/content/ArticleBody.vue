<script setup lang="ts">
import type { RichTextBlock } from '@cdfz/contracts'

const props = defineProps<{
  blocks?: RichTextBlock[] | null
}>()

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object'

const safeLink = (value: string) => {
  const trimmed = value.trim()
  return /^(https?:\/\/|mailto:|tel:|\/)/i.test(trimmed) ? trimmed : '#'
}

const renderInlineNode = (node: unknown): string => {
  if (!isRecord(node)) {
    return ''
  }

  if (node.type === 'text') {
    let text = escapeHtml(typeof node.text === 'string' ? node.text : '').replaceAll('\n', '<br>')
    if (node.code) text = `<code>${text}</code>`
    if (node.bold) text = `<strong>${text}</strong>`
    if (node.italic) text = `<em>${text}</em>`
    if (node.underline) text = `<u>${text}</u>`
    if (node.strikethrough) text = `<s>${text}</s>`
    return text
  }

  if (node.type === 'link') {
    const url = safeLink(typeof node.url === 'string' ? node.url : '')
    const children = Array.isArray(node.children) ? node.children.map(renderInlineNode).join('') : ''
    const external = /^https?:\/\//i.test(url)
    return `<a href="${escapeHtml(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${children}</a>`
  }

  return Array.isArray(node.children) ? node.children.map(renderInlineNode).join('') : ''
}

const renderChildren = (block: Record<string, unknown>) => Array.isArray(block.children)
  ? block.children.map(renderInlineNode).join('')
  : ''

const renderBlock = (value: unknown): string => {
  if (!isRecord(value)) {
    return ''
  }

  if (value.type === 'heading') {
    const requestedLevel = typeof value.level === 'number' ? value.level : 2
    const level = Math.min(4, Math.max(2, requestedLevel))
    return `<h${level}>${renderChildren(value)}</h${level}>`
  }

  if (value.type === 'quote') {
    return `<blockquote>${renderChildren(value)}</blockquote>`
  }

  if (value.type === 'list') {
    const tag = value.format === 'ordered' ? 'ol' : 'ul'
    const items = Array.isArray(value.children)
      ? value.children.map(item => isRecord(item) ? `<li>${renderChildren(item)}</li>` : '').join('')
      : ''
    return `<${tag}>${items}</${tag}>`
  }

  if (value.type === 'image' && isRecord(value.image) && typeof value.image.url === 'string') {
    const src = safeLink(value.image.url)
    const alt = typeof value.image.alternativeText === 'string' ? value.image.alternativeText : ''
    const caption = typeof value.image.caption === 'string' && value.image.caption
      ? `<figcaption>${escapeHtml(value.image.caption)}</figcaption>`
      : ''
    return `<figure><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">${caption}</figure>`
  }

  if (value.type === 'code') {
    return `<pre><code>${renderChildren(value)}</code></pre>`
  }

  return `<p>${renderChildren(value)}</p>`
}

const html = computed(() => props.blocks?.map(renderBlock).join('') || '')
</script>

<template>
  <div class="article-body" v-html="html" />
</template>

<style scoped>
.article-body { color: #343730; font-size: 16px; line-height: 2; }
.article-body :deep(p) { margin: 0 0 24px; }
.article-body :deep(h2),.article-body :deep(h3),.article-body :deep(h4) { margin: 48px 0 20px; color: var(--ink); font-weight: 600; letter-spacing: -.025em; line-height: 1.4; }
.article-body :deep(h2) { font-size: 30px; }.article-body :deep(h3) { font-size: 24px; }.article-body :deep(h4) { font-size: 19px; }
.article-body :deep(a) { color: var(--accent-dark); text-decoration: underline; text-decoration-color: rgba(11,77,184,.28); text-underline-offset: 4px; }
.article-body :deep(blockquote) { margin: 38px 0; padding: 22px 28px; border-left: 3px solid var(--accent); color: #4e514a; background: var(--accent-soft); font-size: 17px; }
.article-body :deep(ul),.article-body :deep(ol) { margin: 22px 0 28px; padding-left: 25px; }.article-body :deep(li) { margin: 8px 0; padding-left: 7px; }
.article-body :deep(figure) { margin: 42px 0; }.article-body :deep(img) { display: block; width: 100%; height: auto; border-radius: 12px; }.article-body :deep(figcaption) { margin-top: 12px; color: #8a8d85; font-size: 12px; text-align: center; }
.article-body :deep(pre) { overflow-x: auto; margin: 30px 0; padding: 22px; border-radius: 9px; color: #e9eef6; background: #202720; font-size: 13px; line-height: 1.7; }
.article-body :deep(code) { padding: 2px 5px; border-radius: 4px; background: #edf0e9; font-size: .9em; }.article-body :deep(pre code) { padding: 0; background: transparent; }
@media (max-width: 600px) { .article-body { font-size: 15px; line-height: 1.9; }.article-body :deep(h2) { font-size: 26px; } }
</style>
