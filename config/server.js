module.exports = ({ env }) => {
  const url = (process.env.HOSTNAME == "railway") ? process.env.URL : 'http://127.0.0.1:1337';

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array("APP_KEYS"),
    },
    url: url
  }
}