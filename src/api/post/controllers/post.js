'use strict';

/**
 * post controller
*/

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', {
  async create(ctx) {
    const user = ctx.state.user;
    const response = await super.create(ctx);
    const updatedResponse = await strapi.entityService.update('api::post.post', response.data.id, {
      data: {
        user: user.id,
      }
    });

    return updatedResponse;
  },

  async find(ctx) {
    let response;
    const { id } = ctx.state.user;
    const query = ctx.request.query;

    if (query._q) {
      response = await strapi.entityService
        .findMany('api::post.post', {
          filters: {
            title: { $startsWith: query._q },
            user: { id: id }
          },
          populate: {
            user: true,
          }
        });
    } else {
      response = await strapi.entityService
        .findMany('api::post.post', {
          filters: { user: { id: id } },
          populate: {
            user: true,
          }
        });
    }

    return response;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user.id;

    const response = await strapi.db.query('api::post.post').findOne({
      where: {
        $and: [
          {
            id: id
          },
          {
            user: { id: userId }
          },
        ],
      },
      populate: { user: true },
    });
    return response;
  },

  async count(ctx) {
    let response;
    const { id } = ctx.state.user;
    const query = ctx.request.query;

    if (query._q) {
      response = await strapi.entityService.count('api::post.post', {
        filters: {
          title: { $startsWith: query._q },
          user: { id: id }
        }
      });
    } else {
      response = await strapi.entityService.count('api::post.post', {
        filters: {
          user: { id: id }
        }
      });
    }

    return response;
  }
});
