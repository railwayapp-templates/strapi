module.exports = ({ env }) => ({
  host: env('HOST', 'https://strapi-production-1778.up.railway.app/'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('URL'),
  proxy: true
});
