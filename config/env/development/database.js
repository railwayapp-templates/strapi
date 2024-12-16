module.exports = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            connectionString: env('postgres://railway:XTEAOq-A062KMQQiOUlSG-7!Zzx9wpX*@junction.proxy.rlwy.net:43311/railway')
        },
        pool: { min: 0 }
    }
});