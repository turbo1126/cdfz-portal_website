import type { InquiryResponse } from '@cdfz/contracts'
import {
  hasInquiryHoneypotValue,
  InquiryValidationError,
  normalizeInquiryPayload,
} from '../utils/inquiries'

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const inquiryAttempts = new Map<string, number[]>()

const consumeRateLimit = (key: string) => {
  const now = Date.now()
  const recentAttempts = (inquiryAttempts.get(key) || [])
    .filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (recentAttempts.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  recentAttempts.push(now)
  inquiryAttempts.set(key, recentAttempts)
  return true
}

const validationMessages: Record<string, { zh: string, en: string }> = {
  INVALID_BODY: { zh: '提交内容格式不正确', en: 'The submitted data is invalid.' },
  NAME_REQUIRED: { zh: '请填写姓名', en: 'Please enter your name.' },
  CONTACT_REQUIRED: { zh: '电话或邮箱至少填写一项', en: 'Please provide a phone number or email address.' },
  EMAIL_INVALID: { zh: '邮箱格式不正确', en: 'Please enter a valid email address.' },
  PRIVACY_REQUIRED: { zh: '请先同意隐私政策', en: 'Please accept the privacy policy.' },
}

export default defineEventHandler(async (event): Promise<InquiryResponse> => {
  const body = await readBody<unknown>(event)
  const isEnglish = Boolean(body && typeof body === 'object' && 'language' in body && body.language === 'en-US')

  if (hasInquiryHoneypotValue(body)) {
    return {
      success: true,
      message: isEnglish ? 'Your inquiry has been received.' : '您的咨询已提交。',
    }
  }

  const clientIp = getRequestIP(event, { xForwardedFor: true })
  if (clientIp && !consumeRateLimit(clientIp)) {
    throw createError({
      statusCode: 429,
      statusMessage: isEnglish ? 'Too many submissions. Please try again later.' : '提交过于频繁，请稍后再试。',
    })
  }

  try {
    const payload = normalizeInquiryPayload(body)
    const config = useRuntimeConfig(event)
    const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')

    await $fetch(`${strapiUrl}/api/cooperation-inquiries`, {
      method: 'POST',
      body: { data: payload },
    })

    return {
      success: true,
      message: payload.language === 'en-US'
        ? 'Your inquiry has been received.'
        : '您的咨询已提交。',
    }
  }
  catch (error) {
    if (error instanceof InquiryValidationError) {
      const messages = validationMessages[error.message] || validationMessages.INVALID_BODY!
      throw createError({
        statusCode: 400,
        statusMessage: isEnglish ? messages.en : messages.zh,
      })
    }

    console.error('Unable to save cooperation inquiry to Strapi.', error)
    throw createError({
      statusCode: 502,
      statusMessage: isEnglish
        ? 'Submission is temporarily unavailable. Please try again later.'
        : '咨询提交暂时不可用，请稍后再试。',
    })
  }
})
