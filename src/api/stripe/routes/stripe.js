module.exports = {
  routes: [{
    method: 'GET',
    path: '/stripe/session/:sessionId',
    handler: 'stripe.getStripeSession',
    config: {
      auth: false,
    }
  }]
}
