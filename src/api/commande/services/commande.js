'use strict';

/**
 * commande service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::commande.commande');
