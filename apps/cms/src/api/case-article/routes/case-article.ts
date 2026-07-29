/**
 * case-article router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::case-article.case-article', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
