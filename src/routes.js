const Handler = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: Handler.addBookHanlder
  }
]

module.exports = routes
