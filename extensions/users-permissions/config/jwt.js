module.exports = ({ env }) => ({
    jwtSecret: env('JWT_SECRET')
});