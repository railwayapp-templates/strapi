'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::page.page', ({ strapi }) => ({
  async findOne(ctx) {
    const { slug } = ctx.params;
    await this.validateQuery(ctx);
    // Sanitize la query au cas où
    const query = await this.sanitizeQuery(ctx);

    const result = await strapi.service('api::page.page').find({
      ...query,
      filters: { slug },

    });

    if (!result.results?.[0]) return ctx.notFound();

    const sanitizedEntity = await this.sanitizeOutput(result.results[0], ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));
