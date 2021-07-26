const bookShelf = require('./book-shelf')

const addBookHanlder = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
}

module.exports = { addBookHanlder }
