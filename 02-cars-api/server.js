import express from 'express'
import { connect } from './config/database.js'
import carRoutes from './routes/carRoutes.js'

const PORT = process.env.PORT || 3000

// connect()

const api = express()

api.use(express.json())

// Aquí van las rutas
api.use('/api/v1', carRoutes)
// Me aseguro de primero conectarme a la base de datos y luego levantar el servidor
connect().then(() => {
  api.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`)
  })
})
