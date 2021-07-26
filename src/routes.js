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
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: Handler.getBookByIdHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: Handler.editBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: Handler.deleteBookByIdHandler
  }
]

module.exports = routes
