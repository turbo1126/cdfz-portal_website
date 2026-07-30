import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::innovation-platform.innovation-platform', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
})
