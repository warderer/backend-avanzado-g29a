import mongoose from 'mongoose'

const genreEnum = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Horror', 'Biography', 'Memoir', 'Self-Help', 'Cookbook', 'Poetry', 'History', 'Science', 'Art', 'Travel', 'Guide', 'Children', 'Young Adult', 'Other', 'Technical']

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  genre: { type: String, required: true, enum: genreEnum },
  publishDate: { type: Date }, // YYYY-MM-DD
  authors: [{ type: mongoose.Schema.Type.ObjectId, ref: 'Author', required: true }], // ObjectID es un tipo de dato utilizado por Mongoose para identficar documentos en MongoDB. ref: 'Author' indica que el campo authors se relaciona con el modelo Author.
  publisher: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  isbn: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true }) // agregar automáticamente createdAt y updatedAt

const Book = mongoose.model('Book', bookSchema)

export default Book
