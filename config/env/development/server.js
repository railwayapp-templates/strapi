module.exports = ({ env }) => ({
    host: '0.0.0.0',
    port: env.int('PORT', 1337),
    environment: 'development', // Development modda çalışmasını zorunlu yap
    app: {
        keys: env.array('APP_KEYS'),
    },
    webhooks: {
        populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
});
