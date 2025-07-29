'use strict';

/**
 * commande-line service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::commande-line.commande-line');
