module.exports = ({ env }) => {
    let databaseUrl = env("RAILWAY_ENVIRONMENT", "none") == "none" ? env("DATABASE_URL") : env("DATABASE_PRIVATE_URL");
    return {
        connection: {
            client: 'postgres',
            connection: {
                connectionString: databaseUrl
            },
            pool: { min: 0 }
        }
    }
}
