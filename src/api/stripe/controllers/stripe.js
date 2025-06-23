const stripe = require('stripe')(process.env.SECRET_STRIPE);

module.exports = {
  async getStripeSession(ctx) {
    try {
      const sessionId = ctx.params.sessionId;
      if (!sessionId) {
        return ctx.badRequest('Session ID is required');
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'customer_details'],
    })
    console.log('Stripe session retrieved:', session);
    return ctx.send(session)
    }catch (error) {
    console.error('Error retrieving Stripe session:', error);
    return ctx.internalServerError('Failed to retrieve Stripe session');
    }
  }
}
