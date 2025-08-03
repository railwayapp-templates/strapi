'use strict';

/**
 * piece-unique controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::piece-unique.piece-unique', ({ strapi }) => ({
  async findOne(ctx) {
    const { slug } = ctx.params;
    await this.validateQuery(ctx);
    // Sanitize la query au cas où
    const query = await this.sanitizeQuery(ctx);

    const result = await strapi.service('api::piece-unique.piece-unique').find({
      ...query,
      filters: { slug },

    });

    if (!result.results?.[0]) return ctx.notFound();

    const sanitizedEntity = await this.sanitizeOutput(result.results[0], ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));
