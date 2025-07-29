module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pages/:slug',
      handler: 'api::page.page.findOne',
    }
  ]
}
