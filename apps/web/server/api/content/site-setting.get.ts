import type {
  LocaleCode,
  SiteSetting,
} from '@cdfz/contracts'
import { fetchLocalizedSingleType } from '../../utils/strapi'

export default defineEventHandler(async (event): Promise<SiteSetting> => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const locale: LocaleCode = query.locale === 'en-US' ? 'en-US' : 'zh-CN'
  const strapiUrl = config.internalStrapiUrl.replace(/\/$/, '')
  const publicStrapiUrl = config.public.strapiUrl.replace(/\/$/, '')

  try {
    const siteSetting = await fetchLocalizedSingleType<SiteSetting>(
      strapiUrl,
      '/api/site-setting',
      locale,
    )

    if (!siteSetting) {
      return {}
    }

    return {
      companyName: siteSetting.companyName,
      footerSlogan: siteSetting.footerSlogan,
      address: siteSetting.address,
      phone: siteSetting.phone,
      email: siteSetting.email,
      wechatAccountName: siteSetting.wechatAccountName,
      wechatQrCode: siteSetting.wechatQrCode?.url
        ? {
            ...siteSetting.wechatQrCode,
            url: /^https?:\/\//i.test(siteSetting.wechatQrCode.url)
              ? siteSetting.wechatQrCode.url
              : `${publicStrapiUrl}${siteSetting.wechatQrCode.url.startsWith('/') ? '' : '/'}${siteSetting.wechatQrCode.url}`,
          }
        : null,
    }
  }
  catch (error) {
    console.warn('Unable to load site settings from Strapi.', error)
    return {}
  }
})
