import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::cooperation-inquiry.cooperation-inquiry', {
  only: ['create'],
  config: {
    create: {
      auth: false,
    },
  },
});
