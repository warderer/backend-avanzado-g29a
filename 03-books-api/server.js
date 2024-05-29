import { connect } from './config/database.js'
import express from 'express'
import bookRoutes from './routes/bookRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// Aquí van las rutas
app.use('/api/v1/books', bookRoutes)

// Levantar el servidor
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`)
  })
})
