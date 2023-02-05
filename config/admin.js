module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'FLXpl7YLTq+HmezJh3rS+qYWw6y46mplEmS3aOiq7hk='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'DfotF/dgKzxxwnnN1brOYW0XSHijdSTv70Lrh/yurcc=),
  },

});
