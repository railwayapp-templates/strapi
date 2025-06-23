'use strict';

/**
 * commande-line router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::commande-line.commande-line');
