module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pieces-uniques/:slug',
      handler: 'api::piece-unique.piece-unique.findOne',
    }
  ]
}
