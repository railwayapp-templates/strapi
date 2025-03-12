module.exports = ({ env }) => ({
  url: env('PUBLIC_URL', 'https://strapi-developer-39ea.up.railway.app/'),
  host: '0.0.0.0',
  port: env.int('PORT', 1337),
  environment: env('NODE_ENV', 'development'), // Development modunu zorunlu yap!
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
