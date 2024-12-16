'use strict';

/**
 * test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::test.test');
