
module.exports = {
routes: [{
  method: 'POST',
  path: '/webhook/stripe',
  handler: 'stripe.handleStripeWebhook',
  config: {
    policies: [],
    middlewares: [],
    auth: false,
    bodyParser: {
      enabled: false,
    },
  }
}]

}
