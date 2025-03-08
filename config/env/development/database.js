module.exports = ({ env }) => ({
    connection: {
        connection: {
            connectionString: env('DATABASE_PUBLIC_URL')
        }
    }
});
