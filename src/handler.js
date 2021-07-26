const bookShelf = require('./book-shelf')
const { nanoid } = require('nanoid')

const addBookHanlder = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  } else {
    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt }
    bookShelf.push(newBook)
  }

  const isSuccess = bookShelf.filter(book => book.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBooksHandler = (request, h) => {
  let result = bookShelf
  const { name, reading, finished } = request.query

  if (name) {
    result = bookShelf.filter(book => (book.name.toLowerCase()).includes(name.toLowerCase()))
  } else if (reading) {
    const isReading = reading === '1'
    result = bookShelf.filter(book => book.reading === isReading)
  } else if (finished) {
    const isFinished = finished === '1'
    result = bookShelf.filter(book => book.finished === isFinished)
  }

  // const books = bookShelf.map(bookShelf => {
  //   return {
  //     id: bookShelf.id,
  //     name: bookShelf.name,
  //     publisher: bookShelf.publisher
  //   }
  // })

  const books = result.map(({ id, name, publisher }) => ({ id, name, publisher }))

  const response = h.response({
    status: 'success',
    data: {
      books
    }
  })
  response.code(200)
  return response
}

const getBookByIdHandler = (request, h) => {
  const { bookId: id } = request.params

  const book = bookShelf.filter(b => b.id === id)[0]

  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updatedAt = new Date().toISOString()
  const bookIndex = bookShelf.findIndex(book => book.id === bookId)

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  } else if (bookIndex !== -1) {
    bookShelf[bookIndex] = {
      ...bookShelf[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params
  const bookIndex = bookShelf.findIndex(book => book.id === bookId)

  if (bookIndex !== -1) {
    bookShelf.splice(bookIndex, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { addBookHanlder, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler }
