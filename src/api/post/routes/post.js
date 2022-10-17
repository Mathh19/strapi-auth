'use strict';

/**
 * post router
 */

 const { createCoreRouter } = require('@strapi/strapi').factories;

 module.exports = createCoreRouter('api::post.post', {
   only: ['find', 'create'],
   config: {
    find: {
      policies: ['api::post.local-policy', 'global::is-logged-in']
    }
  }
 });
