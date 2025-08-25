'use strict';

/**
 * piece-unique service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::piece-unique.piece-unique');
