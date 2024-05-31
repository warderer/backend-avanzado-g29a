import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CUSTOMER'],
    default: 'CUSTOMER'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true }) // createdAt y updatedAt

export default mongoose.model('User', userSchema)
