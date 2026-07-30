import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::home-hero-slide.home-hero-slide', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
})
