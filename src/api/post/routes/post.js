'use strict';

/**
 * post router
 */

 const { createCoreRouter } = require('@strapi/strapi').factories;

 module.exports = createCoreRouter('api::post.post', {
   config: {
    find: {
      policies: ['api::post.local-policy', 'global::is-logged-in']
    },
    findOne: {
      policies: ['api::post.local-policy', 'global::is-logged-in']
    },
    count: {
      policies: ['global::is-logged-in']
    },
    create: {
      policies: ['api::post.local-policy', 'global::is-logged-in']
    },
    update: {
      policies: ['global::is-logged-in']
    },
    delete: {
      policies: ['global::is-logged-in']
    },
  }
 });
