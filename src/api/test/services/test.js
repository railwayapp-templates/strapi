'use strict';

/**
 * test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test.test');
