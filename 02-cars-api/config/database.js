import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config() // Leer (cargar) las variables de entorno del archivo .env

const connect = async () => {
  mongoose.connect(process.env.DB_CONNECT_URI) // Nos conectamos a la DB de MongoDB
  const { connection } = await mongoose // Traemos la conexión de mongoose para ver si hay errores

  connection.once('open', () => {
    console.log('✅ Database connection sucessful') // Si la conexión se abre, mostramos este mensaje
  })

  connection.on('error', (error) => {
    console.error('❌ Database connection error:', error) // Si hay un error, mostramos este mensaje
  })
}

export { connect }
