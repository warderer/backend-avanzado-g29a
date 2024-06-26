import Author from '../models/Author.js'
import Book from '../models/Book.js'

// CREATE
const createBook = async (req, res) => {
  const bookData = req.body

  // Validaciones
  if (Object.keys(bookData).length === 0) {
    return res.status(400).json({ error: 'Missing book data' })
  }

  if (!bookData.authors) {
    return res.status(400).json({ error: 'Missing authors data' })
  }

  if (!Array.isArray(bookData.authors)) {
    return res.status(400).json({ error: 'Authors must be an array' })
  }

  // Crear autores, uno por uno y esperar a que todos se guarden
  try {
    const authorModels = await Promise.all(bookData.authors.map(async author => {
      // Si el autor ya existe, devolverlo; sino, crearlo.
      const existingAuthor = await Author.findOne({ firstName: author.firstName, lastName: author.lastName, birthDate: author.birthDate }) // findOne devuelve null si no encuentra nada

      if (existingAuthor) {
        return existingAuthor
      }

      // Si el autor no existe, se crea uno nuevo
      const newAuthor = new Author(author)
      return await Author.create(newAuthor)
    }))

    // Como ya se guardaron los autores, se pueden asignar al libro y necesitamos los _id de los autores
    bookData.authors = authorModels.map(author => author._id)

    // Crear el libro
    const newBook = await Book.create(bookData)
    res.status(201).json(newBook)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// READ
const getAllBooks = async (req, res) => {
  try {
    const books = await Book
      .find({ isActive: true })
      .populate('authors')
    if (!books) {
      return res.status(404).json({ error: 'No books found' })
    }
    res.status(200).json(books)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getBookById = async (req, res) => {
  // Valido que el ID sea un ObjectID válido de MongoDB (24 caracteres alfanuméricos)
  if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid book ID' })
  }

  try {
    const book = await Book
      .find({ _id: req.params.bookId, isActive: true })
      .populate('authors')
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    res.status(200).json(book)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// UPDATE
const updateBookById = async (req, res) => {
  // Valido que el ID sea un ObjectID válido de MongoDB (24 caracteres alfanuméricos)
  if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid book ID' })
  }

  try {
    const book = await Book
      .findByIdAndUpdate(req.params.bookId, req.body, { new: true })
      .populate('authors')
    if (!book) {
      return res.status(404).json({ error: 'Cant update: Book not found' })
    }
    res.status(200).json(book)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE
const deleteBookById = async (req, res) => {
  // Valido que el ID sea un ObjectID válido de MongoDB (24 caracteres alfanuméricos)
  if (!req.params.bookId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ error: 'Invalid book ID' })
  }

  // Hard delete: Si el query ?destroy=true, se hace un hard delete, es decir, se elimina el documento de la base de datos
  if (req.query.destroy === 'true') {
    try {
      const book = await Book.findByIdAndDelete(req.params.bookId)
      if (!book) {
        return res.status(404).json({ error: 'Cant delete: Book not found' })
      }
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
  // Soft delete: Si el query destroy no es true, se hace un soft delete, es decir, se cambia el campo isActive a false
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, { isActive: false }, { new: false })
    if (!book || book.isActive === false) {
      return res.status(404).json({ error: 'Cant delete: Book not found' })
    }
    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export { createBook, getAllBooks, getBookById, updateBookById, deleteBookById }
