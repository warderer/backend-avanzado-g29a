import express from 'express'
import { connect } from './config/database.js'

const PORT = process.env.PORT || 3000

// connect()

const api = express()

api.use(express.json())

// Aquí van las rutas

// Me aseguro de primero conectarme a la base de datos y luego levantar el servidor
connect().then(() => {
  api.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`)
  })
})
