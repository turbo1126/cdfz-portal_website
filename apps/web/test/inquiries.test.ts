import { describe, expect, it } from 'vitest'

import {
  hasInquiryHoneypotValue,
  InquiryValidationError,
  normalizeInquiryPayload,
} from '../server/utils/inquiries'

describe('inquiry helpers', () => {
  it('normalizes a valid inquiry', () => {
    expect(normalizeInquiryPayload({
      name: '  张 三  ',
      organization: ' 成电福智 ',
      phone: ' 13800000000 ',
      email: ' TEST@EXAMPLE.COM ',
      intention: 'product-demo',
      message: '  希望预约演示  ',
      language: 'zh-CN',
      source: '/contact',
      privacyConsent: true,
    })).toEqual({
      name: '张 三',
      organization: '成电福智',
      phone: '13800000000',
      email: 'test@example.com',
      intention: 'product-demo',
      message: '希望预约演示',
      language: 'zh-CN',
      source: '/contact',
      privacyConsent: true,
    })
  })

  it('requires at least one contact method', () => {
    expect(() => normalizeInquiryPayload({
      name: '张三',
      intention: 'other',
      privacyConsent: true,
    })).toThrowError(new InquiryValidationError('CONTACT_REQUIRED'))
  })

  it('detects the honeypot field', () => {
    expect(hasInquiryHoneypotValue({ website: 'spam.example' })).toBe(true)
    expect(hasInquiryHoneypotValue({ website: '' })).toBe(false)
  })
})
