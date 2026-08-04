import { factories } from '@strapi/strapi';

const intentionValues = [
  'product-demo',
  'platform-cooperation',
  'industrial-services',
  'other',
] as const;

const languageValues = ['zh-CN', 'en-US'] as const;
type Intention = (typeof intentionValues)[number];
type Language = (typeof languageValues)[number];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type InquiryInput = {
  name?: unknown;
  organization?: unknown;
  phone?: unknown;
  email?: unknown;
  intention?: unknown;
  message?: unknown;
  language?: unknown;
  source?: unknown;
  privacyConsent?: unknown;
};

const cleanSingleLine = (value: unknown, maxLength: number) => typeof value === 'string'
  ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
  : '';

const cleanText = (value: unknown, maxLength: number) => typeof value === 'string'
  ? value.trim().slice(0, maxLength)
  : '';

export default factories.createCoreController(
  'api::cooperation-inquiry.cooperation-inquiry',
  ({ strapi }) => ({
    async create(ctx) {
      const body = ctx.request.body as { data?: InquiryInput } | undefined;
      const input = body?.data;

      if (!input) {
        return ctx.badRequest('缺少咨询数据');
      }

      const name = cleanSingleLine(input.name, 100);
      const organization = cleanSingleLine(input.organization, 200);
      const phone = cleanSingleLine(input.phone, 50);
      const email = cleanSingleLine(input.email, 320).toLowerCase();
      const message = cleanText(input.message, 5000);
      const intention: Intention = typeof input.intention === 'string'
        && intentionValues.includes(input.intention as Intention)
        ? input.intention as Intention
        : 'other';
      const language: Language = typeof input.language === 'string'
        && languageValues.includes(input.language as Language)
        ? input.language as Language
        : 'zh-CN';
      const source = cleanSingleLine(input.source, 255) || 'website-contact';

      if (!name) {
        return ctx.badRequest('姓名不能为空');
      }

      if (!phone && !email) {
        return ctx.badRequest('电话或邮箱至少填写一项');
      }

      if (email && !emailPattern.test(email)) {
        return ctx.badRequest('邮箱格式不正确');
      }

      if (input.privacyConsent !== true) {
        return ctx.badRequest('请先同意隐私政策');
      }

      const inquiry = await strapi.documents('api::cooperation-inquiry.cooperation-inquiry').create({
        data: {
          name,
          organization: organization || undefined,
          phone: phone || undefined,
          email: email || undefined,
          intention,
          message: message || undefined,
          language,
          source,
          privacyConsent: true,
          status: 'new',
        },
      });

      ctx.status = 201;
      ctx.body = {
        data: {
          documentId: inquiry.documentId,
        },
        meta: {},
      };
    },
  }),
);
