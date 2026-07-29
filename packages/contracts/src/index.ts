export type LocaleCode = 'zh-CN' | 'en-US'

export type NavigationItem = {
  label: string
  path: string
}

export type StatItem = {
  label: string
  value: string
  description: string
}

export type FeatureCard = {
  title: string
  summary: string
  tags: string[]
}

export type PlatformCard = {
  title: string
  summary: string
  highlights: string[]
}

export type SiteSection = {
  eyebrow?: string
  title: string
  description: string
}

export type SiteSetting = {
  companyName?: string | null
  footerSlogan?: string | null
  address?: string | null
  email?: string | null
  phone?: string | null
  wechatAccountName?: string | null
  wechatQrCode?: StrapiMedia | null
}

export type StrapiSingleResponse<T> = {
  data: (T & {
    id: number
    documentId: string
  }) | null
  meta: Record<string, unknown>
}

export type AboutHighlight = {
  id?: number
  text: string
}

export type AboutFeaturePoint = {
  id?: number
  title: string
  description?: string | null
}

export type AboutPage = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  highlights?: AboutHighlight[] | null
  featuredPoints?: AboutFeaturePoint[] | null
}

export type ArticleCategory = 'case' | 'news' | 'event'

export type ArticleContentMode = 'internal' | 'external'

export type StrapiMedia = {
  id?: number
  documentId?: string
  url: string
  alternativeText?: string | null
  caption?: string | null
  width?: number | null
  height?: number | null
}

export type RichTextTextNode = {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export type RichTextLinkNode = {
  type: 'link'
  url: string
  children?: RichTextTextNode[]
}

export type RichTextBlock = {
  type: string
  level?: number
  format?: 'ordered' | 'unordered'
  children?: Array<RichTextTextNode | RichTextLinkNode | RichTextBlock>
  image?: StrapiMedia
}

export type CaseArticle = {
  id?: number
  documentId?: string
  title: string
  slug: string
  summary: string
  category: ArticleCategory
  contentMode: ArticleContentMode
  externalUrl?: string | null
  content?: RichTextBlock[] | null
  cover?: StrapiMedia | null
  sourceName?: string | null
  publishedDate?: string | null
  featured?: boolean
  publishedAt?: string | null
}

export type StrapiCollectionResponse<T> = {
  data: Array<T & {
    id: number
    documentId: string
  }>
  meta: Record<string, unknown>
}

export type InquiryPayload = {
  name: string
  organization?: string
  phone?: string
  email?: string
  intention: string
  message?: string
  language: LocaleCode
  source?: string
  privacyConsent: true
}

export type InquiryResponse = {
  success: boolean
  message: string
}
