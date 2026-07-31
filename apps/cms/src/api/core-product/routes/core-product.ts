import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::core-product.core-product', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
})
