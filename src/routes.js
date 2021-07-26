const Handler = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: Handler.addBookHanlder
  },
  {
    method: 'GET',
    path: '/books',
    handler: Handler.getAllBooksHandler
  }
]

module.exports = routes
