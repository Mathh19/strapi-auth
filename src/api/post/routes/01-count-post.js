module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/posts/count',
      handler: 'post.count',
      config: {
        policies: ['global::is-logged-in']
      }
    }
  ]
}
