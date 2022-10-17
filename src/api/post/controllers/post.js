'use strict';

/**
 * post controller
*/

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', {
  async create(ctx) {
    ctx.query = { ...ctx.query, user: ctx.state.user.id };
    const { id } = ctx.state.user; //ctx.state.user contains the current authenticated user
    const response = await super.create(ctx);
    const updatedResponse = await strapi.entityService
      .update('api::post.post', response.data.id, { data: { user: id } });
    return updatedResponse;
  },

  async find(ctx) {
    const { id } = ctx.state.user;
    const response = await super.find(ctx);
    const updatedResponse = await strapi.entityService
      .findMany('api::post.post', {
        filters: { user: { id: id } },
        populate: {
          user: true,
        }
      });
    return updatedResponse;
  }
});
