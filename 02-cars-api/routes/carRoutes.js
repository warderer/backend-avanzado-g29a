import express from 'express'
import * as carController from '../controllers/carController.js'

const carRoutes = express.Router()

carRoutes.post('/cars', carController.createCar)

export default carRoutes
