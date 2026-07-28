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
