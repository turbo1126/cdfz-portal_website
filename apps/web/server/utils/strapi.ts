import type {
  LocaleCode,
  StrapiCollectionResponse,
  StrapiSingleResponse,
} from '@cdfz/contracts'

const localeCandidates: Record<LocaleCode, string[]> = {
  'zh-CN': ['zh-CN'],
  'en-US': ['en'],
}

type StrapiQuery = Record<string, boolean | number | string | undefined>

export const getStrapiLocaleCandidates = (locale: LocaleCode) => localeCandidates[locale]

export const fetchLocalizedSingleType = async <T>(
  strapiUrl: string,
  endpoint: string,
  locale: LocaleCode,
): Promise<(T & { id: number, documentId: string }) | null> => {
  for (const strapiLocale of localeCandidates[locale]) {
    const response = await $fetch<StrapiSingleResponse<T>>(
      `${strapiUrl}${endpoint}`,
      {
        ignoreResponseError: true,
        query: {
          locale: strapiLocale,
          status: 'published',
          populate: '*',
        },
      },
    )

    if (response.data) {
      return response.data
    }
  }

  return null
}

export const fetchLocalizedCollection = async <T>(
  strapiUrl: string,
  endpoint: string,
  locale: LocaleCode,
  query: StrapiQuery = {},
): Promise<Array<T & { id: number, documentId: string }>> => {
  for (const strapiLocale of localeCandidates[locale]) {
    const response = await $fetch<StrapiCollectionResponse<T>>(
      `${strapiUrl}${endpoint}`,
      {
        ignoreResponseError: true,
        query: {
          ...query,
          locale: strapiLocale,
          status: 'published',
        },
      },
    )

    if (response.data?.length) {
      return response.data
    }
  }

  return []
}
