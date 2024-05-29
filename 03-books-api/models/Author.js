import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: String,
  birthDate: { type: Date }, // YYYY-MM-DD
  isActive: { type: Boolean, default: true }
}, { timestamps: true }) // agregar automáticamente createdAt y updatedAt

// Crear el modelo a partir del schema del
const Author = mongoose.model('Author', authorSchema)

export default Author
