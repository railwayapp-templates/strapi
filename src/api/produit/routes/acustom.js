
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/produits/:slug',
      handler: 'api::produit.produit.findOne',
    }
  ]
}
