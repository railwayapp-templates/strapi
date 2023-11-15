module.exports = ({ env }) => ({
    connection: {
        connection: {
            connectionString: env('DATABASE_URL')
        }
    }
});
