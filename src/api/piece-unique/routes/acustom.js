module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/piece_uniques/:slug',
      handler: 'api::piece-unique.piece-unique.findOne',
    }
  ]
}
