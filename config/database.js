module.exports = ({ env }) => {
    const databaseUrl = (process.env.HOSTNAME == "railway") ? process.env.DATABASE_PRIVATE_URL : process.env.DATABASE_URL;

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
