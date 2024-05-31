import { connect } from './config/database.js'
import express from 'express'
import morgan from 'morgan'
import bookRoutes from './routes/bookRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// tokens de morgan personalizados
morgan.token('body', (req) => JSON.stringify(req.body))
morgan.token('host', (req) => req.hostname)
morgan.token('param', (req, res, param) => req.params ? req.params[param] : null)

// app.use(morgan('tiny')) // usamos morgan para loggear las peticiones HTTP
app.use(morgan(':host :method :url :status :param[id] - :response-time ms - :date - :body'))

// Aquí van las rutas
app.use('/api/v1/books', bookRoutes)

// Levantar el servidor
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`)
  })
})
