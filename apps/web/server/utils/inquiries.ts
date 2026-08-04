import type { InquiryPayload, LocaleCode } from '@cdfz/contracts'

const intentionValues = new Set([
  'product-demo',
  'platform-cooperation',
  'industrial-services',
  'other',
])

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class InquiryValidationError extends Error {}

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object'

const cleanSingleLine = (value: unknown, maxLength: number) => typeof value === 'string'
  ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
  : ''

const cleanText = (value: unknown, maxLength: number) => typeof value === 'string'
  ? value.trim().slice(0, maxLength)
  : ''

export const hasInquiryHoneypotValue = (input: unknown) => isRecord(input)
  && typeof input.website === 'string'
  && input.website.trim().length > 0

export const normalizeInquiryPayload = (input: unknown): InquiryPayload => {
  if (!isRecord(input)) {
    throw new InquiryValidationError('INVALID_BODY')
  }

  const name = cleanSingleLine(input.name, 100)
  const organization = cleanSingleLine(input.organization, 200)
  const phone = cleanSingleLine(input.phone, 50)
  const email = cleanSingleLine(input.email, 320).toLowerCase()
  const message = cleanText(input.message, 5000)
  const intention = typeof input.intention === 'string' && intentionValues.has(input.intention)
    ? input.intention
    : 'other'
  const language: LocaleCode = input.language === 'en-US' ? 'en-US' : 'zh-CN'
  const source = cleanSingleLine(input.source, 255) || 'website-contact'

  if (!name) {
    throw new InquiryValidationError('NAME_REQUIRED')
  }

  if (!phone && !email) {
    throw new InquiryValidationError('CONTACT_REQUIRED')
  }

  if (email && !emailPattern.test(email)) {
    throw new InquiryValidationError('EMAIL_INVALID')
  }

  if (input.privacyConsent !== true) {
    throw new InquiryValidationError('PRIVACY_REQUIRED')
  }

  return {
    name,
    organization: organization || undefined,
    phone: phone || undefined,
    email: email || undefined,
    intention,
    message: message || undefined,
    language,
    source,
    privacyConsent: true,
  }
}
